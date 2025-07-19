# Divide your ChatGPT costs by 10 by directly calling the API

How I built a simple notebook interface to access GPT-4 directly and slashed my AI costs from $20/month to under $1/day.

2023-09-23

---

# Why an UI for the GPT API?

❌ A few months ago, I canceled my ChatGPT subscription.

This tool is incredible, especially GPT4: when I use it for debugging, for example, I can save several hours per day. But a $20 per month subscription is too expensive if I don't use it regularly.

But this summer, everything changed: GPT4 became available through OpenAI's API.

The API is an interface that allows you to call responses from OpenAI models in programs.
The real difference is that you pay according to the number of words returned by GPT4 ▶ So the payment is adapted to usage.

🛠 So I just built an interface that allows you to use the OpenAI API in a notebook.

## Result: huge reduction in costs

✅ For exactly the same responses as before, my costs have dropped to less than $1 per day when I use it a lot, $0 on other days.

<img src="/assets/images/2023-09-23-an-ui-for-gpt-api/usage.png">

This is what it looks like:

<img src="/assets/images/2023-09-23-an-ui-for-gpt-api/ui.png">

# How it\'s built

- The interface is made of simple IPython widgets.

The core of the machine is this `get_user_input` function of the `Chat` class. It updates, among other things, the `history` attribute, which is a list of messages, each message being a dictionary with the keys `"role"` and `"content"`, which is a format directly accepted by `openai.ChatCompletion.create()`.

```python
def get_user_input(self, b) -> None:
    message = self.user_input.value
    self.add_message("👨‍🚀 You:", message)

    self.history.append({"role": "user", "content": message})
    response = openai.ChatCompletion.create(
        model=self.model, messages=self.history, temperature=0, stream=True
    )
    collected_messages = []
    current_reply = None
    for chunk in response:
        chunk_message = chunk["choices"][0].get("delta", {}).get("content")
        if chunk_message is not None:
            collected_messages.append(chunk_message)
            current_reply = "".join(collected_messages)
            self.answer.value = sanitize_code(markdown(current_reply))
    self.answer.value = ""
    self.add_message("🤖 Bot:", current_reply)
    self.history.append({"role": "system", "content": current_reply})
    return
```

- The `stream=True` option in `openai.Chatcompletion` allows you to receive GPT completion live, making it much easier to interact.

# To use it

Clone [this repo](https://github.com/aymeric-roucher/gpt_api_ui), copy your [OpenAI API key](https://platform.openai.com/account/api-keys), run the notebook cell, and you're good to go!

### Metadata
- Type: blog
- URL: /blog#gpt-api-interface
- Date: 2023-09-23