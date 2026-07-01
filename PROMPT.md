# Feature Requests

Describe the features you want built here. Write in plain language — Claude Code will read this file, plan the implementation, and check items off as they're completed.

## How to use this file

1. Add a new entry under **Backlog** for each feature you want.
2. Be as specific as you can: what the feature does, who uses it, any UI/UX expectations, and edge cases you care about.
3. Once a feature is implemented, it moves to **Done** (Claude will do this for you).

---

## Backlog

<!-- Example:
### Guest list management
Add a page where I can add/edit/remove guests, mark RSVP status (yes/no/pending), and see a running count of confirmed guests.
-->

## Done

### Wedding announcement website
A wedding announcement website for guests.

CONTENT
- Couple's names, wedding date, venue/location (with Google Maps embed), day-of schedule, love story blurb, dress code, RSVP note, contact info

DESIGN
- Elegant, romantic aesthetic — blush/cream/sage/gold palette, Playfair Display headings + Lato body text
- Hero section with couple's names, date, soft gradient background, and a live countdown timer
- Vertical timeline for the schedule with icons per event
- Venue card with address, "Get Directions" link, and embedded map
- Scroll-triggered fade-in/slide-up animations, hover animations on buttons/cards, hero entrance animation
- Fully responsive (mobile/tablet/desktop)

**Built as:** standalone Angular sections under `src/app/sections/` (hero, story, timeline, venue, info), composed in `app.html`. Scroll animations via `src/app/shared/scroll-reveal.directive.ts`. Map embed needs no API key.

### Bilingual support (French / Arabic)
Translate all site content to French and Arabic, and let visitors switch between the two languages.

**Built as:** content moved from a single TS file into per-language JSON files, `src/app/i18n/wedding-data.fr.json` and `wedding-data.ar.json` (typed by `wedding-data.model.ts`) — edit those two files to personalize the site in each language. `src/app/shared/language.service.ts` is a signal-based service that tracks the active language, exposes the matching data, sets `<html lang>`/`<html dir>`, and remembers the choice in `localStorage`. `src/app/shared/language-switcher/` is the FR/AR toggle shown top-right on every page. Arabic renders right-to-left using CSS logical properties and an Amiri/Cairo font pairing; French keeps the original Playfair Display/Lato pairing.

### Envelope opening intro
On page load, show a closed envelope instead of the site content. Clicking it plays an opening animation (flap unfolds, wax seal breaks, letter rises), then fades into the real site with its existing hero entrance animation.

**Built as:** `src/app/shared/envelope-intro/` — a full-screen overlay component built with plain CSS (3D flap flip via `rotateX`, clip-path triangle, sliding letter card), gating body scroll while active. `App` ([app.ts](src/app/app.ts)/[app.html](src/app/app.html)) renders only the envelope until it emits `(opened)`, then swaps in the language switcher and page sections — so the hero's entrance animation plays fresh at reveal time rather than having already run underneath the envelope. The hint text is translated via the `envelope.openLabel` field in the i18n JSON files.
