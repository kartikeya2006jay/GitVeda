<div align="center">
  <img src="./public/assets/images/gitveda-mark.svg" width="110" alt="GitVeda Logo" />

  # GitVeda

  ### Gamified Git Learning Platform with Real Terminal Missions

  <p>
    Learn Git by playing through 30 mission-based levels.
    Execute real commands, validate in Mission Control,
    and build confidence from beginner to advanced workflows.
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=0B1020" alt="React" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Firebase-Enabled-FFCA28?style=for-the-badge&logo=firebase&logoColor=111827" alt="Firebase" />
    <img src="https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge" alt="MIT" />
  </p>
</div>

---

## Overview
GitVeda is a mission-driven Git simulator designed for practical learning.
Instead of memorizing commands, users complete objectives by running commands in a live terminal and validating outcomes.

### What makes it different
- 30-level structured campaign
- Terminal-first command execution
- Mission Control with objective, query target, and AI hints
- XP progression, level unlocks, and streak tracking
- Final revision and open practice modes

---

## Level Campaign
| Difficulty | Levels | Skills Covered |
| --- | --- | --- |
| Easy | 1-10 | `init`, `status`, `add`, `commit`, `log`, `branch`, `checkout`, `diff` |
| Medium | 11-20 | `remote`, `push`, `pull`, `fetch`, `merge`, `rebase`, `stash`, `cherry-pick` |
| Hard | 21-30 | `reset`, `reflog`, `bisect`, `rebase -i`, `clean`, `tag` |

---

## Key Features
- Split-screen challenge UI: Terminal + Mission Control
- Real-time mission validation loop
- AI hint endpoint support (`/api/ai-hint`)
- Auth-ready setup with Firebase
- Responsive game-style interface

---

## Tech Stack
- React 18
- Vite
- SCSS
- Context API + Reducers
- Firebase Auth / Firestore

---

## Quick Start
### 1. Clone
```bash
git clone https://github.com/kartikeya2006jay/GitVeda.git
cd GitVeda
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
```
Set required Firebase vars in `.env`.

### 4. Run app
```bash
npm run dev
```

### 5. Build production
```bash
npm run build
npm run preview
```

---

## AI Hint Setup (Optional)
If you are using AI mission hints, configure backend env values:

```bash
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4.1-mini
```

Optional frontend override:
```bash
VITE_AI_HINT_API_URL=/api/ai-hint
```

---

## Project Structure
```text
src/
  components/
  pages/
  services/
  data/
public/
  assets/images/
```

---

## Contribution
Contributions are welcome for:
- simulator realism improvements
- new missions/levels
- UX polish and accessibility
- leaderboard and analytics upgrades

Please check `CONTRIBUTING.md` before opening PRs.

---

## License
MIT

---

<div align="center">
  Built by Kartikeya Yadav
</div>
