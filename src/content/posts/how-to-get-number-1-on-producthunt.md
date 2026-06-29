---
title: How to get #1 on ProductHunt
thumbnail: After failing our first launch, we came back and ended up #1 Product of the Day. Here's the full playbook, from the hunter to the last-minute push.
date: 2026-06-29
type: blog
url: how-to-get-number-1-on-producthunt
---

After [failing our first productHunt launch](https://m-ric.com/blog/how-producthunt-botched-our-launch/), [Folio AI](https://get-folio.ai/?ref=producthunt-playbook) came back a second time, this time for the win: we ended up as #1 Product of the Day!

How does this ProductHunt daily leaderboard work?
- The goal is to gather as many points (based on upvotes + comments) as possible in 24hours.
- Launch triggers at 9AM CET (convenient for us, based in Paris), then it's a merciless battle throughout the next 24 hours, until the next dawn.

> Spear shall be shaken, shield be splintered,
> a sword-day, a red day, ere the sun rises!

![A tight ProductHunt battle](/producthunt-num1/battle.png)

It was a tight battle, and it fought out all the way to the end, so I think every small detail can matter. Let's dive into it!

### Why try to get Product of the Day?

ProductHunt has > 100k daily visitors as of early 2025

Being product of the day means that you're featured on top of the website. That brought us, in essence:
- A huge spike in traffic on our website on the launch day, June 26th (the earlier buildup is due to an automated email reachout campaign that I launched)

![Traffic spike on launch day](/producthunt-num1/traffic-spike.png)

- Strong backlinks: the productHunt listing is our top link when typing "Folio AI" on Google
- A cool badge to display on our website.

<a href="https://www.producthunt.com/products/folio-ai?embed=true&amp;utm_source=badge-top-post-badge&amp;utm_medium=badge&amp;utm_campaign=badge-folio-ai" target="_blank" rel="noopener noreferrer"><img alt="Folio AI - Claude for PowerPoint, on steroids | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=1181124&amp;theme=light&amp;period=daily&amp;t=1782722103266"></a>

## How to prepare for it

3 things matter here:

### 1. Get a good Hunter to support you

On D-day, it's paramount that your product gets "featured": so not only published, but shown on the leaderboard of the day (although the votes don't appear on the first hour and the product order is randomized in an effort by ProductHunt to leave every product their chance, it's still the only way for people to discover you).

To this end, your launch needs some credibility. That's what hurt us the first time: [we got shadowbanned](https://m-ric.com/blog/how-producthunt-botched-our-launch/). And the best way to get some is to get a credible guy to vouch for you.
ProductHunt builds this mechanism in, by letting the Makers (you) recruit a Hunter who will be listed on the launch alongside them.

For this second launch, we discussed with [FloMerian](https://www.producthunt.com/@fmerian): I cold-reached out to him because I liked his past work with Pitch.com amongst others (although now he specializes more in devtools), and we got along well because he's French.

Turns out, on top of just being a name alongside us and broadcasting our launch to his huge community, he gave us invaluable advice. But that comes next.

### 2. Build a good listing

First, your listing needs to make ProductHunt users click on your name.
In [the leaderboard](https://www.producthunt.com/leaderboard/daily/2026/6/27) that users will discover you from, they see this:

![The daily leaderboard listing](/producthunt-num1/leaderboard.png)

- product name: if this one is bad, we can't do anything for you
- the logo: there's a lesser-known option to make it animated by uploading a gif, which can make you stand out
- the short description: here, you basically have one short line, a dozen words to captivate attention. As with most taglines, I think the best is to start with an anchor (what people know) to set the scene, then the qualification that shows how your product differs. "Uber, for dogs" is the prime example: everyone knows Uber, but this time it's for dogs (btw I think this specific app got banned from all app stores for creating too much value). Flo came up with "Claude for Powerpoint on steroids": I think it's impactful enough, Claude is trendy, the line is a bit funny, perfect!
- the tags: not sure if they're that useful, I never look at them
- also, note that our Hunter's comment does show here: it makes your listing a bit more noticeable compared to others who don't have one.

Then when people click your name, they go to your product page, that displays the rest of your listing:
- **Longer description:** we didn't put that much effort on that one
- **Screenshots and video:** ***this might be the single most important of all points***. We worked hard at:
	- Making the screenshots look good, by using nice fonts and colors. For the screenshots, I basically vibe-coded them in javascript, even re-coding a fake Google Slides app around them: that gave me pixel-perfect full control over them.
	- One thing about the images: it's better to make them in OpenGraph format, a very wide one, so that the thumbnails for your product on socials, which are always OpenGraph format anyway, won't be cropped off.
	- The video: ***optional in theory, but mandatory in practice***: You can go 2 ways: a boring walkthrough, or a funny ad à la Marc Louvion ([post](https://newsletter.marclou.com/p/how-to-launch-a-startup-on-product-hunt), [video](https://www.youtube.com/watch?v=Wwa5TZeMEvQ)). I had gone the [funny video](https://www.youtube.com/watch?v=L1FJFGkQ6us) route already in our failed previous launch, but this time, I decided to go the boring video route, because I felt it would help users understand the product. I edited it to be short enough (aimed for below 1 minute), and tried not to leave in it 1 second without useful info.
- **Your first maker comment:** I used the widely-used structure that goes as follows:
	- 0-Greetings
	- 1-The pain
	- 2-The solution: your product
	- 3-Some proof: show the results (we linked to slides made with our AI) + some social validation
	- 4-Promo code
	- 5-CTA
- On the above comment, I made sure that it would not be folded with a Show more button, because that means users would miss it: so I kept it short enough to avoid that fold.

Also of course you'll need to pick a date: We prioritized ranking #1, thus we decided to do it on a weekend given that the competition is reduced on weekends, at the cost of lower traffic than on weekdays. We also couldn't launch on Sunday (fmerian already had another launch planned), so Saturday was the natural pick.

### 3. Pre-warm your community

On ProductHunt, not all votes are created equal. Recent accounts count for less than 1, or even 0 if they're (often mistakenly) flagged as bots, while renowned accounts can count for more.

So if you want people to support you, it's important to pre-warm them so that they have time to create an account and go interact with some existing products so as to build a basic credibility for their account. We did exactly this with our community, by sending in advance an email to all our customers (we use resend), plus WhatsApp messages to friends, mentioning the date of launch and the steps to support us. We also set up a "launching soon" banner on our website, although I'm not sure about the impact of that last move.

## On D-day

Saturday the 26th, 9AM: off we went, our launch was [live on ProductHunt](https://www.producthunt.com/products/folio-ai/launches/folio-ai)! 🚀

We started off by triggering our messages to our community to let them know that now was the time to help.
One thing that we asked them for was to comment, because comments also count for points! And we made sure to reply each and every comment, sometimes to make extra sure that people would understand, we would reply twice. And we would often ask follow-up questions to rekindle the conversation.

Then we waited eagerly for the end of the randomization period, so at 13:00 CET (4 hours after start), for the upvote counts to start showing. But alas, at that time, we were good, but still only second. #1 was the target!

That's when I spent my one shot at making posts on socials, showing the current curve to try and mobilize readers, albeit with [limited](https://www.linkedin.com/posts/a-roucher_folio-is-live-on-producthunt-were-currently-activity-7476596719879897088-nce1?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAACblKwsBwDgtnL79PQbJBWAlA2CXtuKEhQM) [success](https://x.com/AymericRoucher/status/2070829793327665499?s=20).
Many guides advocate to keep livestreams and keep posting regularly throughout the day: I avoided it, because readers don't like being spammed, but it seems that it can work for some audiences.

One thing that helped throughout the day was to call a few guns for hire:
- [Vikram Kushwaha](https://www.linkedin.com/in/ACoAADtyNRUBTfPBf4ZiSG9zJFW54rUaYJOu1X0) made [this cool post](https://www.linkedin.com/feed/update/urn:li:activity:7476600368676814849/), 240 reactions: that was the peak at roughly 120 points, it seems to have unlocked many votes with credibility
- [Anuj Jangra](https://www.linkedin.com/posts/anujcodes21_powerpoint-googleslides-ai-share-7476609765314338817-mfee/?highlightedUpdateUrn=urn%3Ali%3Aactivity%3A7476609766518091776&origin=SOCIAL_SHARE&utm_source=share&utm_medium=member_desktop&rcm=ACoAACblKwsBwDgtnL79PQbJBWAlA2CXtuKEhQM) posted at 2:20PM, getting 500 reactions, this is another visible ramp in the curve

But at that time we still were only #2, only 6 upvotes away from the #1 position!

- Finally [Rohan Chaubey](https://www.producthunt.com/@rohanrecommends) made the last push: this pushed us over the edge to finally overcome the #1! 🥳🥳

![The final vote curve](/producthunt-num1/final-curve.png)

Judging from the pattern of votes, I think there's a noticeable "when you're #1, you gather votes faster" effect: basically users viewing the leaderboard are more curious about the top product, thus tend to upvote it more. So if you spend effort on communication like we did, better do it early in the day!
