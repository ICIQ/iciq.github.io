---
title: Handle large binary files in a git repository
layout: post
category: computer
tags:
  - git
---

# Clean up large files already tracked in a git repo

[Q&A](http://stackoverflow.com/questions/2100907/how-to-remove-delete-a-large-file-from-commit-history-in-git-repository).

Valid methods:
- Use `git filter-branch` to delete data from history. See [removing data from a git repository](http://blog.gbacon.com/2009/08/git-shrinking-subversion-import.html).
- Use the [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/), a simpler, faster alternative to `git filter-branch` specifically designed for removing unwanted files from Git history.

# Track large binary files in repo

Valid method:
- Use `git annex`. See [official site](http://git-annex.branchable.com/).
Seems works with GitLab, especially on Enterprise accounts. GitLab doesn't have a space limit requirement, and can be installed on a personal server.
This tool only works on Linux maybe.
Need to use rsyn and other tools to synchronize large files to places outside the repo, and only track the symlink of large files in the repo.
- Use `git lfs`. See [official site](https://git-lfs.github.com/?utm_source=github_site&utm_medium=blog&utm_campaign=gitlfs). Seems works well with GitHub projects. GitHub users get 1G free storage space.
- Use `git submodule`. See [Git book examples](http://alx.github.io/gitbook/5_submodules.html).
Large files are in the submodules and can be uploaded somewhere else. 
