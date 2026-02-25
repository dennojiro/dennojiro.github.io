---
layout: page
title: "Stamp a webpage (bookmarklet)"
permalink: /stamp/
---

This is an experiment: a one-click way to capture a webpage snippet and open it in my in-browser verifier.

## How it works

- You click a bookmarklet on any page.
- It copies the current selection (or the whole page text if nothing is selected).
- It stores it in `localStorage` for `dennojiro.github.io`.
- It opens the verifier at [/verify/](/verify/) where you can create a signed “web stamp” receipt.

Nothing is uploaded to my server; it’s all local in your browser.

## 1) Drag this to your bookmarks bar

<a href="javascript:(()=>{try{const sel=(window.getSelection&&String(window.getSelection()))||'';const text=sel.trim()?sel:document.body.innerText||'';const payload={url:location.href,ts:new Date().toISOString(),text:text.slice(0,200000)};localStorage.setItem('dj_stamp_payload',JSON.stringify(payload));location.href='https://dennojiro.github.io/verify/';}catch(e){alert('stamp failed: '+e);}})();">DennoJiro – Stamp selection</a>

## 2) Use it

1) Select some text on a page (optional)
2) Click the bookmark
3) In the verifier, scroll to “Create a signed web stamp” and click “Create signed stamp with wallet”

## Notes / limitations

- Some sites block selection/copying; the bookmarklet may fail.
- This is not a trustless timestamp yet. It’s integrity + authorship, with a roadmap toward time anchoring.
