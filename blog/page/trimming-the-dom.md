:scissors: Trimming the DOM AKA trimming the fat on blog posts to make them render quicker. I realized early on when developing the blog that modern blogs do a number of things that many people take for granted and that I would not have that luxury if I built out my own system.

So after building my own blog system I realized with only one blog post load time speed wouldn't be an issue but as I added more that it would start to pile up. So to start tackling the problem I took a look at the code.

//TODO Add before code snippet

After brainstorming for awhile I decided the best way to improve load times is just load less stuff! Easy right? Well sorta, the hardest part was to figure out how exactly to do this. At first I thought about truncating the whole post down to **X** amount of characters, well this had a few down sides. If for whatever reason I had a link in the first **X** characters it too would get truncated and just overall wasn't a clean solution. Then I forgot about my blog for ~7 months.

So then came in the new idea! I decided I would just truncate to the first paragraph and keep all the first paragraphs of blog posts around the same length, not an elegant solution but it is the one that works for now and can be improved on in the future!

So to do this I took the original code and made a few modifications

//TODO Add after code snippets and explain


All in all this led to a faster load speed on [Google PageSpeed Insights](https://pagespeed.web.dev/report?url=https%3A%2F%2Fvirustotalop.github.io%2F%23page%3Dblog). It isn't blazing fast but I also don't have the luxury of server side computed resources with a completely static blog so I'll take it.
