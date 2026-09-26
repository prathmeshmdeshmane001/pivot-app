# Pivot — Career Roadmap Builder for College Students

> **🌐 Live Production App**: [https://pivot-azure-six.vercel.app](https://pivot-azure-six.vercel.app/)  
> **📦 GitHub Repository**: [https://github.com/prathmeshmdeshmane001/pivot-app](https://github.com/prathmeshmdeshmane001/pivot-app)

[![Production Deployment](https://img.shields.io/badge/Production-Live-success?style=for-the-badge&logo=vercel)](https://pivot-azure-six.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**Pivot** is a career roadmap builder web application engineered for Indian college students and graduates navigating high-stakes career transitions across **Software Engineering (SDE)**, **Data Analytics (DA)**, **AI / Machine Learning**, **Cloud & DevOps**, and **Product Management (PM)**.

Recreated faithfully from the **Stitch (Google UI Design Tool)** export with the **Direct Credential Minimal** design system and framed in an authentic **iPhone 17 Pro** mobile canvas, Pivot brings authenticated mentor blueprints, sequential visual milestone timelines, and real-time career readiness analytics into a fast, responsive Next.js application.

---

## 🔗 Quick Links

- 🚀 **Live Production URL**: [https://pivot-azure-six.vercel.app](https://pivot-azure-six.vercel.app/)
- 🔍 **Browse & Search Roadmaps**: [https://pivot-azure-six.vercel.app/browse](https://pivot-azure-six.vercel.app/browse)
- 🔖 **Saved Stories & Bookmarks**: [https://pivot-azure-six.vercel.app/saved](https://pivot-azure-six.vercel.app/saved)
- 🛠 **Interactive Visual Builder**: [https://pivot-azure-six.vercel.app/builder](https://pivot-azure-six.vercel.app/builder)
- 📊 **Career Readiness Dashboard**: [https://pivot-azure-six.vercel.app/dashboard](https://pivot-azure-six.vercel.app/dashboard)

---

## 🚀 Key Features

1. **Onboarding & Credential Verification (`/`)**:
   - Live telemetry showing online senior mentors and community playbooks.
   - Target tech tracks for SDE, Data Analytics, AI / ML, Cloud & DevOps, and Product Management.
   - Recently published blueprints with social proof from IITs, BITS, and NITs.
   - Fast college domain & Google authentication modal.

2. **Browse & Search Playbooks (`/browse`)**:
   - Real-time search across SDE, Data Analyst, AI, PM, Cloud, company, or college.
   - Role category filter chips: *All*, *SDE*, *Data Analytics*, *AI / ML*, *Cloud / IT*, *Product (PM)*, *IITs / BITS*, *Tier-2/3 Achievers*, *Off-Campus*.
   - Dark Navy Hero cards & crisp surface cards with unclipped credibility badges.
   - Interactive **"Save to Story"** action syncing directly with the user's dashboard and Saved Stories.
   - Senior mentor profile modal with credential audits and 1:1 booking.

3. **Saved Stories & Bookmarks (`/saved`)**:
   - Dedicated bookmark collection section accessible from the 4-tab bottom navigation dock.
   - Live badge counter on bottom dock showing the number of saved stories in real time.
   - Filter saved blueprints by tech role (*SDE*, *Data Analytics*, *AI / ML*, *Cloud / IT*, *Product*).
   - Aggregate metrics summary covering total saved playbooks, milestones, and templates.
   - One-click unsave / adoption into active career roadmaps.

4. **Interactive Visual Roadmap Builder (`/builder`)**:
   - Track switcher pills to alternate between SDE, Data Analyst, Generative AI, Cloud/DevOps, and APM tracks.
   - Step-by-step milestone timeline with dynamic progress rail fill.
   - Interactive milestone nodes (Completed ✓, In Progress with mentor endorsements, Upcoming Goals).
   - Click-to-toggle milestone status between in-progress and completed.
   - Bottom sheet drawer to add custom milestones across categories (DSA, Coursework, Projects, Internships, Case Prep).
   - One-click template adoption from verified senior playbooks (*Google SDE 1*, *Flipkart DA*, *Generative AI Engineer*, *AWS Cloud*, *Blinkit APM*).
   - Shareable link copying and roadmap saving.

5. **Career Story Dashboard (`/dashboard`)**:
   - Real-time **Career Readiness Meter** (e.g., 82% Readiness) reflecting live milestone progress.
   - Role-based active track filtering (*SDE*, *Data Analytics*, *Generative AI*, *Cloud & DevOps*, *Product*).
   - Quick milestone logger to track and checkpoint preparation goals.
   - Active career tracks list with milestone previews, senior feedback quotes, and editing tools.
   - Peer shortlist benchmarks and 1:1 senior session booking.

6. **iPhone 17 Pro Presentation Frame**:
   - Authentic iPhone 17 Pro bezel and chassis with Dynamic Island and status bar.
   - Zoom controls (80% - 105%), full-bleed toggle, and screen quick switcher toolbar.

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
│   ├── saved/page.tsx          # Saved Stories & Bookmarks screen
│   ├── builder/page.tsx        # Interactive Roadmap Builder screen
│   └── dashboard/page.tsx      # Career Story Dashboard screen
├── components/
│   ├── auth/                   # College email & Google authentication modal
│   ├── builder/                # Timeline nodes and Add Milestone drawer
│   ├── cards/                  # PlaybookCard and StoryCard components
│   └── common/                 # Header, BottomNav dock, Toast, PivotLogo, IPhone17Frame
├── data/
│   └── mockData.ts             # Seed data for roadmaps, playbooks, and templates
├── lib/
│   └── context/                # RoadmapContext state & localStorage sync
├── types/
│   └── index.ts                # TypeScript interfaces and data models
└── public/
    └── icon.svg                # Pivot app icon
```
