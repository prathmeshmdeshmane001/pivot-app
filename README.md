# Pivot — Career Roadmap Builder for College Students

**Pivot** is a career roadmap builder web application engineered for Indian college students and graduates navigating high-stakes career transitions (such as breaking into Product Management, High-Scale Software Engineering, and AI).

Recreated faithfully from the **Stitch (Google UI Design Tool)** export with the **Direct Credential Minimal** design system, Pivot brings authenticated mentor blueprints, sequential visual milestone timelines, and real-time career readiness analytics into a fast, responsive Next.js application.

---

## 🚀 Key Features

1. **Onboarding & Credential Verification (`/`)**:
   - Live telemetry showing online senior mentors and community playbooks.
   - Recently published blueprints with social proof from IITs, BITS, and NITs.
   - Fast college domain & Google authentication modal.

2. **Browse & Search Playbooks (`/browse`)**:
   - Real-time search by profession, person, company, or college.
   - Horizontal category filters: *IITs / BITS*, *Tier-2/3 Achievers*, *Freshers / APM*, *Off-Campus*.
   - Dark Navy Hero cards & crisp surface cards with peer-vetted credibility badges.
   - Interactive **"Save to Story"** action syncing directly with the user's dashboard.
   - Senior mentor profile modal with credential audits and 1:1 booking.

3. **Interactive Visual Roadmap Builder (`/builder`)**:
   - Step-by-step milestone timeline with dynamic progress rail fill.
   - Interactive milestone nodes (Completed ✓, In Progress with mentor endorsements, Upcoming Goals).
   - Click-to-toggle milestone status between in-progress and completed.
   - Bottom sheet drawer to add custom milestones across categories (Coursework, POR, Internship, Case Comp, APM Interview Prep).
   - One-click template adoption from verified senior playbooks (*Blinkit APM*, *Google APM*, *Agentic AI*).
   - Shareable link copying and roadmap saving.

4. **Career Story Dashboard (`/dashboard`)**:
   - Real-time **Career Readiness Meter** (e.g., 80% Readiness) reflecting live milestone progress.
   - Quick milestone logger to track and checkpoint preparation goals.
   - Active career tracks list with milestone previews, senior feedback quotes, and editing tools.
   - Peer shortlist benchmarks and 1:1 senior session booking.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens from Stitch (`Direct Credential Minimal`)
- **Typography**: Google Font `Plus Jakarta Sans` via `next/font/google`
- **Iconography**: Google Material Symbols Outlined
- **State Management**: React Context (`RoadmapContext`) with automatic `localStorage` persistence

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/prathmeshmdeshmane001/pivot-app.git
   cd pivot-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Project Structure

```
├── app/
│   ├── globals.css             # Tailwind base styles and safe area insets
│   ├── layout.tsx              # Root HTML shell, fonts, and RoadmapProvider
│   ├── page.tsx                # Onboarding screen
│   ├── browse/page.tsx         # Browse & Search screen
│   ├── builder/page.tsx        # Interactive Roadmap Builder screen
│   └── dashboard/page.tsx      # Career Story Dashboard screen
├── components/
│   ├── auth/                   # College email & Google authentication modal
│   ├── builder/                # Timeline nodes and Add Milestone drawer
│   ├── cards/                  # PlaybookCard and StoryCard components
│   └── common/                 # Header, BottomNav dock, Toast, PivotLogo
├── data/
│   └── mockData.ts             # Seed data for roadmaps, playbooks, and templates
├── lib/
│   └── context/                # RoadmapContext state & localStorage sync
├── types/
│   └── index.ts                # TypeScript interfaces and data models
└── public/
    └── icon.svg                # Pivot app icon
```
