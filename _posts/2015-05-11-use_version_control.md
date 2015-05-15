---
layout: post
title: Step 1 - Use version control
tags:
    - python
    - reproducibility
    - version-control
    - git
---

Welcome to step 1 in [your training as a scientific Python code ninja]({% post_url 2015-05-10-rock_solid_code %}): version control.  This is not going to be an in-depth course, so if you're already using distributed version control (like Git or Mercurial), feel free to skip ahead to [step 2]({% post_url 2015-05-12-code_in_the_open %}).


## [Life before version control](http://phdcomics.com/comics.php?f=1531)

Programs change.  That script I wrote last week to process my data needs to be adapted to a new file format or to produce a different kind of analysis.  So I copy it to a new file and make some changes.  I add a few lines and comment out others.  The next week, I copy everything to a new directory so I can apply the code to a new project.  A couple of months later, I realize that I have a mess of seven different directories, each with a dozen almost-identically-named files, and I am no longer sure which is the latest or what file does what.  I spend a lot of time searching through and comparing the various files and directories to find what I need.

Meanwhile, I email some version of the script to my collaborator, who also copies and modifies it.  Each of us makes different improvements to it.  I'd like to have one version with all the improvements, but how to extract the right bits from all the copies?

Later, I find that my current version of the script doesn't work with some old data that I need to re-analyze in order to revise a paper.  Where is the old version of the script that worked with that data?  Or does it even exist?

## Version control
Version control software can help you solve all of these problems.  It keeps a record of the history of your code and shows you the changes you made at each step.  You can easily switch between different versions, or merge contributions from different authors.

There are many version control systems in use.  If you haven't used one before, it's best to find out what your collaborators use and start with that.  If nobody you work with is using version control, I recommend that you use Git.  It has become the most widely used version control system for new projects.

## Two minutes to version control
If you're on a Mac- or Linux-based system, you probably already have git.  To check, just open a terminal and type

    git
    
If you don't have it, get it here: http://git-scm.com/downloads.  Then take a moment to [set up git](https://help.github.com/articles/set-up-git/#setting-up-git).  You'll only have to do that once on a given computer.

Then do the following (replacing the directory and file names with the directory and files pertaining to your project):

```sh
cd my/project/
git init
git add project_file1
git add project_file2
...
```
    
Go ahead and add all the relevant files.  When you're done, tell git to start keeping track of them by doing

    git commit -m "Starting to keep this project under version control."
    
That's it!  To get a first idea of what's going on, try

    git status
   
and

    git log
    
To get a much better idea, take 15 minutes and go read the [first software carpentry lesson on version control](http://www.software-carpentry.org/v5/novice/git/01-backup.html).

You can get by for awhile with just the few git commands listed above.  Eventually, you will want to go beyond what is described in the Software Carpentry lesson.  When you do, it's worth reading an extended introduction [like this one](http://git-scm.com/book/en/v2).

[Continue to step two]({% post_url 2015-05-12-code_in_the_open %}).

## Extra credit: Don't copy-paste
Version control is really just one tool that will help you with a general principle of code development:

> **Don't duplicate.**

In practice, this means things like:

- If you have two functions that are almost identical, combine them (or the identical parts of them) into one.
- Don't comment/uncomment lines of code in order to control the behavior of your code.  Instead, use "if" statements and function arguments.
- If you need to apply some code to two different projects, don't copy the file.  Put it on your path.
