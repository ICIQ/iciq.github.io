---
layout: post
title: Switching from Blogger to Jekyll
subtitle: The why and how
tags: Jekyll blogging
categories: blog-post
---
If you're reading this, then you've probably noticed: I moved my blog from [blogspot](http://scienceinthesands.blogspot.com) to my own new site.  Among other things, that meant a change in the engine that runs the blog, from [blogger](http://www.blogger.com) to [Jekyll](https://github.com/mojombo/jekyll).  It was a big jump from the simplest, hosted blogging platform out there to a rather advanced engine designed by hackers for hackers.

## Why switch?

I had been wanting for some time to include a lot more math and code in my blog posts, and it was a hassle with Blogger.  The output often looked funny and was hard to control.  With Jekyll, I get [beautiful results like this](http://localhost:4000/2012/10/11/Internal_stability.html).
I also wanted more control over my blog's appearance and greater interoperability, which meant [keeping things in plain text](http://pragprog.com/the-pragmatic-programmer/extracts/tips) and using (generated) static HTML, both of which Jekyll enables me to do.

But really the switch was part of a much bigger change: I've migrated the content of my professional home page here to davidketcheson.info and begun an open science notebook.  That's why the link at the top of the page reads **NoteBlog**: it's intended to be a combination **notebook** and **blog**.  On the blog side, I'll keep posting about issues like scientific publishing, open science, reproducibility.  On the notebook side, there will be a lot more posts of raw results and experiments from my current research projects, not intended for a general audience.  And somewhere in-between there'll be reasonably polished expository math-y posts accessible to students and researchers in my field.

## How I switched

It was easy, thanks primarily to Carl Boettiger.  This site was built based on Carl Boettiger's 
[labnotebook site](http://carlboettiger.info).
Carl publishes the source for his site on Github as the
[labnotebook project](http://github.com/cboettig/labnotebook) and
releases it all under [CC0](http://creativecommons.org/publicdomain/zero/1.0/),
so setting my site up was as easy as following 
[his instructions](http://www.carlboettiger.info/README.html),
replacing the \_posts directory, and making a few CSS customizations.

I migrated all my Blogger content following [these instructions](http://coolaj86.info/articles/migrate-from-blogger-to-jekyll.html).  This didn't manage to bring in the tags or comments, unfortunately.  I had done a poor job of tagging my posts in the past anyway, so I manually re-tagged my 45 existing posts.

## Subscribing to my new blog and/or notebook

One nice thing about having more control is that I can set up separate feeds for different kinds of posts.  On the right you'll see three RSS feed links: one for all entries (notebook and blog), and one each for the separate notebook and blog feeds.  I imagine most of you will only want to subscribe to the blog, unless you're interested in my research niche (you can look at the [categories page](http://www.davidketcheson.info/categories.html) to get an idea of what each will include).

