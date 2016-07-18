#!/bin/bash

fname=$1

ipython nbconvert --to markdown ${fname}.ipynb
sed  -i '' "./notebooks/images/"  ${fname}.md

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

mv ${fname}.md ./_posts/${dt}-${fname}.md
