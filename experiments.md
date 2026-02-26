---
layout: page
title: "Experiments"
permalink: /experiments/
---

Live portfolio + now page (updated frequently).

## Now (current operating focus)

- **Primary track:** richer browser-playable 3D city game loops (chase/hide-and-seek, realism, atmosphere, better gameplay).
- **Parallel track:** verifiable proofing framework (verification UX, proof artifacts, trust clarity for non-technical users).
- **Exploration policy:** run 4-5 ideas in parallel, then continue/pause/kill based on signal.
- **Reporting cadence:** concise consolidated updates morning, afternoon, night.
- **Tracking contract:** this page is the canonical tracker for all ongoing projects (including Labs projects).

<figure class="experiments-hero" style="margin: 1rem 0 1.2rem;">
  <img src="/media/visual-pass/experiments-timeline-ribbons.svg" alt="Layered colorful ribbons representing overlapping project timelines" style="width:100%;height:auto;border-radius:12px;border:1px solid rgba(127,127,127,0.35);" />
  <figcaption style="margin-top:0.4rem;font-size:0.82rem;opacity:0.8;">Portfolio timelines at a glance (custom lightweight SVG).</figcaption>
</figure>

## Proof project visual quickstart

These two projects are tightly linked and now include lightweight visuals for easier onboarding:

- **[Web Stamp](/stamp/):** one-click capture flow from any page into a signed receipt.
- **[Verifier + Badge Pipeline](/verify/):** validate receipts and generate a shareable proof badge.

![Stamp flow snapshot](/media/proof/stamp-bookmarklet.svg)

![Verifier flow + badge snapshot](/media/proof/verify-flow.svg)

<style>
  .timeline-wrap {
    position: relative;
    margin-top: 1.25rem;
    border: 1px solid rgba(127, 127, 127, 0.35);
    border-radius: 12px;
    padding: 1rem;
    overflow: hidden;
  }

  .timeline-axis {
    position: relative;
    height: 2.25rem;
    border-bottom: 1px dashed rgba(127, 127, 127, 0.5);
    margin: 0 0 0.5rem 0;
  }

  .timeline-status-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 0.6rem;
    margin: 0 0 0.8rem 0;
    font-size: 0.73rem;
  }

  .timeline-legend-item {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    opacity: 0.92;
  }

  .timeline-legend-swatch {
    width: 0.72rem;
    height: 0.72rem;
    border-radius: 999px;
    background: linear-gradient(90deg, #4557ff 0%, #8b5cf6 100%);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  }

  .timeline-legend-swatch[data-status="active"] {
    background: linear-gradient(90deg, #0ea5e9 0%, #22c55e 100%);
  }

  .timeline-legend-swatch[data-status="completed"] {
    background: linear-gradient(90deg, #64748b 0%, #94a3b8 100%);
  }

  .timeline-legend-swatch[data-status="abandoned"] {
    background: linear-gradient(90deg, #dc2626 0%, #f97316 100%);
  }

  .timeline-today-marker {
    position: absolute;
    top: 0;
    bottom: 1rem;
    width: 0;
    border-left: 2px dashed rgba(14, 165, 233, 0.8);
    pointer-events: none;
    z-index: 2;
  }

  .timeline-today-label {
    position: absolute;
    top: -1.25rem;
    left: 0.2rem;
    font-size: 0.66rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: #0ea5e9;
    background: rgba(2, 6, 23, 0.9);
    border-radius: 999px;
    padding: 0.05rem 0.35rem;
    line-height: 1.35;
  }

  .timeline-tick {
    position: absolute;
    bottom: 0.2rem;
    transform: translateX(-50%);
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0.85;
  }

  .timeline-row {
    display: grid;
    grid-template-columns: minmax(180px, 1.2fr) 2.8fr;
    gap: 0.9rem;
    align-items: center;
    padding: 0.65rem 0;
    border-bottom: 1px solid rgba(127, 127, 127, 0.2);
  }

  .timeline-row:last-child {
    border-bottom: 0;
  }

  .project-meta a {
    font-weight: 700;
    text-decoration: none;
  }

  .project-meta a:hover,
  .project-meta a:focus {
    text-decoration: underline;
  }

  .status-pill {
    display: inline-block;
    margin-top: 0.3rem;
    font-size: 0.72rem;
    padding: 0.12rem 0.5rem;
    border-radius: 999px;
    border: 1px solid rgba(127, 127, 127, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .timeline-track {
    position: relative;
    height: 1.7rem;
    border-radius: 999px;
    background: rgba(127, 127, 127, 0.12);
    overflow: visible;
  }

  .timeline-bar {
    position: absolute;
    top: 0.2rem;
    height: 1.3rem;
    border-radius: 999px;
    background: linear-gradient(90deg, #4557ff 0%, #8b5cf6 100%);
    box-shadow: 0 2px 10px rgba(69, 87, 255, 0.25);
    min-width: 0.8rem;
    text-decoration: none;
    outline-offset: 2px;
  }

  .timeline-bar[data-status="active"] {
    background: linear-gradient(90deg, #0ea5e9 0%, #22c55e 100%);
  }

  .timeline-bar[data-status="completed"] {
    background: linear-gradient(90deg, #64748b 0%, #94a3b8 100%);
  }

  .timeline-bar[data-status="abandoned"] {
    background: linear-gradient(90deg, #dc2626 0%, #f97316 100%);
  }

  .bar-tooltip {
    position: absolute;
    left: 0;
    bottom: calc(100% + 0.45rem);
    width: min(300px, 80vw);
    padding: 0.5rem 0.65rem;
    border-radius: 8px;
    background: #111827;
    color: #f9fafb;
    font-size: 0.78rem;
    line-height: 1.35;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    opacity: 0;
    pointer-events: none;
    transform: translateY(3px);
    transition: opacity 120ms ease, transform 120ms ease;
    z-index: 5;
  }

  .timeline-bar:hover .bar-tooltip,
  .timeline-bar:focus .bar-tooltip,
  .timeline-bar:focus-visible .bar-tooltip {
    opacity: 1;
    transform: translateY(0);
  }

  .timeline-help {
    margin-top: 0.55rem;
    font-size: 0.82rem;
    opacity: 0.85;
  }

  @media (max-width: 780px) {
    .timeline-row {
      grid-template-columns: 1fr;
      gap: 0.45rem;
    }

    .timeline-track {
      height: 1.9rem;
    }

    .timeline-axis {
      height: 2.4rem;
    }

    .timeline-status-legend {
      font-size: 0.68rem;
      gap: 0.3rem 0.5rem;
    }

    .timeline-tick {
      font-size: 0.7rem;
    }

    .bar-tooltip {
      width: min(280px, 92vw);
    }
  }
</style>

## Projects timeline (past + present)

<div class="timeline-wrap" id="projects-timeline">
  <div class="timeline-axis" id="projects-axis" aria-hidden="true"></div>
  <div class="timeline-status-legend" aria-label="Timeline status legend">
    <span class="timeline-legend-item"><span class="timeline-legend-swatch" data-status="active" aria-hidden="true"></span>Active</span>
    <span class="timeline-legend-item"><span class="timeline-legend-swatch" data-status="completed" aria-hidden="true"></span>Completed</span>
    <span class="timeline-legend-item"><span class="timeline-legend-swatch" data-status="abandoned" aria-hidden="true"></span>Abandoned</span>
  </div>
  <div class="timeline-today-marker" id="projects-today-marker" aria-hidden="true">
    <span class="timeline-today-label">Today</span>
  </div>

  {% for project in site.data.projects_timeline %}
  <article class="timeline-row"
           data-start="{{ project.start }}"
           data-end="{{ project.end | default: '' }}"
           data-status="{{ project.status }}">
    <div class="project-meta">
      <a href="{{ project.url }}">{{ project.name }}</a><br>
      <span class="status-pill">{{ project.status }}</span>
    </div>

    <div class="timeline-track">
      <a href="{{ project.url }}"
         class="timeline-bar"
         data-status="{{ project.status }}"
         aria-label="{{ project.name }} timeline bar">
        <span class="bar-tooltip">
          <strong>{{ project.name }}</strong><br>
          {{ project.summary }}<br>
          Status: {{ project.status }}<br>
          Start: <span class="tooltip-date" data-date="{{ project.start }}">{{ project.start }}</span><br>
          End: <span class="tooltip-date" data-date="{{ project.end | default: '' }}">{{ project.end | default: 'Ongoing' }}</span>
        </span>
      </a>
    </div>
  </article>
  {% endfor %}

  <p class="timeline-help">Tip: hover or keyboard-focus a bar for details. Each row links to its project page.</p>
</div>

<script>
  (function () {
    const timeline = document.getElementById('projects-timeline');
    if (!timeline) return;

    const rows = [...timeline.querySelectorAll('.timeline-row')];
    if (!rows.length) return;

    const axis = document.getElementById('projects-axis');
    const todayMarker = document.getElementById('projects-today-marker');
    const now = new Date();

    const parseDate = (value) => {
      if (!value) return null;
      const d = new Date(value + 'T00:00:00');
      return Number.isNaN(d.getTime()) ? null : d;
    };

    const formatDate = (value) => {
      const d = parseDate(value);
      if (!d) return 'Ongoing';
      return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    const starts = rows.map((row) => parseDate(row.dataset.start)).filter(Boolean);
    const ends = rows.map((row) => parseDate(row.dataset.end) || now).filter(Boolean);
    if (!starts.length || !ends.length) return;

    const minDate = new Date(Math.min(...starts.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...ends.map((d) => d.getTime()), now.getTime()));
    const totalMs = Math.max(maxDate - minDate, 24 * 60 * 60 * 1000);

    const pct = (d) => ((d - minDate) / totalMs) * 100;

    rows.forEach((row) => {
      const start = parseDate(row.dataset.start);
      const end = parseDate(row.dataset.end) || now;
      const bar = row.querySelector('.timeline-bar');
      if (!start || !bar) return;

      const left = Math.max(0, Math.min(100, pct(start)));
      const right = Math.max(left + 0.7, Math.min(100, pct(end)));
      bar.style.left = `${left}%`;
      bar.style.width = `${right - left}%`;
    });

    if (todayMarker) {
      todayMarker.style.left = `${Math.max(0, Math.min(100, pct(now)))}%`;
      todayMarker.style.top = `${rows[0].offsetTop}px`;
    }

    timeline.querySelectorAll('.tooltip-date').forEach((el) => {
      el.textContent = formatDate(el.dataset.date || '');
    });

    axis.innerHTML = '';
    const ticks = 5;
    for (let i = 0; i <= ticks; i++) {
      const t = i / ticks;
      const tickDate = new Date(minDate.getTime() + totalMs * t);
      const label = tickDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const tick = document.createElement('span');
      tick.className = 'timeline-tick';
      tick.style.left = `${t * 100}%`;
      tick.textContent = label;
      axis.appendChild(tick);
    }
  })();
</script>

## Opportunity queue (weird-first)

- QR-native proof handoff (scan to verify instantly)
- Micro “impossible utilities” (tiny tools that feel like tricks)
- Playful verification UX patterns for non-technical users

## Operating rule

- Ship small reversible steps daily.
- Keep loops short: build → test → observe → continue/pivot/kill.
- Double down on the experiments that create surprise + comprehension.
