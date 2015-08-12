---
layout: post
title: Step 7 - Automate the tests
tags:
    - python
    - testing
    - automation
---

Welcome to step 7 in [your training as a scientific Python code ninja]({% post_url 2015-05-10-rock_solid_code %}): **test automation**.

Tests are extremely useful, as long as you run them.  Unfortunately, a common
pattern in many projects is this:

1. Tests are written and run by the person who wrote them.
2. Others, and even the test-writer at a future date, forget to run the tests before
   committing new code.  Or they decide not to run the tests because they 
   forget how, or they don't want to wait for the tests to finish.
3. The new code breaks the tests.  By the time somebody notices, it's too
   much trouble to go back and figure out where things went wrong, much
   less how to fix them.

How do you avoid this?  You make running the tests dead simple and fully
automatic.  This step is about making the tests run with a single command;
step 8 is about having a machine run them whenever you commit code, without
any action on your part.

As a matter of fact, in [Step 5]({% post_url 2015-05-15-write_tests %}) we
set things up so that the tests in one file could by run with a single
command.  But eventually, you will have tests in multiple files.  Besides
doctests, you may write additional tests.  If you need to type 10, or even
3 commands to run them all, there will be a mental barrier and eventually
you'll get lazy.


# nose
There are a number of test automation tools for Python, but to keep things
simple I will focus on the one I know best: [nose](https://nose.readthedocs.org/en/latest/).
Nose does one simple thing: it automatically finds all the tests in your
project and runs them.  How does it know where the tests are?  Well, it
can easily recognize doctests, and it will also pick up any function whose
name contains "test" and that is in file whose name contains "test".

# What to do:
As usual, this should only take two minutes.

0. In case it isn't installed already, do `pip install nose`.
1. First, go to your project directory and type `nosetests --with-doctest`.
   The nose executable is named "nosetests" and the option `--with-doctest`
   tells it to also run any doctests it finds.  You should get a message
   saying that some number of tests were run, with an "OK" at the end.
2. To see how nosetests becomes really useful, either: (a) add a doctest
   in another file; or (b) add a file called `tests.py` containing at least
   one function with "test" in the name.
   The test function should check something
   and raise an exception if things are wrong.  See [this example in my 
   demo project](https://github.com/ketch/rock-solid-code-demo/blob/master/tests.py).
3. Now type `nosetests --with-doctest` again.  You should see that your
   new tests were also run.  To get more detailed output, try `nosetests --with-doctest --vs`.

That's it.  Now, if you add more doctests or other tests, you can run them
all just by typing `nosetests --with-doctest`.  That's the kind of thing
you might want to add to your README.  Your rule now should be:

**Always run the tests before you commit code.**
