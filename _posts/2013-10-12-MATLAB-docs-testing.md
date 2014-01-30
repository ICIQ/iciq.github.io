---
layout: post
title: Documentation, testing, and default arguments for your MATLAB packages
name: Documentation, testing, and default arguments for your MATLAB packages
subtitle: Helping MATLAB be a little more like Python
tags: python MATLAB testing documentation software RK-Opt
categories: blog-post
---

I primarily develop code in Python and Fortran, but I also use MATLAB for
certain things.  For instance, I haven't found a Python-friendly nonlinear
optimization package that measures up to the capabilities of MATLAB's
optimization toolbox (fmincon).  So my RK-opt package for optimising
Runge-Kutta methods is written all in MATLAB.

The trouble is that working in Python has spoiled me for other languages.
Python has the excellent [Sphinx](http://sphinx-doc.org/) package for writing
**beautiful documentation**.  Python has the
[nosetests](http://nose.readthedocs.org/) harness for easily writing and
running **tests**.  And Python has [a simple syntax for including **optional function
arguments** with default
values](http://www.diveintopython.net/power_of_introspection/optional_arguments.html).

MATLAB doesn't support any of these things so elegantly\*.

\**This was true one year ago, when I started writing this.  But it seems things
have improved -- see below*.

In any case, all is not lost -- I have found reasonable approximations in the
MATLAB ecosystem, and in some cases I've adapted the Python tools to work with
MATLAB. 

### Documenting MATLAB projects using Sphinx
In principle, Sphinx can be used to write documentation for packages written in
any language.  However, its [autodoc](http://sphinx-doc.org/ext/autodoc.html)
functionality, which automatically extracts Python docstrings, doesn't work
with MATLAB.  For RK-Opt, I hacked together a simple workaround in [this
74-line Python file](https://github.com/ketch/RK-opt/blob/master/doc/m2rst.py).
It goes through a given directory, extracts the MATLAB docstring for each
function, and compiles them into an .rst file for Sphinx processing.  You can
see an [example of the results
here](http://numerics.kaust.edu.sa/RK-opt/RK-coeff-opt.html).

**Update**: *as I'm writing this, I've discovered a new [MATLAB extension for
Sphinx's
autodoc](https://bitbucket.org/bwanamarko/sphinx-contrib/src/tip/matlabdomain/README.rst).
I will have to try it out sometime; please let me know in the comments if
you've used it.*

### Automated testing in MATLAB
I've become convinced that writing at least one or two tests is worthwhile for
even small, experimental packages.  In Python, it's simple to include test in
the docs and run them with doctest, or write test suites and run them with
nosetest.  For MATLAB, I would have recommended the third-party [xunit
framework](http://www.mathworks.com/matlabcentral/fileexchange/22846-matlab-xunit-test-framework).
But it seems that this year [Mathworks finally added this functionality to
MATLAB](http://www.mathworks.com/help/matlab/matlab-unit-test-framework.html).
Even so, you might want to use xunit because [it's possible to run doctests
with it](https://github.com/tgs/matlab-xunit-doctest) but not with MATLAB's new
built-in framework.  Also, you can get XML output from xunit, which a number of
other tools can analyze (for instance, to tell you about code coverage).  For
an example of how to use xunit, [see
RK-Opt](https://github.com/ketch/RK-opt/blob/master/RK-coeff-opt/test_rkopt.m).

Again, I'd be interested to hear from you in the comments if you've used
MATLAB's new built-in test harness.

### Optional arguments with default values
MATLAB does allow the user to specify only some subset of the input arguments
to a function -- as long as the omitted ones all come after the included ones.
I used to take advantage of this, with this kind of code inside the function:

    if nargin<5 rmax=50; end
    if nargin<4 eps=1.e-10; end

This is a reasonable solution in very small functions, but it breaks if you
want to add new arguments that don't come at the end, and if you want to
specify the very last value then you have to specify them all.  A better
general solution is the [inputParser
object](http://www.mathworks.com/help/matlab/ref/inputparserclass.html).
It's much less natural than Python's syntax, but the result for the user is the
same: arbitrary subsets of the optional arguments can be specified; default
values will be used for the rest.  As a bonus, you can check the types of the
inputs.  [Here's an example of
usage](https://github.com/ketch/RK-opt/blob/master/polyopt/opt_poly_bisect.m#L258).
 
If you know of better ways to do any of these things, please let me know in the comments!

Of course, it's entirely possible to develop large, well-documented,
well-tested, user-friendly packages in MATLAB --
[Chebfun](http://www2.maths.ox.ac.uk/chebfun/) is one example.  It's just that
this is the exception and not the rule in the MATLAB community.  Hopefully
better integration with testing and documentation tools will improve this
situation.
