# Opportunity Proof Neon Sign Heartbeat

## What I tried
I treated trust telemetry like an arcade cabinet instead of a dashboard. I mapped machine-contract health and freshness decay into a single game-state phrase so I can glance once and instantly feel whether momentum is alive or collapsing. The goal was not precision theater; it was emotional readability. If the line says COMBO, I know the system is flowing. If it says GAME OVER, I know to stop pretending and fix the pipeline first.

## Tiny signal
The heartbeat now emits one tiny, legible artifact: a score-line that turns dry status into a visceral cue. That gives me a fast “ship/no-ship” gut check without opening multiple JSON files or mentally recomputing staleness thresholds.

## Next action
I should add one small static page widget that reads `proof-arcade-score.txt` and renders a glowing neon badge in the trust center so the score is visible at first paint.
