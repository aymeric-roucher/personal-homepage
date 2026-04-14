---
title: How ProductHunt botched our launch
thumbnail: We launched Verso AI on ProductHunt, followed all the playbooks, and got shadowbanned. Here's what happened and what I learned.
date: 2026-04-14
type: blog
url: producthunt-botched-our-launch
---

This Sunday at 00:01 PST, we launched our product, [Verso AI](https://get-verso.ai/), which I think is the best AI assistant for PowerPoint. The product is easy to use, quite general-usage, and performs very well, so I thought it would be a great fit for a ProductHunt launch.

I took some tricks from [some](https://newsletter.jjvalino.com/p/launching-on-product-hunt-for-dummies) [good](https://www.lennysnewsletter.com/p/how-to-successfully-launch-on-product) [ProductHunt](https://thebootstrappedfounder.com/marc-louvion-becoming-a-product-launch-beast/) [playbooks](https://www.reddit.com/r/SaaS/comments/1p9bkfk/how_i_got_a_3_and_1_finish_on_producthunt_and_how/):

- Launch as early as possible, at 00:01AM PST, to have the full day to get upvotes + get a lead on the leaderboard  
- Most traffic on ProductHunt occurs on weekdays, especially on Tuesday to Thursday. So launch on a weekday to maximize traffic; But these are also most crowded by competing products ; so launch on the weekend to optimize the ranking (on top of this I checked through [personal vibe-coded study](https://github.com/aymeric-roucher/ProductHuntStudy) that weekend launches were less qualitative, so easier to beat).  
  - We aimed for ranking, so weekend it was. And the ProductHunt newsletter is sent to >300k subscribers every weekday, mentioning the previous day’s launches => so we launched on Sunday to possibly get featured on Monday.  

<div class="figure-card" data-src="/assets/images/producthunt-is-broken/weekly-reactions.jpg" data-alt="ProductHunt votes and comments by day of the week" data-caption="Traffic on ProductHunt per day of the week. From <a href=’https://www.lennysnewsletter.com/p/how-to-successfully-launch-on-product’>Lenny Rachitsky’s article</a>"></div>

- Prepare our existing audience to the launch (sent a heads-up email 2 days before)  
- Posted the announcement with a video and CTA to my ~29k LinkedIn followers and 7k Twitter, which should be decent enough.  
- Headline : mention what distinguishes our product rather than corporate-sounding positive slop.  
- Thumbnail video: my video follows the Marc Louvion playbook: just do something funny featuring yourself, preferably form a well known reference. [Example](https://x.com/marclou/status/1723974769593499938). So I had done the banger release video below:

<iframe src="https://www.youtube.com/embed/L1FJFGkQ6us" title="Verso AI launch video" allowfullscreen></iframe>

So I expected it to go reasonably well, even hoping for the top spots.

So I published and… absolutely nothing. ProductHunt enables on some day this new (March 2026) feature called [Randomized Leaderboard](https://www.producthunt.com/p/producthunt/introducing-randomized-leaderboard-day-on-product-hunt), where for the first few hours of the day, rankings on leaderboard would be randomized for each visitor, and upvote counts wouldn’t even show for product owners. The idea is to let all products have their chance to sometimes figure on top even if they weren’t kickstarted by the upvotes of a large social media following. So I didn't worry and waited for that randomized time to end.

Then randomization time ended, and upvotes started to show on the leaderboard and dictate the rank. So I woke up from my nap (hadn’t slept all night) and checked the upvote count:

1.

We only had one upvote, and it was my own.

This was despite my cofounder upvoting and commenting (for some reason I couldn’t add him as a co-maker in there). So where did his comment go? I asked but he had gone to sleep (the hours building up to the release were intense, and we had got little sleep), so I waited for his answer.

Fast forward to 8PM : at this point it felt like the release was bugged. How is it possible to get 0 upvotes and comments in the whole day? Was our product even correctly published, or did I make a mistake in the date? 

Things got unblocked at around 9PM when the cavalry arrived:  flomerian gave us an upvote (i had cold-reached out before and told him about our product, he had promised to take a look).

<div class="figure-card" data-src="/assets/images/producthunt-is-broken/image1.png" data-alt="ProductHunt upvote screenshot" data-caption="The cavalry arrives - our first external upvote"></div>

So the upvote counter was unlocked. But alas, by then it was way too late to catch up on the leaderboard, leaders had hundreds of upvotes by then (that’s why all playbooks recommend to post at 00:01AM PST sharp)

What we did wrong:

- We should have played the reputation game more and secured minute-1 upvote from well known hunters first  
- Honestly I think the rest was fine.

We reached out to ProductHunt support and here’s what they told us;

At Product Hunt, our counters display points, not raw upvotes. Not all upvotes automatically translate to a full point - the value depends on the engagement quality and community participation of each voter's account.  
When accounts have strong participation history and genuine activity in our community, their upvotes carry more weight and can count as a full point or even more. Newer accounts or those with minimal engagement may contribute less than a full point.  
This is why we always recommend that makers prepare their community ahead of launch day by encouraging supporters to create accounts early, complete their profiles, and engage with other products and discussions. This builds their credibility within our system.  
Your current point total reflects this weighted calculation based on the quality of engagement your launch has received.

This is honestly good feedback : all upvotes are not equal.

BUT that is also still not a complete explanation (and sadly we could not get further info)

The issue is not that we did get DOWNWEIGHTED upvotes; it’s that we got NONE. Basically all our upvotes and comments were removed. I know that because at least 10 people told us they commented, and their comments disappeared. So there was no chance to get on the leaderboard.

So what could be reasonable explanations for removing our upvotes and comments?

Did we use bots or pay for upvotes? No (although since minute 1 of the launch I got some automated messages on linkedin from people proposing paid upvotes).

Now the only explanation I see is that we got flagged by an algo as using voting rings.

- The accounts our friends commented with were created for the occasion, thus low reputation, so it probably triggered a threshold.  
- Also [my LinkedIn post](https://www.linkedin.com/posts/a-roucher_gamma-doesnt-work-ai-for-powerpoint-is-activity-7448990981129011200-Xi99) got some traction (>200 reactions), it probably added other upvotes from unknown accounts.

But don’t all launches do this?

Also, I had a previous launch, [Predibench](https://www.producthunt.com/products/predibench/launches/predibench). Predibench had the exact same release process (tell friends to upvote + share on socials) and a normal upvote curve. 

<div class="figure-card" data-src="/assets/images/producthunt-is-broken/image2.png" data-alt="Predibench reaction curve" data-caption="Predibench had a normal upvote curve with the same release process"></div>

So I don't know for sure what we did wrong this time, except for not getting well-known accounts to validate us quicker.

So that’s the takeaway I’d get for others trying to launch on ProductHunt : **avoid shadowbanning by securing reputation through early upvotes from well-known accounts.**

ProductHunt, please fix your censoring algos, they’re broken!
