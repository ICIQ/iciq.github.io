---
layout: post
title: Step 4 - write docstrings 
subtitle: including examples!
tags:
    - python
    - documentation
---

This is step 4 in your journey toward [rock-solid scientific Python code]({% post_url 2015-05-10-rock_solid_code %}).

Steps 1-3 were language-agnostic, but now I'm going to assume you're using
Python.  The Python language has a built-in feature for documenting functions,
classes, and modules; it is the **docstring**.  A docstring for a very simple
function looks like this:

``` python
def square(x):
    """
    Takes a number x and returns x*x.
    
    Examples:
    >>> square(5)
    25
    >>> square(2)
    4
    """
    return x*x
```

The docstring is, of course, the part inside the triple quotes.  If you type a function name followed by a "?" at the Python interpreter (or in a Jupyter notebook):

    >>> my_function?
    
then Python shows you the docstring for the function.  If you've ever tried to get help on a function that had no docstring, you know the dark feeling of despair that attends such a moment.  Don't let your code be that code.  Write docstrings!

For a somewhat longer docstring, see [my Gaussian elimination example](https://github.com/ketch/rock-solid-code-demo/blob/master/factor.py).  

What should go in a docstring?  Obviously, you should describe the arguments to the function and values returned by the function.  But usually the most useful part of a docstring is examples.  I'll repeat that, because it's important:

## Examples are the most useful part of a docstring.

Why?  Often, the docstring written by the person who wrote the code includes a bunch of stuff that mattered  when writing the code, but isn't really important when using the code.  Examples show precisely what you need to know to use the code.

Each example should show the function being called and its arguments, as well as the output.  You should format your examples like those above, using ">>>" before the input and putting the output on the next line.  This is helpful not only because users are used to the convention, but because as we'll see later it allows the computer to automatically run your examples and check that they give the expected outputs!

Here's what to do:

1. Open the file with the most important functions in your project code.  If you don't have functions, open the main script file.
2. Add a docstring for one or two of the main functions (or at the top of the script).  Make sure you include at least one example.
3. Open an IPython session or Jupyter notebook.  Import your code and then call up the docstring using "?".  Make sure this works correctly.
4. Commit and push.

[Here's what my demo repository looks like at this stage](https://github.com/ketch/rock-solid-code-demo/blob/3784b04109b2ca92633a788cc02562898064282c/factor.py).

# When should I write docstrings?

That's easy: when you start writing a new function, before you write the code itself, add the docstring.  Make it a habit!  Of course, you can come back and refine the docstring as necessary after writing the code.

Now go to [step five]({% post_url 2015-05-15-write_tests %}).
