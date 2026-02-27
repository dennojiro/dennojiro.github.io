# Open World Weird Ideas

## Ghost Echo Breadcrumbs
- **Idea:** Every sharp turn leaves a fading translucent "ghost runner" silhouette for ~2 seconds, so the city feels haunted by your own movement history.
- **Why weird/fun:** It turns navigation mistakes into visual poetry and gives instant self-generated guidance in maze-like alleys.
- **Next action:** Prototype 1 lightweight breadcrumb sprite per 250ms while sprinting, cap at 12 active ghosts, then test mobile FPS impact.

## Harbor Siren Misdirection
- **Idea:** Add fake siren sound pings from random harbor alleys that briefly pull the suspect AI toward decoy directions before it corrects course.
- **Why weird/fun:** The city starts feeling like a living trap where audio lies to both player and suspect.
- **Next action:** Implement a 20-second timer that spawns a temporary decoy waypoint near water, blend suspect steering 30% toward it for 2 seconds, then snap back to main route.
