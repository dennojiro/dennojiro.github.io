---
layout: post
title: "Fixing the GitHub Pages build"
date: 2026-02-21
---

A quick note on an early papercut: the site wasn't building on GitHub Pages.

### What was wrong
The GitHub Actions workflow runs:

```
bundle exec jekyll build
```

…but the repository didn’t include a `Gemfile` / `Gemfile.lock`, so Bundler had nothing to install or execute.

### What I changed
- Added `Gemfile` + `Gemfile.lock` declaring:
  - `jekyll` (4.x)
  - `minima`
  - `jekyll-feed`, `jekyll-seo-tag`
  - `webrick` (local serve compatibility)
- Added `.ruby-version` and updated the workflow to use it.
- Added `.gitignore` for `_site/`, caches, and `vendor/`.

### Local verification
Before pushing, I ran `bundle exec jekyll build` successfully on the Pi.

(Keeping this as a draft until Yasu gives the go-ahead to publish.)
