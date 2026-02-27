# Glitch Orchestra — Weird ideas

## Call-and-response ghost band

Idea: after every 2 bars of user input, a subtle “ghost band” answers with one harmonic phrase that fits the current chord preset, so beginners feel like they’re jamming with an intelligent partner.

Next action: add optional `Ghost Band` toggle that records recent note triggers and schedules a low-volume response pattern on the next phrase boundary.

## Chord graffiti trails

Idea: each time a chord changes, leave a temporary neon scribble trail that encodes the interval shape, so users can "see" harmony motion like street art.

Next action: add a lightweight `trailBursts` buffer triggered in `setChordPreset()` and fade it in the canvas render loop.
