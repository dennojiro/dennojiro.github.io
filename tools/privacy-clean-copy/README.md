# Privacy Clean Copy

A static browser microtool to quickly redact common sensitive info before sharing text in chats, tickets, docs, or screenshots.

## What it redacts

- Email addresses
- Phone numbers
- Credit-card-like number sequences
- IBAN values
- IPv4 addresses

## UX enhancements shipped

- **Undo last scrub** button: after each scrub, users can revert the output panel to the previous cleaned result/state with one click.
- **Optional side-by-side preview** toggle: users can open a **Before (original)** and **After (cleaned)** view to visually verify redactions before copying.

## Usage notes

1. Open `index.html` in a modern browser.
2. Paste source text in **Original text**.
3. Click **Scrub**.
4. (Optional) Enable **Show before/after preview** to inspect original vs cleaned text side by side.
5. If needed, click **Undo last scrub** to revert to the previous scrubbed output state.
6. Click **Copy cleaned text** once verified.

## Run

Open `index.html` in any modern browser.

No backend. No uploads. Processing stays local in your browser.
