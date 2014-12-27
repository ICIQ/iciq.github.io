---
layout: post
category: computation

---


Scott's analogsea package provides a great way to script commands for 
cloud instances on the digitalocean platform.  for instance, we can use
analogsea to automatically start an instance of the desired size, submit
a computationally intensive task, and then terminate the instance when the
task completes successfully.  This last step is particularly convenient
since it makes it easier to use a very powerful (and thus expensive) 
instance for a short time, knowing it will terminate and avoid extra 
charges while idle.  

To avoid first having to install the necessary software environment on
the newly created digitalocean instance, we will simply pull a docker
image that has already been provisioned.  This is particularly useful
in both keeping what we information we need to send to the cloud machine
consise (no need to list all dependencies) and fast (particularly in
the case of installing any packages from source, such as R packages from
CRAN. Thee complete installation process to generate the image we use 
here can take over an hour itself).

The analogsea package provides nice functions for working with docker
as well, as we will illustrate here.

First, we can define a custom little function that will pull a given Github
repo, run the script specified, and push the results back up.  

```r
task <- function(REPO, PATH, SCRIPT, USER = Sys.getenv("USER"), 
                 GH_TOKEN = Sys.getenv("GH_TOKEN"), 
                 EMAIL = paste0(USER, "@", USER, ".com"),
                 IMG = "rocker/hadleyverse"){
  paste(
  paste0("-it ", IMG, " bash -c \"", "git config --global user.name ", USER),
  paste0("git config --global user.email ", EMAIL),
  paste0("git clone ", "https://", USER, ":", GH_TOKEN, "@github.com/", USER, "/", REPO, ".git"),
  paste0("cd ", REPO),
  paste0("cd ", PATH),
  paste0("Rscript ", SCRIPT),
  "git add -A",
  "git commit -a -m 'runs from droplet'",
  "git push origin master",
  "\"",
  sep="; ")
}
```
This could probably be made a bit more elegant, but the idea is simple. Note
that we will clone over https, assuming a Github authentication token is available
in the environment (e.g. in `.Rprofile`) as `GH_TOKEN`.


To use this function to run the script `knit.R` in the `inst/examples`
directory of my `template` repo, I do:


```r
tsk <- task("template", "inst/examples", "knit.R", IMG="cboettig/strata")
```

which returns the commands we'll need to run as a string.  In this case I
have set a custom docker image `cboettig/strata` that contains my standard 
development environment in use on my laptop, strata.


If we have Docker installed on the local system, we can verify this script works
locally first:

```r
system(paste("docker run --rm", tsk))
```

Now we're ready for the analogsea part to submit this job to a digitalocean
machine which it will create and destroy on the fly.  Note that this assumes
we have a digitalocean account and have saved a personal authentication token
to our environment as `DO_PAT` (otherwise analogsea will simply prompt us to
autheticate manually in the browser).  This also requires we have an ssh key
added to our account already (at least at this time).  

```r
library(analogsea)
docklet_create(size='512mb') %>%
  docklet_run(tsk) %>%
  droplet_delete()
```

analogsea will first create the droplet of the desired size (analogsea refers
to digitalocean droplets which have Docker software installed as "docklets"),
then run our command and destroy the droplet.  

Note that the functions will only continue to the next step if the previous is
successful. Consequently, if the script fails for some reason, the instance
will perist and we can attempt to debug if we so choose.  If we want the instance
to be destroyed whether the script succeeds or fails, we can simply drop the last
`%>%` pipe and the destroy command will still run. (Otherwise some error handling
would be reuired aroun the `docklet_run` code tomake sure it continues.  

Sometimes the droplet login will fail due to having had a previous digitalocean
instance with the same ip (causing ssh to warn that the host identity has changed)
or to allow the token to be approved.  In this case, it may help to create the 
the droplet in a separate step, ssh into the ip returned vy `droplets()` manually
outside of R, and then return to R to launch the task:

```r
d <- droplets()
d[[2]] %>%  
  docklet_run(tsk) %>%
  droplet_delete()
```

This assumes our desired droplet is the second in the list (hence `d[[2]]`).


Of course our R instance needs to persist long enough for the job to complete,
so we need to be sure to run this from a machine that will itslef remain up,
such as a desktop or even another server.