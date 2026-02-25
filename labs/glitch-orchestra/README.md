# Glitch Orchestra

A browser-based audiovisual instrument built with **Web Audio API + Canvas**.

Click/tap the stage to spawn moving oscillator nodes. Nodes push/pull each other, exchange rhythmic triggers when they collide, and continuously retune based on vertical position.

## Controls

- **Click / Tap stage**: spawn a new sonic node
- **PANIC MUTE**: immediate near-silent master gain (for runaway loudness)
- **Reset**: panic mute + remove all nodes
- **Pause / Resume**: suspend/resume audio context + sequencer motion
- **Master** slider: output level
- **Tempo** slider: global pulse clock (BPM)
- **Presets**:
  - **Stardust Drift**
  - **Gridlock Pulse**
  - **Nocturne Bells**
  - **Hazard Sirens**

## Sound safety warning

This experiment can generate sharp transients and dense tones, especially with many nodes or dissonant presets.

- Start with **low device volume** and raise gradually.
- Prefer headphones/speakers at moderate level.
- Use **PANIC MUTE** if the patch gets too intense.

## Notes

- Browsers require a user gesture to start audio, so sound begins on first interaction.
- Node count is capped to avoid uncontrolled CPU/audio load.
