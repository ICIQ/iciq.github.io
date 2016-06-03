---
layout: post
title: Teaching with SageMathCloud
name: Teaching with SageMathCloud
tags: ipython teaching sagemathcloud
categories: blog-post
---
Note: this post was originally written by [David Ketcheson](http://www.davidketcheson.info/2014/05/31/teaching_with_SMC.html).

During the past Spring semester at KAUST, I again taught AMCS 252, our masters-level
course on numerical analysis for differential equations.  I've been teaching the course
using Python for 5 years now.  This year, for the first time, *I didn't spend
any time helping students install Python, numpy, matplotlib, or scipy*.  In fact, I even
had them use Clawpack -- and they didn't need to install it.  Why?  Because they
all used [SageMathCloud](http://cloud.sagemath.com) for the course.

## A little history

For the past several years, I have been increasingly integrating into the
course [a set of electronic notebooks](https://github.com/ketch/AMCS252) in
which the students are presented with some explanations and code, followed by exercises
that involve modifying, running, and understanding the numerical algorithms implemented
in the notebook.  At first these were a set of Sage worksheets, and I ran a local
Sage server within the KAUST network.  When the VM that held the server died a horrible
and irreversible death, I decided to switch to the IPython notebook format that had
become increasingly popular.  It wasn't too hard to [convert all my Sage worksheets
to IPython notebooks](http://www.davidketcheson.info/2013/01/16/sage_to_ipython.html).  But my students had to either do all their work in the
computer lab or figure out how to install the necessary Python packages on their
own machines.  This was a bit of a time sink for me, although it has gotten easier
each year thanks to packages like [Anaconda](https://store.continuum.io/cshop/anaconda/) and [Canopy](https://www.enthought.com/products/canopy/).  This also meant
that they all ended up working in slightly different environments, which occasionally
caused problems.

## IPython notebooks in the cloud

In the last year, two new cloud services emerged, both offering free accounts
with the ability to run IPython notebooks:

- [Wakari](http://wakari.io)
- [Sage Math Cloud](http://cloud.sagemath.com)

I realized that by using one of these services, I could avoid dealing with installation
issues and ensure that everyone worked in an identical environment.  Though I
have found both Wakari and SMC to be useful, I ended up going with SMC for the course
because it has, in my opinion, a more intuitive user interface.

## Getting started

On the first day of class, students had only to create a free SMC account,
create a new project, and type the URL of the course github repo into the "new file"
box, which automatically caused it to be cloned into their SMC project.  As I
updated materials during the semester, all they had to do was open a SMC terminal
and type "git pull" (in fact, none of the students had ever used git before,
but none of them had any difficulty with this during the course).  

<img src="https://cloud.sagemath.com/art/templates.png" alt="Git clone via SMC" height="200" align="center">

Another great advantage of using a cloud service was that students could work
or show their work from any computer.  Since it was a small class, I had them
present homework solutions in-class.  They could all present solutions using
the computer attached to the projector in the room by just logging into their own
SMC account.  That meant we avoided losing 5 or 10 minutes of class time in
order to switch cables or transfer files.

## Feedback

Overall, the students' feedback was very positive.  Most notably, although some
of them did eventually install Python and the related packages locally on their
laptops, they all chose to use SMC for their homework assignments throughout the
course.  There were some noticeable latency issues (the ping time between Saudi Arabia
and Seattle is 200ms), and SMC currently has a 10-20 second delay the first time
you open an IPython notebook (there's no such delay for Sage worksheets).  But those
were not showstoppers, and I think by the time I teach my next course those issues
will be resolved (by an IPython upgrade on SMC and by the launch of a European SMC
server, respectively).  William Stein, creator of SMC (and Sage) was extremely
responsive and helpful (in fact, he created a trial European server recently in response
to my and others' comments about latency).

<img src="https://dl.dropboxusercontent.com/u/656693/smc_screenshot.png" alt="SMC" align="center">

I used SMC again to [teach a 1-day tutorial](https://github.com/ketch/HyperPython/blob/master/README.md) at [a workshop](http://jkk.sze.hu/en_GB/program) this month.  Other than
a couple of minor hiccups, it again worked very well.  I plan to continue
using it for teaching in the future.  One feature I haven't used yet (but intend
to) is the ability to "collaborate" on a project so that multiple users can edit it
at the same time.  I understand that
[many other great features are in the works](http://sagemath.blogspot.com/2014/04/the-sagemathcloud-roadmap.html).

I would strongly recommend SMC to other teachers of computationally-oriented
courses, even if you're not using
IPython notebooks or Sage worksheets.  As long as all the software for your
course is freely available, you can install it all on SMC so that students
have identical environments, accessible from anything with a web browser,
with no need to do any installation of their own.

If you're interested in my notebooks, you can find them here:

- [Spring 2013 course](https://github.com/ketch/finite-difference-course)
- [Spring 2014 course](https://github.com/ketch/AMCS252)
- [HyperPython tutorial](https://github.com/ketch/HyperPython)

Just be warned that some are more polished than others, and they're likely
to all get a makeover soon.

Now that I keep a lot of my [research in IPython notebooks on Github](https://github.com/ketch/shallow_water_periodic_bathymetry/blob/master/pyclaw/shallow_water_diffraction.ipynb),  I'm also
thinking that SMC is a way to be able to show that research to anyone, anywhere.
Heck, I can create a project, clone a Github repo, and run PyClaw in a notebook **on my phone!**
Just amazing.
