---
layout: post
title: 12 steps toward rock-solid scientific Python code
tags:
    - python
    - testing
    - reproducibility
    - documentation
    - version-control
---

Much of my research is based on computer code.  My code has bugs.  

*Does that mean that my research has errors?*  Quite possibly.  

*Are you, my fellow scientist, in the same boat?*  Probably.

*What can we do about it?*

We must adopt practices that are known to lead to more correct code.
We must be willing to devote the time and energy that those practices require.
Most of the time, this is neither fun nor glorious.  We don't try to cut corners
when developing a mathematical proof or preparing an experiment -- we know that
leads to error.  Writing computer code is no different; if anything, it requires
that we take an even more methodical approach.
It is time for computational scientists to own up to this.  If we want to have
confidence in our results, and if we want others to be able to build on them,
there is no other choice.

The bonus is that adopting these practices can lead to cleaner, simpler code that is easier to understand, maintain, and debug.  In the long term, I believe that these practices lead to an overall time *savings*, and the opportunity to spend more time using our computational tools to perform research.

In short, what I'm about to show you will allow you to:

 - Have confidence in your computed results
 - Accelerate your research
 - Better communicate your research
 - Collaborate more effectively
 - Help others build on your work

## Twelve (baby) steps

So here it is: my 12-step program to writing scientific code that you can believe in:

1. [Use version control]({% post_url 2015-05-11-use_version_control %})
2. [Put your code in the cloud, in the open]({% post_url 2015-05-12-code_in_the_open %})
3. [Add a README and a License]({% post_url 2015-05-13-add_a_readme %})
4. [Write docstrings]({% post_url 2015-05-14-write_docstrings %})
5. [Write  tests]({% post_url 2015-05-15-write_tests %})
6. [Keep track of issues]({% post_url 2015-05-16-track_issues %})
7. [Automate the tests]({% post_url 2015-05-29-automate_tests %})
8. Automate the build (*coming soon*)
9. Use continuous integration (*coming soon*)
10. Monitor test coverage (*coming soon*)
11. Write narrative documentation (*coming soon*)
12. Catch errors as you type them (*coming soon*)

I know what you're thinking: that sounds like a lot of work.  It is.  But my goal in this series is to make each of these steps as straightforward and painless as possible.  Thanks to a number of recently-developed tools, **most of these tasks can be done very quickly**, at least for small and simple projects.

There is nothing magical about this precise set of steps; I could have broken them down in a different way or included others.  What's essential are the underlying principles:

- Automation (steps 1, 5, 6,7, 8, 9, 10, 12): Removal of manual processes makes code more reliable.
- Documentation (steps 3, 4, 5, 6, 11): Writing and thinking about the code makes it more reliable.
- Communication/collaboration (steps 1, 2, 3, 4, 5, 6, 11): Code that is read and used by more than one person is more reliable.

## The 12-step challenge
You could casually read through this series of posts and think about implementing these changes someday.  But don't.  **Pick a current scientific project with code**, and commit yourself now to getting it in order by following these steps.  Then go through the posts and **apply the instructions at each step** to the project you've chosen.  When you're done, you'll have one rock-solid code project and the know-how to run all of your projects that way.  The next one will be even easier.

## Pre-requisites
I've tried to make these posts very simple, but there is a minimal amount of know-how I assume.  In particular, you must be able to:

- Open a terminal, navigate your file system, and execute commands
- Edit text files

If you've taken a [Software Carpentry](http://software-carpentry.org/) course, you're more than prepared.

## What these steps won't do
I'm not going to tell you how to actually *design* better code.  That's much harder!  For that, you should read a book on programming style, like [The Pragmatic Programmer](https://pragprog.com/the-pragmatic-programmer) or [Code Complete](http://cc2e.com/).

I'm not going to make you an expert in the topics listed above.  My goal is just to get you over the initial
psychological bump, from "*I have no idea what that is*" to "*yeah, I can basically do that*".  This is the 20%
effort that gives 80% of the benefit.

## Questions

### My code is just some simple scripts; does this stuff still apply?

Yes!  In fact, I suggest starting with a small and simple project -- the smaller the better.  To demonstrate, I've written [a tiny package that does LU factorization (Gaussian elimination) for square matrices](https://github.com/ketch/rock-solid-code-demo).


### Why Python?

Useful tutorials need to be concrete.  The steps are applicable to any language, but the best tools
for achieving them vary by language.  Python is a popular language, and is what I use most.

### Why are you so sure my code has bugs?

If you're asking this, go read [Donoho et. al.'s paper on reproducible computing](http://statweb.stanford.edu/~donoho/Reports/2008/15YrsReproResch-20080426.pdf), from which I quote:

> "*Error is ubiquitous in scientific computing, and one needs to work very diligently and energetically to eliminate it.*"

Okay, what are you waiting for?  Go read [step one]({% post_url 2015-05-11-use_version_control %})!
