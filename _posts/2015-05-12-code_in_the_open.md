---
layout: post
title: Step 2 - Code in the open
subtitle: by putting your code in the cloud
tags:
    - python
    - reproducibility
    - version-control
    - open-science
    - git
---
This is step 2 in your journey toward [rock-solid scientific Python code]({% post_url 2015-05-10-rock_solid_code %}).

So you have your code under version control.  Nice.  But it's sitting there on your computer.  How do you share it with somebody else?  And if they improve it, how do you incorporate their changes?

Version control is your first tool in this regard, too.  Your second tool is Github (or Bitbucket, Google Code, etc.).  Github is a website that will keep a backup copy of your code for free, and will allow others to download it, change it, and send you their changes.  If that sounds great, read on.  If you're scared to put your code in the open because somebody might read it, ponder on [this](http://www.siam.org/news/news.php?id=2064) and then read on.

## Two minutes to open code

1. Go to [Github](http://github.com/) and create an account.
2. Once you're logged in, click on the "+" in the upper-right part of the screen and select "New repository".
3. Give it the same name as your project, and write a short description.
4. Don't initialize it with a README or license file (we'll do that in Step #3).
5. Preferably, select "public" repository.

Github will take you to a screen with different sets of instructions.  Choose that one that says "...or push an existing repository from the command line" and type what is shown there into a terminal (in your project directory):

    cd /my/project/directory
    git remote add origin git@github.com:username/projectname.git
    git push -u origin master
	
Tada!  You've just "pushed" your code to Github where it is made available to all the world!  As a bonus, you 
can sleep soundly knowing that if your office floods and your house burns down tomorrow, your code will still
be there waiting for you.  The result should look something like [my demo](https://github.com/ketch/rock-solid-code-demo).

To learn more about using Github, take a few minutes to read the [Software Carpentry
lesson](http://www.software-carpentry.org/v5/novice/git/02-collab.html).

Now [go on to step three]({% post_url 2015-05-13-add_a_readme %}).
