---
layout: post
title: Step 5 - write tests
tags:
    - python
    - testing
---

This is step 5 in your journey toward [rock-solid scientific Python code]({% post_url 2015-05-10-rock_solid_code %}): **write tests**.

Tests?  Ugh.

I hear you.  Writing tests is not an inherently fun process.  However, the alternative is debugging, staring at code and thinking real hard about what could be wrong, and more debugging.  I'll take writing tests any day of the week.

You may still not be convinced.  Fortunately, I don't have to convince you, because I'm not going to ask you to write tests in this step.  As a matter of fact, I tricked you into writing tests in step 4.  Remember those examples you put in your docstring?

Yeah, I'm sneaky like that.

What is a test?  It's a bit of code that uses your project code, together with assertions regarding the output.  Here's how you can use the docstring you wrote as a test:

1. Go to your project directory and identify the file to which you added one or more docstrings in step 4.  We'll refer to that as `my_file.py`.
2. At the command line (i.e., in a terminal), type `python -m doctest -v my_file.py` (but substitute the name of your file).
3. Look at the printed output to see if your test(s) passed.

What just happened?  Doctest is a python module that takes all the examples in your docstrings, runs them, and checks whether the output in the docstring matches the actual output.  If any of your doctests failed, you should compare the actual output with your docstring and correct things.

I always forget how to invoke doctest, so I put the following code at the bottom of all my `.py` files:

``` python
if __name__ == "__main__":
    import doctest
    doctest.testmod()
```

After adding that, I can just do

    python my_file.py -v

and it will automatically run the doctests.  One warning: if you don't add the
`-v` flag (for verbose) on the command line, then there will be no printed
output at all unless some test fails.  And if you put `-v` before your filename,
you'll get something totally different.

Doctests are certainly not all there is to testing in Python, but for me they are a minimal-effort approach that makes my code much more reliable.  If you add a docstring with a doctest to each function and module in your code, you'll spend a lot less time debugging later on.  I bet you'll also find some bugs as you add the doctests.

From now on, just make it a habit to add a docstring and a doctest whenever you write a new function.  Your future self will thank you.

[Here's what my demo repository looks like at this stage](https://github.com/ketch/rock-solid-code-demo/blob/13ab3f8af4e6be813eaee512897948e4c5a178a7/factor.py).

[Continue to step six]({% post_url 2015-05-16-track_issues %}).

#### Note: this post was originally written by David Ketcheson and posted at [http://www.davidketcheson.info/2015/05/15/write_tests.html](http://www.davidketcheson.info/2015/05/15/write_tests.html) 
under the [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/deed.en_US).
