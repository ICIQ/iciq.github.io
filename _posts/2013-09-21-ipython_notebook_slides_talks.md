---
layout: post
title: Giving a math talk using IPython notebook slides and Wakari
name:  Giving a math talk using IPython notebook slides and Wakari
subtitle: A first attempt
tags: python ipython conferences presentations
categories: blog-post
---

# Giving a math talk using IPython notebook slides and Wakari
Last week I gave my first full-length *executable talk*: one in which I showed the code that produced (almost) all the results I presented.  You can [see the talk](http://www.davidketcheson.info/talks/SciCADE-talk.slides.html#/) and [run the talk on Wakari](https://www.wakari.io/sharing/bundle/ketch/SciCADE-talk) (or download it and run it locally).  All you need is Python with its scientific packages (numpy, scipy, sympy -- I recommend just installing [Anaconda Python](http://www.continuum.io/downloads) if you haven't already).  I took things a step further and actually ran a bunch of demo code live on Wakari.  I was excited beforehand, and judging by the number of people that came into the room right immediately before my talk (and left immediately afterward), so was the audience.  But I was disappointed with how it went.  Here's why.

**Composing a talk in an IPython notebook is counterintuitive**.  When I give a talk, I try to tell a compelling and coherent story.  This requires a certain mindset, and somehow the IPython notebook helps rather than hinders -- at least, for me.  I think there is too much of a disconnect between how things look when I'm writing them and how they look as slides.  In theory Beamer is worse in this respect, but it felt worse with the notebook.

**It is hard to engage your audience with code**.  Almost nobody can digest complicated formulas during a talk, which is why even when I speak to mathematicians I usually have very few equations and lots of pictures.  Well, the same goes for code -- nobody can digest more than a few simple lines on a slide.  I think I did a good job of keeping the code short, high-level, and intuitive, but it still felt flat.

**Code in the talk needs to execute very quickly**.  This is obvious for code that you run as a live demo, but I found it necessary also for code snippets that I didn't run live (but where I wanted to show the results).  That's because when you recompile your talk (which I do *many, many times* during the composing process), you have to wait for all that code to execute again.  It doesn't help that things seem to run significantly slower on Wakari than on my laptop.

**The IPython notebook format is not (yet) good at displaying graphs and tables**.  Talks full of text put people to sleep, and code is text, so this kind of talk already has a strike against it.  But to makes matters worse, I can't insert images into my notebook slides without putting an ugly line of code above them.  And the notebook refuses to let me embed vector graphics formats (like PDF), so I have to degrade them to slightly blurry pngs.  

**It's hard to judge how long a code-based talk will take**.  I usually judge conservatively so I can move at a relaxed pace.  But my demo took much longer than I planned (partly due to the difficulty of using a Spanish keyboard), and I had to rush through the last third of the talk in about 2 minutes.  I guess this is something to learn with practice.

**The default fonts in notebook-converted slides are just too small**.  They are fine for someone sitting at a computer screen, but much too small for the projector screen at the front of a large screen.  You can adjust the size in the browser using '+', but the result looks ugly for some reason.  I know the fonts can be changed using CSS, and I'll make them larger next time.

For me, the worst condemnation of any talk is that no questions are asked afterward.  I haven't had that happen in a long time, but this was close: there was only one question, and that question demonstrated that I had completely failed to convey what was going on behind a lot of the code I had showed.

It feels too soon to give up on this approach to talks; I will try it again some time.  Perhaps I just haven't found the right use for this medium.  If you have tried giving a similar talk, I'd love to hear your opinion or suggestions.

One note about the slides: parts of them will not make sense in the absence of my verbal explanations.  I generally avoid including a lot of explanatory text in the slides.  I actually added a lot more than usual in this case because I was planning to post them online.
