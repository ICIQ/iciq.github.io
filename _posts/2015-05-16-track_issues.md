---
layout: post
title: Step 6 - Keep track of issues
tags:
    - python
    - reproducibility
    - documentation
---

Welcome to step 6 in [your training as a scientific Python code ninja]({% post_url 2015-05-10-rock_solid_code %}): **issue tracking**.

Look at you!  You've got your nice code with some docstrings and tests, and you're
humming along analyzing data, simulating widgets, and whatnot.  In the middle of it
all, you realize that your regression analysis function breaks if you feed it more than
57 data points.  And wouldn't it be nice if it made a plot in addition to
just printing out the correlation coefficient?  And it would all be easier to use
if your functions had default values for some of their arguments.

But you can't stop to (fix that bug)/(add that feature)/(refactor that function)
right now -- you're deep in all that beautiful data!
Besides, maybe nobody will ever try to use this script with more than 57 data values.
What should you do?

## Raise an issue.

An issue may be:

- A bug
- A bit of code that works but needs to be improved
- A potential feature enhancement

Github -- like other code repository services -- has a built-in feature for
tracking issues.  When you raise an issue on your code's Github repository,
awesome things become possible:

- You have a reminder to yourself of that thing that needs to be fixed
- Everyone else who uses your code can be aware of it too
- You and they can have a public discussion of what's wrong and how to fix it (or what could be improved)
- After it's fixed/improved, you have a permanent record of the discussion and the improvements, that can be seen by anyone

With Github's issue tracker, there's all kinds of additional goodness: issues are searchable,
can reference one another, can reference people, can be tagged/labeled, and more.
Check out [Github's 10-minute explanation](https://guides.github.com/features/issues/)
to learn all about it.

# What to do:
As usual, this should only take two minutes.

1. Think of at least one or two bugs, potential features, or improvements related to your project code.
   If you can't think of any, either you haven't been using the code much or you're not thinking
   very hard.
2. Go to your project's page in Github and click the issues button on the right side:
   ![](/assets/img/github-issues-button.png)
3. Click that big green "New Issue" button.  Give the issue a title and an explanation.
   If it's a bug, write down the exact sequence of commands that triggers it.
4. Click "Submit new issue".
5. (for the future) When you eventually get around to solving the issue, you can
   mark it as "Closed".  This doesn't delete it, but it removes it from the list
   of "Open" issues.

You're now at a page that lists all the issues for your project (presumably there's just
one so far).  If you click on an issue, you find a page where you can write further
comments and even have a conversation with other developers.  If you've never seen
such a conversation, take a look at some issues for bigger projects like
[IPython](https://github.com/ipython/ipython/issues).

## The benefits of openness
It's nice that you can keep your reminder list there in the issue tracker, but
you may be worried about exposing all the shortcomings of your code in public.
Don't be!  It's much better to have them out in the open than to get surprised
by them.  In fact, the real magic happens when other people start reporting issues.  If other people
start using your code, you'll find that somehow they run into a lot more problems
than you do.  Why?  Because there are all kinds of unstated assumptions in your head
that silently went into your code -- but your users know nothing about them.  So they
will stress your code in completely different ways and help you find all sorts of wonderful
bugs.  They may even fix some of them for you -- but that's another subject.
Just remember to be grateful -- it's easy to get your feathers ruffled when
someone points out a flaw in your code, but in fact they are doing you a service.

This goes both ways.  Your code almost certainly relies on a host of other projects,
many of which are on Github or other servers with an issue tracker.  Do you use Pandas,
numpy, scipy, or scikit-learn?  The next time you run into what might be a bug in those
packages, be proactive.  Of course you should first check Stack Overflow, but if it seems
like a bug to you, you can go raise an issue on the project's issue tracker.  That's right,
anybody in the world can raise an issue -- you don't need to be one of the project developers.
Just remember to be polite, and
[follow a few best practices](http://coenjacobs.me/effective-bug-reports-on-github/)
when you report an issue.

[Here's what the issues page for my demo project looks like](https://github.com/ketch/rock-solid-code-demo/issues)
after raising a couple of issues.  And [here's the issue tracker for a larger collaborative
project](https://github.com/clawpack/pyclaw/issues).  In academic research, I find that I
open a lot more issues than I close.  That's okay -- the issue tracker is not a to-do list
that has to be fully completed at some point.  It's just a way of keeping track
of useful improvements that could be made.

[Continue to step seven]({% post_url 2015-05-29-automate_tests %}).

#### Note: this post was originally written by David Ketcheson and posted at [http://www.davidketcheson.info/2015/05/16/track_issues.html](http://www.davidketcheson.info/2015/05/16/track_issues.html) 
under the [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/deed.en_US).
