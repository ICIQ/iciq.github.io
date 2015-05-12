---
layout: post
title: Step 3 - Add a README and a License
tags:
    - open-science
---
This is step 3 in your journey toward [rock-solid scientific Python code]({% post_url 2015-05-10-rock_solid_code %}).

So your code is [under version control]({% post_url 2015-05-11-use_version_control %}) and it's 
[floating up there in the cloud]({% post_url 2015-05-12-code_in_the_open %}).
In principle, someone else could use it.  But how will they know it's there?
How will they know what it does, and how to install and use it?

# You need a README file.

A README is minimalist documentation -- just what is absolutely necessary for someone to start using your code.  Most often, that someone is your future self, who has forgotten things.  Here's what to do:

1. Go to your project directory and open a new file.  Call it README.md.  The .md extension stands for Markdown, which is just an embellished format for text files that lets you add text formatting in simple ways that will automatically show up on Github.  You can learn more about Markdown [here](https://help.github.com/articles/markdown-basics/), but for the moment just think of it as a text file.
2. Write the contents of the README file.  You should probably include:
    - a brief description of what your code does;
    - instructions for installing your code;
    - what other code needs to be installed for it to work;
    - one or two examples of how to invoke your code;
    - optionally: who wrote the code, how to cite it, and who to contact for help.
One good example of a README file is [here](https://github.com/github/markup/blob/master/README.md).

3.  Save and close the file.  
4. Add it to your repository with `git add` and `git commit`.
5. Push the file to github with `git push`.
6. Go to the page for your project on Github.  You should see the contents of your README file displayed automatically right below the directory listing.  It should look [something like this](https://github.com/ketch/rock-solid-code-demo).

Note: it's also possible (and even easier) to add a README directly on Github, by clicking that nice green button:

![](/assets/img/github-readme-button.png)

Nice work!  Now others (or your future self) stand a decent chance of being
able to use your code.  But they may not want to use it in exactly the same way
you do.  In fact, there's a good chance they may want to modify it, or
incorporate it into some other code they have.  By default, copyright laws
don't allow them to do that.  If you want others to be able to use your code
for their purposes...

# You need a License file.

This part is fairly painless because, unlike a README, the license you use
should NOT generally be customized for your project.  It's much better to
choose a standard license, so that other people don't need to agonize over all
the fine print.  The most common licenses for open source scientific software
are 

- [BSD](http://choosealicense.com/licenses/bsd-2-clause/),
- [MIT](http://choosealicense.com/licenses/mit/), and
- [GPL](http://choosealicense.com/licenses/gpl-2.0/).  

All of these allow others to use, redistribute, and
modify your code.  The GPL license imposes one restriction that is absent from
the others: other code that uses yours must also be GPL.  Some view this as a
great way to encourage more free, open-source code.  Others view it as an
impediment to your code being used.  My suggestion is to use a BSD license, but
if you want to investigate in more detail, try [Choose A
License](http://choosealicense.com/) or go read [this
paper](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3406002/).

Here's what to do:

1.  Create a file called LICENSE.txt in your project directory.
2.  Paste the license text (from one of the links above) into the file, save, and close.
3.  Commit and push the file to Github.

That's it!  Other folks can now legally adapt your code for their own purposes.

Congratulations on making it this far.  Step four is coming soon.


# Extra credit: Contributing.md and Thanks.md

It's great that other people can now make improvements to your code.  It would be even better if they sent those improvements back to you!  To encourage that, you should add a Contributing.md file to tell them what your standards for acceptable code are and what the process is for adding code to your repository.  Github provides a [standard template for such a file](https://raw.githubusercontent.com/contribute-md/contribute-md-template/master/contribute.md), though for small projects you can provide something much simpler.  Some good examples of contributing files are:

 - [Puppet](https://github.com/puppetlabs/puppet/blob/master/CONTRIBUTING.md)
 - [Factory_girl_rails](https://github.com/thoughtbot/factory_girl_rails/blob/master/CONTRIBUTING.md)
 
 If people have contributed to your project, it's standard to have a file called Thanks.md that lists their names and contributions.


