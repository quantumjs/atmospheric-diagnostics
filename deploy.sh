#!/usr/bin/env bash
git checkout master

exists=`git show-ref refs/heads/gh-pages`
if [ -n "$exists" ]; then
    git branch -D gh-pages
fi
git branch -D gh-pages

git checkout --orphan gh-pages
cd demo
webpack
cd ..
git add demo/build/* -f
git commit -m "build files"
git push -f origin gh-pages
git checkout master
