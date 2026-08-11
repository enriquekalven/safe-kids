# SafeKids Parent Portal

> **Algorithm-Free, Parent-Curated Children's Media Hub & Open-Source Tool Blueprint**

🌐 **Live Production URL**: [**https://safe-kids.web.app**](https://safe-kids.web.app)  
🔥 **Firebase Project**: `Project Maui` (`project-maui`)  
🎯 **Hosting Target Site**: `safe-kids`

---

## 📌 Project Overview

**SafeKids Parent Portal** is an open-source, non-commercial research summary, channel directory, and technical lockdown guide designed to help parents navigate children's digital video media.

It addresses the fundamental flaws of automated recommendation algorithms (hyper-stimulation, "brain rot" pacing, CoComelon-style dopamine loops) and native app UX issues (Family Link conflicts, broken whitelist search) by offering curated, low-stimulus content and open-source parental control alternatives.

---

## 📑 Portal Features & Content Breakdown

### 1. Top Parent Recommendations & Action Plan
* **Decision Framework:** Clear options based on child age and family habits:
  1. *Zero Screen Time (Gold Standard for 0-3)*
  2. *Curated Platforms (PBS Kids / Local Plex Server)*
  3. *Interactive Phone Approval Bot (BrainRotGuard Telegram Bot)*
  4. *Offline / Travel Players (KidzTV for flights, YouTubeWhitelist for bedtime volume fade)*
  5. *Native UI Clones (KidTube Flutter App)*
  6. *Mandatory OS Lockdown (Google Family Link & iOS Screen Time)*

### 2. Executive Research & Lessons Learned
* **COPPA & MFK Regulatory Context:** Explains the 2019 $170M FTC settlement, mandatory "Made for Kids" tagging, disabled comments/ads, and the creator pivot to franchise marketing.
* **The "CoComelon Formula":** Analyzes scene cut frequency (1–3s edits), saturated neon palettes, and continuous high-pitched loops.
* **Cognitive Development Impacts:** Summarizes Electronic Screen Syndrome (ESS), the Video Deficit Effect in under-3s, and executive function impairment.
* **YouTube Kids UX Limitations:** Highlights Family Link account conflicts, broken whitelist search, and hidden sharing workflows.

### 3. Interactive Channel Directory (5 Age Bands)
Filterable by exact age groups with 1–10 stimulus ratings, feature checklists, "Why This Channel" rationale, and starter video/playlist recommendations:
* **Toddlers (Ages 2–3):** *Puffin Rock* (1/10), *Super Simple Songs* (2/10), *Little Bear* (1/10), *Alphablocks* (3/10), *Numberblocks* (3/10), *Sarah & Duck* (2/10), *Ms. Rachel* (3/10), *Hey Duggee* (3/10), *Bluey* (3/10).
* **Preschoolers (Ages 4–5):** *Puffin Rock* (1/10), *Alphablocks* (3/10), *Numberblocks* (3/10), *Cosmic Kids Yoga* (3/10), *Super Simple Songs* (2/10), *Sesame Street* (4-5/10), *StoryBots* (5/10), *PBS Kids* (4-5/10).
* **Early Elementary (Ages 6–7):** *Art for Kids Hub* (3/10), *Mystery Doug* (4/10), *SciShow Kids* (5/10), *PBS Kids* (4-5/10), *TED-Ed* (5/10).
* **Middle Elementary (Ages 8–9):** *Nat Geo Kids* (5/10), *Crash Course Kids* (6/10), *Art for Kids Hub* (3/10), *Kids Learning Tube* (6/10), *PBS Kids* (5/10), *Mystery Doug* (4/10), *TED-Ed* (5/10).
* **Pre-Teens (Ages 10–12):** *Veritasium* (4/10), *Smarter Every Day* (5/10), *Physics Girl* (5/10), *Mark Rober* (7/10), *TED-Ed* (5/10), *SciShow Kids* (6/10), *Mystery Science* (4/10).

### 4. Open-Source Parental Control Tools Comparison
Comprehensive comparison table featuring:
* [**`BrainRotGuard`**](https://github.com/GHJJ123/brainrotguard): Self-hosted Docker PWA + Telegram approval bot for 1-tap remote phone approvals.
* [**`KidTube`**](https://github.com/SecFathy/KidTube): Flutter cross-platform app mimicking the real YouTube dark mode UI with PIN whitelist control.
* [**`YouTubeWhitelist`**](https://github.com/degipe/YouTubeWhitelist): Native Android app with bedtime volume fade-out and Kiosk mode screen pinning.
* [**`KidzTV`**](https://github.com/eltonkola/kidztv): Android app for 100% offline playback on flights and road trips.
* [**`yt-kids-safe`**](https://github.com/dreygur/yt-kids-safe): Piped/Invidious backend with JSON playlist imports.
* **Native Apps:** PBS Kids, YouTube Kids (Native), Main YouTube (Supervised Accounts).

---

## 📁 Repository Directory Structure

```
safe-kids-portal/
├── firebase.json       # Configured with site: "safe-kids"
├── .firebaserc         # Configured with project: "project-maui"
├── README.md           # Master project documentation
└── public/
    ├── index.html      # Responsive Single Page Application
    ├── styles.css      # WCAG AA compliant CSS design system
    └── app.js          # Interactive filter, search, & copy logic
```

---

## 🛠️ Local Development & Deployment

### Local Preview
Open `public/index.html` directly in a web browser, or run a local HTTP server:
```bash
cd public
python3 -m http.server 8080
```

### Deployment to Firebase Hosting
The repository is pre-configured to deploy directly to Firebase Hosting:

```bash
cd /Users/enriq/.gemini/jetski/scratch/safe-kids-portal

# Deploy update to live target
firebase deploy --project project-maui --only hosting:safe-kids
```

---

## ⚖️ License & Disclaimer

This project is an independent, non-commercial educational resource. YouTube, YouTube Kids, and Google Family Link are registered trademarks of Google LLC. All open-source projects linked belong to their respective creators.
