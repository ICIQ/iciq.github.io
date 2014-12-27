---
layout: post
category: computation

---


Misc notes from #rrhack.  Much more detail under our [Github organization](https://github.com/Reproducible-Science-Curriculum), including the issues tracker & wiki for the meeting and the start of the repositories for the various teaching modules.  

Also see rrhack slack forum and twitter hashtag.    



## Key questions ##

- Audience and motivation. Reproducibility isn't a goal, it's a means to an ends. Accelerating science is the goal. Motivation should be to accelerate & scale your own science.  

- Reproducible by whom? Starting point: expert in domain, expert in language can reproduce without the need to rediscover / recreate? Better: agonstic to language? 

- Complexity. How frequently does routine, non-computational research involve writing over 1000 lines of code? Can 1000 lines of code be managed successfully without a software development approach?

- knitr & scaling issues

- The download file problem.

## Mine on using Docker ##

- Docker installed on cluster
- Students use RStudio export function to download & submit (into a standard course management platform). import data via direct calls from R (e.g. `download.file()`)


## Jenny Bryan on on using Github to teach ##

  - Free organization account (gold) with 50 private repos
  - Prof / TA team has write access
  - Each student needs to be their own team with write access to own repo
  - Student team has read access to everything, so they can see each-others work
  
  Homework submission: open an issue in their repo, tag the owners group, include the hash.  
  
  Need programmatic control of Github to set this up.  
  Need alterego to test that this works
  
  Users avoid command line for most work to start, just using Github interface and RStudio interface.  
  
  Not happy with Windows version of Github's git client (hard to connect to RStudio). 
  Not a problem with the mac.  
  


## Dockerized RStudio as pointy-clicky application? ##
  
From Jenny: Desktop launch for docker. from Dan: rewrap boot2docker to launch RStudio (hadleyverse) with a click. (installs virtualbox,docker, & boot2docker first if necessary. 129 MB. Not self contained though?).  


## New tricks ##

Working with multiple branches with different content (e.g. gh-pages): Add a `web/` subdirectory to repo and .gitignore, check out the gh-pages branch there. Add indicator of branch to user's prompt. 

Using the wiki pages: see [richfitz/ghwiki].  Rather than publish `.Rmd` files

Organization: just stick with package compendium format?
