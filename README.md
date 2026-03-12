# Salesforce Einstein Interactive Resume

An interactive side-scrolling resume experience inspired by classic 90s platformer games, built with vanilla HTML5 Canvas and JavaScript. No frameworks, no dependencies — just open `index.html`.

## Demo

🌐 **[Live Demo](https://michaeman.github.io/sf-resume/)**

## Features

- **Terminal intro** — Boot sequence with a retro command prompt. Type `start` to launch.
- **Hot air balloon landing** — Einstein and the Agentforce robot descend into the world via a Dreamforce-style hot air balloon. Einstein stands inside the basket with his face visible above the rim. After landing the balloon floats away.
- **Side-scrolling gallery** — Walk through resume sections as large, readable content panels.
- **Salesforce Einstein mascot** — Chibi-style Einstein character with a full animation set: walking arm-swing, jump, sideways jump, slide tackle, bow, and landing poses.
- **Agentforce robot companion** — The Agentforce robot mascot follows you through the world, hovering with a gentle bob animation.
- **5 resume sections** — Introduction, Experience, Skills, Education & Certifications, Contact.
- **Finish line** — A floating "FINISH LINE" banner with a flag that raises as you approach. Walking through triggers confetti and a thank-you modal.
- **Multiple navigation methods** — Arrow keys, WASD, mouse scroll wheel, or mobile touch controls.
- **Back to terminal** — A button fades in at the end to return to the command prompt.

## How to Use

### Run locally
Just open `index.html` in any modern browser — no build step required.

### Controls
| Input | Action |
|-------|--------|
| `Arrow Right` / `D` | Move right |
| `Arrow Left` / `A` | Move left |
| `W` | Jump |
| `W` + `A` / `D` | Sideways jump |
| `S` | Bow |
| `S` + `A` / `D` | Slide tackle |
| `Scroll wheel` | Pan the world |
| Mobile buttons | Left / Right on screen |

### Terminal commands
| Command | Description |
|---------|-------------|
| `start` | Launch the interactive resume |
| `about` | Quick name & title summary |
| `help`  | Show available commands |

## Customising Your Resume Data

All resume content lives in the `RESUME` object near the top of `game.js` (around line 30). Edit it with your own details:

```js
const RESUME = {
  name: 'Your Name',
  title: 'Your Title',
  summary: 'Your summary...',
  experience: [ ... ],
  skills: { ... },
  education: [ ... ],
  certifications: [ ... ],
  contact: { ... },
};
```

## Project Structure

```
sf-resume/
├── index.html   # Page structure + terminal + game canvas
├── styles.css   # Terminal, HUD, panel, and button styles
├── game.js      # Game engine, character drawing, resume content
└── README.md
```

## Tech Stack

- **HTML5 Canvas** — all game rendering
- **Vanilla JavaScript** — no frameworks or dependencies
- **CSS3** — terminal UI, overlays, transitions
- **Google Fonts** — Inter + JetBrains Mono

## Deployment

Hosted via **GitHub Pages** from the `main` branch root.

## License

MIT
