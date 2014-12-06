---
layout: post
title: "Conceptual review: parallel time integration"
name: "Conceptual review: parallel time integration"
subtitle: Rebelling against causality
tags: python ipython
categories: notebook
---

A recent [question on scicomp.stackexchange](http://scicomp.stackexchange.com/questions/7714/whats-the-state-of-the-art-in-parallel-ode-methods) asked 
*what is the state of the art in parallel ODE methods?*
Since I recently conducted (as part of my own research) a survey of
the literature, I've decided to write up an answer as a blog post.
I'm not going to get very mathematical, but I will try to be thorough
and point you, dear reader, to where you can learn more about the main ideas
behind current techniques.

# Why parallelize in time?

If you want to bother with solving ODEs in parallel, you probably have
a lot of ODEs.  On today's hardware, perhaps **millions or billions**.
That means that your ODEs probably come from a large N-body system or 
a PDE semi-discretization.  And *that* means you already have other
parallelization techniques at your disposal -- techniques in which a
subset of your ODE system is given to each process.  This means domain
decomposition for PDEs, and tree-based of fast multipole methods for
N-body problems.  Given the success of those parallelization methods,
and the decades of research that have gone into them, **why would you bother
parallelizing in time?**

You probably wouldn't.  

Hardly anybody uses temporal parallelism
in numerical ODE computations, and here's the main reason: **causality**.
Spatial parallelism takes advantage of the fact that *the solution
in a given region and time interval may only be very loosely coupled (or
not coupled at all) to the solution in a distant region over the same time*.
For temporal parallelization to be equally effective, you would need the
solution in a given region and time to depend only weakly on the solution
at much earlier times, but that's not often the case for interesting problems.

So when is temporal parallelism useful?  I can think of two regimes:

## Use case 1: small-scale
When you solve a large linear system in MATLAB on your laptop via

    x = A\b

MATLAB's backslash operator is smart: it notices that your laptop has two
cores, and it solves the linear system in parallel.  The great thing
about this is that you didn't need to write any parallel code.
Unfortunately, when you solve a system of ODEs using MATLAB's ode45
command, it will plug away with just one process, even if you're on a workstation
with 16 cores.  Now, given that you're using MATLAB, your system 
probably isn't too big, so you won't have to wait too long.  Maybe it's
just five minutes -- long enough to go get a coffee.  But
if ode45 ran twice as fast, or four times as fast, you could do more science.
Or at least drink less coffee.  The point is, a black-box parallel ODE
solver would be useful in speeding up even relatively small-scale
calculations.

## Use case 2: large-scale
If use case 1 made you yawn, consider the case in which you have a huge
system of ODEs and you're running a spatially-parallel code on a hundred
thousand (or more) processors.  In order to use all those processors, you
have to break your problem down into smaller and smaller subdomains.
At some point, every code reaches the *strong scaling limit*.  That's
when the chunk of work that you're giving to each process is so small
that the solution time is completely dominated by communication and/or
overhead costs.  You just can't get a benefit from using any more processes
for that problem.

Enter temporal parallelism.
blah blah blah.


# How to parallelize in time: N ideas
Every approach to temporal parallelization that I'm aware of depends on
the required accuracy of the solution.  That is, parallelism is used to
get better accuracy, so if you only need a low-accuracy solution, you
won't get much benefit.

## Idea 1: extrapolation
**Compute several independent approximations of the solution whose
error terms are related in a known way.  Then combine them in a way that
eliminates the dominant errors.**

## Idea 2: defect correction
**Compute (in serial) a rough approximation of the solution over the whole
temporal domain.  Then use each process to refine the solution in one subdomain.**
