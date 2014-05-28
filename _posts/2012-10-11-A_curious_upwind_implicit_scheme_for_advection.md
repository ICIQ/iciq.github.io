---
layout: post
title: A curious upwind implicit scheme for advection
name: A curious upwind implicit scheme for advection
subtitle: Understanding the CFL condition
tags: numerical-analysis CFL-condition advection hyperbolic-PDEs
categories: notebook
---

The CFL condition
-----------------

The CFL condition is one of the most basic and intuitive principles
in the numerical solution of hyperbolic PDEs. First formulated by
Courant, Friedrichs and Lewy in their seminal paper (in English for
free here](http://www.stat.uchicago.edu/~lekheng/courses/302/classics/courant-friedrichs-lewy.pdf)), it states that the domain of dependence of a numerical
method for solving a PDE must contain the true domain of dependence.
Otherwise, the numerical method cannot be convergent.

The CFL condition is geometric and easily understood in the context of,
say, a first-order upwind discretization of advection. Usually it says
nothing interesting about implicit schemes, since they include all
points in their domain of dependence. But sometimes understanding the
CFL condition for a particular scheme can be subtle.

### An implicit scheme

Consider the advection equation

$$u_t + a u_x = 0.$$

Discretization using a backward difference in space and in time gives
the scheme

$$U^{n+1}_j = U^n_j - \nu(U^{n+1}_j - U^{n+1}_{j-1}).$$

Where $\nu = ka/h$ is the CFL number and $k,h$ are the step sizes in
time and space, respectively. This very simple scheme illustrates the
concepts of the CFL condition and stability in a remarkable way.

For simplicity, suppose that the problem is posed on the domain
$0\le x \le 1$, with an appropriate boundary condition. Since this
scheme computes $U^{n+1}_j$ in terms of $U^n_j$ and $U^{n+1}_{j-1}$, it
seems that the numerical domain of dependence for $U^n_j$ is
$(x,t)\in (0,x_j)\times[0,t_n]$. Based on this, we may conclude that the
scheme is not convergent for $\nu<0$. Simple enough.

But what if $\nu=-1$? Then the scheme reads $$U^{n+1}_{j-1} = U^n_j,$$
which gives **the exact solution**! This is a sort of “anti-unit CFL
condition”.

How can this scheme be convergent (in fact, exact!) for a negative CFL
number when it doesn’t use any values to the right?

### Understanding the CFL condition

Look at the exact formula above. In this case the scheme is not a method
for computing $U^{n+1}_j$ but for computing $U^{n+1}_{j-1}$, and it
*does* use a value from the previous time step that lies to the right.

So we can view the scheme with $\nu=-1$ as a method for computing
$U^{n+1}_j$, in which case the CFL condition is satisfied only for
$\nu\ge0$, or we can view the scheme as a method for computing
$U^{n+1}_{j-1}$, in which case the CFL condition is satisfied only for
$\nu\le-1$. **Which viewpoint is correct?**

To answer that question, remember that the CFL condition is purely
algebraic – that is, it relates to which values are actually used to
compute which other values. To understand this scheme, we need to think
about how we actually solve for $U^{n+1}$ when using it. Notice that the
scheme can be written as $$A U^{n+1} = U^n$$ where the matrix $A$ is
lower-triangular. Hence the system can be solved by substitution. To go
further, we must consider two cases:

1.  $\nu>0$: in this case, boundary values must be supplied along the
    left boundary at $x=0$. Then, starting from the known value at the
    boundary, we work to the right by substitution:
    $$U^{n+1}_j = \frac{U^n_j+\nu U^{n+1}_{j-1}}{1+\nu}.$$ Hence the
    scheme is truly a way of computing $U^{n+1}_j$ based on
    $U^n_j, U^{n+1}_{j-1}$ and the resulting CFL condition is $\nu\ge0$.

2.  $\nu<0$: in this case, boundary values must be supplied along the
    right boundary at $x=1$. Then, starting from the known value at the
    boundary, we work to the left by substitution:
    $$U^{n+1}_{j-1} = \frac{(1+\nu)U^{n+1}_j - U^n_j}{\nu}.$$ Hence the
    scheme is truly a way of computing $U^{n+1}_{j-1}$ based on
    $U^n_j, U^{n+1}_{j}$ and the resulting CFL condition is $\nu\le-1$.

  [CFL condition]: http://en.wikipedia.org/wiki/Courant%E2%80%93Friedrichs%E2%80%93Lewy_condition
  [their seminal paper]: http://http://dx.doi.org/10.1007%2FBF01448839
  [here]: http://www.stanford.edu/class/cme324/classics/courant-friedrichs-lewy.pdf


This post was originally published on the KAUST Mathwiki [here](https://mathwiki.kaust.edu.sa/david/A%20curious%20upwind%20implicit%20scheme%20for%20advection) (login required).
