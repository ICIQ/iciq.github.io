---
layout: post
title: Testing whether your code produces the correct plots -- in Python and on Travis
subtitle: How to use matplotlib's image_comparison decorator in your own project
tags:
    - python
    - matplotlib
    - testing
---

A few years ago I was introduced to the idea of testing the scientific code I write,
and now I am a huge fan of this approach.  It saves huge amounts of time and vastly
improves the quality of my research by helping me catch bugs early and often.
I use [nose](https://nose.readthedocs.org/en/latest/) for automatically finding
and running all the tests.  I use [Travis](https://travis-ci.org/) to
automatically run the tests every time I update the code -- or issue a pull
request -- on Github.

# Image regression tests

Usually, I can test the output of a routine by comparing numbers (generally, by
taking norms of large arrays of numbers).  However, I also develop routines that
are used to visualize numerical output, using matplotlib and other Python plotting
tools.  Sometimes the numerical output is fine
but the visualization code breaks.  It's easy to write tests that just make sure
the visualization code still runs, and that perhaps check some assertions about the
properties of the resulting matplotlib objects in memory.  But that doesn't ensure that
the image still looks right.  How does one automatically check whether an image is
correct?

Obviously, *correct* in this case must refer to some reference image that you
produced once and whose correctness you confirmed by visual inspection.
In other words, I'm talking about *regression testing*, which simply ensures that
things function as they did before.
To regresion test an image, you could write an image file and check whether it
is bitwise identical to the reference image.  But this is very problematic, since
running the same bit of matplotlib code on two different machines will often lead
to slightly different output, depending on the versions of other libraries that
are installed, the fonts available, etc.  Some more intelligent method of comparison
is needed.

# The image_comparison decorator

Fortunately, the matplotlib developers have been grappling with these issues
for a long time and have a nice packaged solution, in the form of a Python
decorator `@image_comparison`, whose usage within matplotlib is 
[explained here](http://matplotlib.org/devel/testing.html).
The decorator automatically deals with saving the test image and comparing it
to the reference image; all you do is add the decorator before your test
function.

Clearly, I thought, it would be great if I could use this decorator for image
testing in my own projects.  So I followed the instructions linked above, but
things didn't immediately work.  Apparently [others have had the same
experience](http://matplotlib.1069221.n5.nabble.com/Image-comparison-decorators-outside-matplotlib-td42215.html),
so I thought I'd share what I had to do to get things working.

# Getting things to work locally

The decorator makes a few assumptions that are based on the directory
structure of matplotlib's own test directories.  So you have two options:

1. Make your project's test directory structure conform to matplotlib's.
2. Create a modified version of matplotlib's image_comparison decorator for
   your own project.

I went with option 1, since I generally prefer to outsource as much functionality
as reasonably possible.  I had to do the following:

- Your tests must live in a submodule named `tests`.  Thus if your package is named
  *pystuff*, you might have your tests in `pystuff/tests/my_tests.py` and there should
  be an `__init__.py` file in the `tests` directory (it can be just an empty file).
- The baseline images should be in a directory `pystuff/tests/baseline_images/my_tests/`
  (replace `my_tests` with the name of the file containing your tests).
  Note that the image names are specified as arguments to the decorator.

Once I did that the tests passed on my machine.  However, they didn't pass on Travis.


# Getting things to work on Travis

I ran into two issues on Travis:

1. Generating matplotlib figures on Travis with a backed that requires DISPLAY will
   fail if it is not set.
2. Even if display is set, Travis may use a different backend than you do locally,
   which may lead to test failure (e.g., because the images produced have different
   numbers of pixels).

Both of these are solved by ensuring that matplotlib uses the *agg* backend for the
tests (both locally and on Travis).  To set the backend to *agg*, just add the command

```python
matplotlib.use('agg')
```

This line must be executed before you import *pylab* or `matplotlib.pyplot`.
This is very tricky if you are using nose, because nose actually imports every
file in your package during the test collection phase.  What I had to do to get
things to work (and the matplotlib package itself does the same!) is to put
a `tests.py` script in the top directory of my package.  This script has the
following contents:

```
#!/usr/bin/env python

import matplotlib
import nose
matplotlib.use('agg')

nose.main()
```
Instead of calling nosetests directly on Travis, I use the following in my `.travis.yml`
file:

```
script:
  - cd $HOME/build/my/package
  - python tests.py
```

That's it!  Since examples are the best documentation, you can check out my 
working setup [here](https://github.com/ketch/griddle).
