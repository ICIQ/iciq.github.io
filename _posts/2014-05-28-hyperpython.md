---
layout: post
title: HyperPython
name: HyperPython
subtitle: A quick and dirty introduction to solving hyperbolic conservation laws
tags: hyperbolic-PDEs pyclaw ipython teaching
categories: blog-post
---
<img src="https://raw.githubusercontent.com/ketch/HyperPython/master/figures/finite_volume.png" alt="Finite volumes" height="200" align="center">

Last week, I ran a 1-day tutorial at the 
[Workshop on Design, Simulation, Optimization and Control of Green Vehicles and Transportation](http://jkk.sze.hu/en_GB/program).  The idea was to teach attendees about Python programming,
basic theory of hyperbolic conservation laws, finite volume methods, and how to use 
[PyClaw](http://clawpack.github.io/doc/pyclaw/), all in the space of a few hours.

Inspired by Lorena Barba's recent release of 
[AeroPython](http://lorenabarba.com/blog/announcing-aeropython/),
I decided to develop a short set of IPython notebooks for the tutorial.
The result is [HyperPython](https://github.com/ketch/HyperPython),
a set of 5 lessons (plus Python crash course):

- [Lesson 0: Python](http://nbviewer.ipython.org/github/ketch/HyperPython/blob/master/Lesson_00_Python.ipynb)
- [Lesson 1: Advection](http://nbviewer.ipython.org/github/ketch/HyperPython/blob/master/Lesson_01_Advection.ipynb)
- [Lesson 2: Traffic](http://nbviewer.ipython.org/github/ketch/HyperPython/blob/master/Lesson_02_Traffic.ipynb)
- [Lesson 3: High-resolution methods](http://nbviewer.ipython.org/github/ketch/HyperPython/blob/master/Lesson_03_High-resolution_methods.ipynb)
- [Lesson 4: Fluid dynamics](http://nbviewer.ipython.org/github/ketch/HyperPython/blob/master/Lesson_04_Fluid_dynamics.ipynb)
- [Lesson 5: PyClaw](http://nbviewer.ipython.org/github/ketch/HyperPython/blob/master/Lesson_05_PyClaw.ipynb)

These won't make you an expert, but if you're looking for something short,
practical, and fun, please give them a try.  You may also find the last two
notebooks useful if you're looking for a good introduction to PyClaw.

These may be greatly expanded in the future into a full-fledged semester-length course.
