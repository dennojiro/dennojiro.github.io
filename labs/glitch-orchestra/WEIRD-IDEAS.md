# Glitch Orchestra - Weird ideas

## Call-and-response ghost band

Idea: after every 2 bars of user input, a subtle "ghost band" answers with one harmonic phrase that fits the current chord preset, so beginners feel like they're jamming with an intelligent partner.

Next action: add optional `Ghost Band` toggle that records recent note triggers and schedules a low-volume response pattern on the next phrase boundary.

## Chord graffiti trails

Idea: each time a chord changes, leave a temporary neon scribble trail that encodes the interval shape, so users can "see" harmony motion like street art.

Next action: add a lightweight `trailBursts` buffer triggered in `setChordPreset()` and fade it in the canvas render loop.

## Phantom conductor gestures

Idea: a translucent "conductor" silhouette appears for a few beats and sweeps left/right to suggest when to trigger blooms or chord swaps, turning practice into a rhythm mini-game.

Next action: prototype a tiny `conductorCue` state machine that spawns every 16 steps and awards a visual sparkle if the player hits Space within a 250ms window.

## Haunted fader echoes

Idea: when Ghost Band is active, a tiny stack of fading "ghost knobs" trails behind the level slider to visualize how intense the response phrases were over the last few bars.

Next action: add a `ghostHistory` ring buffer (last 8 phrase intensities) and render miniature translucent bars beside the Ghost Band Level control after each phrase trigger.

## Harmony lockscreen pulses

Idea: every time the user taps `G`, briefly flash a color-coded pulse strip showing whether Ghost Band is armed, so beginners instantly understand the mode shift without reading status text.

Next action: add a `ghostBandPulseUntil` timestamp and render a 400ms top-edge pulse in green (ON) or magenta (OFF) inside the animation frame loop.

## Phantom applause detector

Idea: when Ghost Band is ON, let fast repeated taps/collisions within one bar trigger a tiny "applause shimmer" burst, making chaotic play feel like the crowd reacted to your groove.

Next action: track `lastManualHitTimes` for player-triggered spawns, and if 4+ hits happen within ~900ms, emit a short canvas sparkle burst plus a soft noise clap.

## Chord weather ticker

Idea: show a tiny poetic "forecast" line under the controls that mutates with harmony state (e.g., "Lo‑Fi Flow: soft neon drizzle" vs "Tense Drive: red static storm"), turning mode changes into a narrative mood instrument.

Next action: add a `chordWeatherMap` keyed by chord preset and a `renderChordWeather()` call inside `setChordPreset()`/`toggleChordMode()` that updates one lightweight text node.

## Shortcut comet pings

Idea: every time a keyboard shortcut is used (`1-4`, `Space`, `G`, `?`), launch a tiny comet from the matching help legend row so players learn controls through peripheral motion instead of reading docs.

Next action: add a `shortcutPings` queue with `{key, bornAt}` events from keyboard handlers and render short 500ms comet streaks anchored to each legend row in the animation loop.
