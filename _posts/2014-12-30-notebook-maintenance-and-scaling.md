---
layout: post
published: false

---





### Repository build



### Repository size


Repo files are 21Mb (zipped).
Most of this is in `assets/files` (31 MB, mostly large pdfs including pubs), though `_posts` is 14 Mb.
The `.git` directory on `master` branch, by comparison, is 237 Mb. 

### Compile 

------

## A more modular structure?

Perhaps the most obvious approach to the issue is to break the site over multiple repositories. 
In particular, it would be useful to separate out the older entries that do not need to be rebuilt
regularly into a more static repository. 

This raises some challenge in keeping the layout and appearance consistent without maintaining
copies of layout files across multiple repositories; and similarly in managing URLs and paths. 
By moving the domain name `www.carlboettiger.info` from the CNAME of my `labnotebook` repository
to my `cboettig.github.com` repository, that root URL will be shared across all my gh-pages repositories
unless they are given their own `CNAME` files (e.g., using subdomains). 

One option might be to: 

- create notebook repositories by year by cloning from labnotebook (to preserve git history), e.g.

```
git clone labnotebook 2014
```
- edit `_config.yml` to remove `/:year` from `_config.yml` (the repository name will automatically be used as part of the URL).

- delete all posts from different years (preferable to just wait until deleting their history, which will remove the files as well).
- delete the CNAME file.
- delete all the pages files (these will be hosted directly from `cboettig.github.io`)
- delete the assets?  Leaving them in is necessary for local previewing at least.  

A few additional steps to polish up this transition:

- Update `_includes/sidebar.html` history, sha links to the new, year-based repository instead of the original `labnotebook` (though the old links will still work unless the posts are edited further).

- Possibly consider trick such that the "Previous" button on the first post of the new year takes you to the index page of the previous year?

- Remove all other years from git history (just to shrink the repository size)

```bash
files=`echo {_posts/2008-*,_posts/2009-*,_posts/2010-*,_posts/2011-*,_posts/2012-*,_posts/2013-*}`
git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch $files" HEAD
```
