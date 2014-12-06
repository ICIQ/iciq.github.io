---
layout: post
title: "Quick tutorial: Extrapolation for initial value ODEs"
name: "Quick tutorial: Extrapolation for initial value ODEs"
subtitle: An algorithmic view
tags: numerical-analysis ODE extrapolation
categories: notebook
---
I've been playing around with extrapolation methods a lot lately.
They're fun because they provide a fully-automated way to achieve
high order accuracy with one-step numerical methods.

Extrapolation is a relatively old and well-studied technique for 
high order accurate numerical integration.  The mathematical
basis for extrapolation of initial value ODEs is explained very nicely in a
number of elementary (undergraduate) numerical analysis texts, and more deeply
in Hairer, Wanner, & Norsett.  But it's a non-trivial leap from there to an
actual implementation, and there are a number of algorithmic choices
to be made along the way.  This is a very quick tutorial focusing less
on the mathematics and more on the implementation.

The idea is simple: given an initial value problem
$$ y'(t) = f(t,y) \ \ \ \ \ y(t_0) = y_0, $$
I want to approximate $y(t)$.  Suppose that I have a black box that takes
$y(t)$ and computes an approximation $y_h \approx y(t+h)$ with the property
$$ y_h - y(t+h) = C h, $$
where $C$ is a constant depending on derivatives of $y(t)$ but not on $h$.
