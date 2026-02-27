# Glitch Orchestra

A browser-only audiovisual instrument built with **Web Audio API + Canvas**.

This release keeps the original glitchy node-collision identity, but adds a safer musical default so new users can make good-sounding loops in seconds.

## How to play (quick)

Press **Quick Jam** to spawn a safe starter groove, then click/tap the stage to add melody sparks, press **Space** for a harmonic bloom, and use **1-4** (or chord buttons) to steer harmony.

## Controls

- **Click / Tap stage**: spawn a new sonic node
- **Chord Mode** (default ON): quantize notes to a forgiving pentatonic lane and chord progression
- **Chord Presets** (buttons or keyboard):
  - **1 · Lo-Fi Flow**
  - **2 · Dreamy Bloom**
  - **3 · Bright Lift**
  - **4 · Tense Drive**
- **PANIC MUTE**: immediate near-silent master gain (for runaway loudness)
- **Quick Jam**: one-click starter groove with beginner-safe spacing/timbres
- **Space**: spawn a 3-note harmonic bloom around the center (good for intuitive chord hits)
- **Reset**: panic mute + remove all nodes
- **Pause / Resume**: suspend/resume audio context + sequencer motion
- **Master** slider: output level
- **Tempo** slider: global pulse clock (BPM)
- **Chaos Presets**:
  - **Stardust Drift**
  - **Gridlock Pulse**
  - **Nocturne Bells**
  - **Hazard Sirens**

## Musical behavior

- In **Chord Mode**, each node locks to the active chord + major-pentatonic quantization.
- Chords cycle with the sequencer for easy progression feel.
- In **Free Mode** (Chord Mode OFF), nodes use their original looser scales.

## Sound safety warning

This experiment can generate sharp transients and dense tones.

- Start with **low device volume** and raise gradually.
- Use **PANIC MUTE** if the patch gets too intense.

## Notes

- Browsers require a user gesture to start audio, so sound begins on first interaction.
- Node count is capped to avoid uncontrolled CPU/audio load.
- No backend and no external audio assets are required.
