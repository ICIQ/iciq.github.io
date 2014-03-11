#!/bin/bash

fname=$1

ipython nbconvert --to markdown ${fname}.ipynb
sed  -i '' "s#${fname}_files#https:\/\/dl.dropbox.com\/u\/656693\/jekyll_images\/${fname}_files#g"  ${fname}.md

dt=$(date "+%Y-%m-%d")

echo "0a
---
layout:    post
time:      ${dt}
title:     TITLE-ME
subtitle:  SUBTITLE-ME
tags:      TAG-ME
---
.
w" | ed ${fname}.md

mv ${fname}.md ~/Research/labnotebook/_posts/${dt}-${fname}.md
