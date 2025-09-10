---
title: Autonomy of AI Agents is increasing, yet still limited ; how to go around that.
thumbnail: The concept of "time-horizon of autonomy", how it's increasing exponentially for agents, how to build good applications in 2025 while this horizon is still limited.
date: 2025-09-10
type: blog
url: agents-increasing-autonomy
---

Agents are already immensely useful ; yet they’re also very brittle, and have limited autonomy. How will this evolve ? How to still efficiently use agents in the meantime ?

Agents can be loosely defined as virtual robots : programs that can solve tasks for you autonomously ; and to achieve this autonomy, you need to interact with a complex and changing environment, which introduces the concept of agency (ability to act on the environment, more detail [here](https://huggingface.co/docs/smolagents/conceptual_guides/intro_agents).). Adaptive action requires the advanced“intelligence” of an AI model : thus agents really emerged throughout 2024 and 2025 as LLMs became good enough to power them efficiently.

### The key ingredients to autonomous problem-solving

Solving multi-step problems is like getting out of a maze (thanks Thomas Scialom for the allegory). You need to plan a path, execute at least N different steps without stumbling, while not going astray, and be able to recover if/when you stumble at any particular step.

Hence you need:

1. Planning ability
2. Don’t go astray: few hallucinations
3. Execute steps : effective tool-calling
4. Recover from failures : this requires critical spirit, opposed to the sycophancy bias[^sycophancy].

### Autonomy is expanding, fast

Autonomy of an LLM in agentic setup can be quantified by the concept of "time-horizon of autonomy"[^metr_autonomy], defined as follows : if $C_m$ is the class of tasks that take up to $m$ minutes for a human worker, how far can we increase $m$ while keeping a success rate of the agent of over 90% on $C_m$ ? (90% threshold is arbitrary: could be 50%)

In other words, what’s the higher bound of the duration, in equivalent human time, of the tasks that this LLM (in an agentic setup, and given the required tools) can solve reliably ?

This time-horizon of autonomy is increasing, fast.

First, let’s look at a base LLM. There’s some autonomy in there, since it can answer questions for you. That represents maybe a minut of human-equivalent work (the answer duration). But since it cannot interact with the outside world without the user giving a helping hand (do you also miss the good old days of copy-pasting error logs into chatbots?), that autonomy does not go further. So the time-horizon of autonomy of that system is in the order one minute.

To go beyond the frontier of “just blurting out answers to questions”, our system needs to interact with an environment, in order to dynamically retrieve information, check sources, verify calculations.

So you must introduce agency, for instance ability to call certain tools to draw information from your environment. That’s where your system becomes agentic / an AI agent.

In the early days, LLMs were so weak in tool-calling that these agentic systems were limited to a few tool calls. Thus Berkeley Function-calling leaderboard was the key measure of agentic capability[^bfcl]. Now tool-calling ability is mostly trivialized, with advanced models drawing chains of dozens of tool calls without difficulty, elegantly adapting their thinking process along the way.

This means that the time-horizon of AI autonomy has increased. The graph below by METR[^metr_autonomy] shows that this progress was exponential.

Of course the graph has had to sacrifice some exhaustivity for clarity : in reality, the jagged frontier of intelligence does not allow a monotone mapping between AI level and human level. For instance counting prime numbers from 0 to 1 billion would take me years, but can already be done quite quickly by an agentic model in mid-2025, so one could argue the datapoints given by METR at that date are too low ; yet, a modern AI can think for hours and  still fail to solve a riddle that’s simple for me (although that becomes more rare), so one could also argue that these autonomy estimates for 2025 are too high.

But I the general indication stands true : AI models autonomy is increasing exponentially.

<div class="figure-card" data-src="/assets/images/agents-increasing-autonomy/length-of-tasks-log.png" data-alt="LLMs can now solve longer and longer tasks" data-caption="Time-horizon of agentic tasks, METR"></div>

I think this progress in the time-horizon of autonomy is directly caused by advances in each of the task-solving abilities presented above : improved planning[^planning], nearly-solved tool-calling (BFCL top scores are >80% on single-turn), reduced hallucinations, better critical thinking.

And yet, as of now (mid-2025), the time-horizon of autonomy is still below 1 hour.

On GAIA[^gaia] benchmark's level 3 question, for which the average human-equivalent autonomy is 18 minutes, the [current top scores are still 20 percentage points below the human baseline of 87%](https://huggingface.co/spaces/gaia-benchmark/leaderboard).

Given this autonomy limitation, how can we still efficiently get task-solving help from agents? Maybe we can take the other end of that question : where can agents of limited autonomy still be useful ?

### Meanwhile, how to get value despite limited autonomy?

I think three concepts matter a lot when thinking of how/where autonomy-limited AI agents can help:

- **Agents are only useful where the game-plan can’t be known in advance**. If you can know in advance the steps that solving your problem requires, of course an agent is useless, just implement your fixed resolution process with interleaved LLM calls / plain code.
- **Agents shine for strong-link problems.** Strong-link vs weak-link is the distinction: is the final output's value dependant on the maximum value of individual steps, or the minimum ? Weak-link problems are the ones where your output's value is the minimum of all steps : nuclear security. Strong-link problems are the others : [science is a strong-link problem](https://www.experimental-history.com/p/science-is-a-strong-link-problem). Weak-link problems reveal the worst of AI's low reliability ; strong-link problems excuse it[^ai_scientist]. [This piece](https://calv.info/upsides-and-downsides) discusses how strong-link problems tend to degrade into weak-link problems as a company matures.
- **Agents shine where the output is easy to verify.** Cf the concept of asymmetry of information[^asymmetry_verification] : if your problem is much easier to verify than to solve (if your task is NP, and not P (until someone proves that P = NP)), then reliability of agents is not that much of a problem, because supervision becomes much easier, or even automated. I think this is the particular reason why Code agents are already hugely successful. Sure, Codex can destroy your code, but you can easily verify the output with proper tests, even linting checks helps ; at worst, if the agent messed up your code, just git checkout the last good version.

The points above are good sieves for where agents can be useful out-of-the-box

One problem that passes all sieves is [pentesting](https://en.wikipedia.org/wiki/Penetration_test) : you cannot know in advance which attack plan will work ✅, it’s a strong-link problem (only need 1 successful attack to be valuable) ✅, and the output is easy to verify ✅.

The strong-link requirement can be solved by product design, for instance through human-in-the-loop  ; which is made easier when the output is easy to verify. Customer support is a weak-link problem - one error in the final order could destroy the whole customer experience. But if you require constant validation by the customer before any important action, the customer themselves becomes your human-in-the-loop.

### Towards 2026: the time-horizon of autonomy keeps increasing

When building a start-up, a core assumption should be that you should factor in the future autonomy level of LLMs.

Indeed, task-solving autonomy will keep increasing.

So far, work on agentic behaviour has been limited, because the Internet has no SFT data for actions/tool calls. So, using an LLM as an agent mainly relied on prompting, i.e. telling the LLM “you’re an agent and you can use these tools, in that fashion…” and relying on its general intelligence formed on other training domains to follow these instructions properly.

Now, for agent-specific training, SFT on tool-calling examples like Glaive[^glaive] is a good first step, but as we've seen, tool-calling is far from the only competency needed in agentic problem-solving.

So dedicated agentic post-training still has lots of progress to do.

I believe a lot in using RL for this.

This is made harder by the need for proper environments for the agent to interact with.

But when correct environments are setup, RL-based agentic training will provide very high quality rewards : individual tool call correctness can be measured directly in the environment (how did env variables change throughout reasoning), bringing much more information throughout reasoning than just "correct final answer" + "proper format" + "length" rewards (looking at you DeepSeek R1[^deepseek_r1]). And where self-play on synthetic data is like breathing air from a closed room in a loop until it's too low on information/oxygen, the signal from good environments can be a perpetual way to bring in fresh air.

Seen a different way, if we assimilate SFT to a reading textbooks, and DPO to trying your knowledge on multiple choice question, RL has so far only consisted in exams where you grade the format and final answer ; agentic RL would be more like building real-world projects, thus getting more diverse and richer learnings from the exploration at each step.

### Imminent impact on the job market

I think the main reason we didn't see a strong impact of AI on the job market so far, despite LLMs reaching superhuman level (above the 5th percentile of humans) at capabilities like math[^gemini_imo], is this lower autonomy.

A recent study[^harvard_jobs] from Harvard on job posting covering and résumés covering 62M US workers reported a marked drop in junior hirings since 2023, while senior hirings continued to progress. The paper attributes this to automation, while noting other causes could be at play (economic caution, normalization after Covid-era over-hiring, or increased offshoring of entry-level tasks).

This drop of junior hirings make sense in the framework of the time-horizon of autonomy : because their lack of experience reduces their autonomy, juniors could already be facing competition from 1-hour-autonomy agents. If that's the main reason, hiring could also shortly drop at higher experience levels, as more difficult/log-term work progressively gets offshored to AI.


[^sycophancy]: Sharma, M., Tong, M., Korbak, T., Duvenaud, D., Askell, A., Bowman, S. R., ... & Perez, E. (2023). Towards Understanding Sycophancy in Language Models. arXiv preprint arXiv:2310.13548. [https://arxiv.org/abs/2310.13548](https://arxiv.org/abs/2310.13548)

[^metr_autonomy]: Kwa, T., West, B., Becker, J., Deng, A., et al. (2025, March 19). Measuring AI Ability to Complete Long Tasks. METR. [https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)

[^bfcl]: Patil, S. G., Mao, H., Ji, C. C., Yan, F., Suresh, V., Stoica, I., & Gonzalez, J. E. (2025). The Berkeley Function Calling Leaderboard (BFCL): From Tool Use to Agentic Evaluation of Large Language Models. In Forty-second International Conference on Machine Learning. [https://gorilla.cs.berkeley.edu/leaderboard.html](https://gorilla.cs.berkeley.edu/leaderboard.html)

[^planning]: Valmeekam, K., Stechly, K., & Kambhampati, S. (2024). LLMs Still Can’t Plan; Can LRMs? A Preliminary Evaluation of OpenAI’s o1 on PlanBench (No. arXiv:2409.13373). arXiv. https://doi.org/10.48550/arXiv.2409.13373


[^gaia]: Mialon, G., Fourrier, C., Swift, C., Wolf, T., LeCun, Y., & Scialom, T. (2023). GAIA : A benchmark for General AI Assistants (No. arXiv:2311.12983). arXiv. https://doi.org/10.48550/arXiv.2311.12983

[^ai_scientist]: Yamada, Y., Lange, R. T., Lu, C., Hu, S., Lu, C., Foerster, J., Clune, J., & Ha, D. (2025). The AI Scientist-v2: Workshop-Level Automated Scientific Discovery via Agentic Tree Search. arXiv preprint arXiv:2504.08066. [https://arxiv.org/abs/2504.08066](https://arxiv.org/abs/2504.08066)

[^asymmetry_verification]: Wei, J. (2025, July 15). Asymmetry of verification and verifier's rule. Jason Wei's Blog. [https://www.jasonwei.net/blog/asymmetry-of-verification-and-verifiers-law](https://www.jasonwei.net/blog/asymmetry-of-verification-and-verifiers-law)

[^glaive]: Glaive AI. (2024). Glaive Function Calling Dataset. Hugging Face Datasets. [https://huggingface.co/datasets/glaiveai/glaive-function-calling](https://huggingface.co/datasets/glaiveai/glaive-function-calling)

[^deepseek_r1]: DeepSeek-AI, Guo, D., Yang, D., Zhang, H., Song, J., Zhang, R., ... Zhen Zhang. (2025). DeepSeek-R1: Incentivizing reasoning capability in LLMs via reinforcement learning. arXiv preprint arXiv:2501.12948. [https://arxiv.org/abs/2501.12948](https://arxiv.org/abs/2501.12948)

[^gemini_imo]: Luong, T., & Lockhart, E. (2025, July 21). Advanced version of Gemini with Deep Think officially achieves gold-medal standard at the International Mathematical Olympiad. DeepMind. [https://deepmind.google/discover/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/](https://deepmind.google/discover/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/)

[^harvard_jobs]: Lichtinger, G., & Hosseini Maasoum, S. M. (2025, August 31). Generative AI as Seniority-Biased Technological Change: Evidence from U.S. Résumé and Job Posting Data. SSRN Electronic Journal. [https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5425555](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5425555)