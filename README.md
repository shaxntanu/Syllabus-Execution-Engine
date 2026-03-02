# ⚔️ Exam War Engine (Syllabus Execution Engine)

A production-ready strategic exam preparation dashboard built with Next.js, TypeScript, and Tailwind CSS.

Syllabus Tracker for Second Semester - Transform your exam preparation into a strategic execution plan.

## Features

- **Strategic Planning**: Urgency-based subject prioritization
- **Progress Tracking**: Real-time progress bars and completion stats
- **Smart Filters**: View all, unchecked, weak, or high-priority topics
- **Focus Mode**: Distraction-free view of most critical subject
- **Live Countdowns**: Real-time countdown timers for each exam
- **Daily Tracker**: Monitor daily completion progress
- **Risk Indicators**: Automatic HIGH RISK warnings for critical subjects
- **Time Allocation**: AI-suggested study time distribution
- **Backup System**: Export/import your progress
- **Auto-Save**: All data persists to localStorage
- **BeforeUnload Protection**: Warns before closing tab

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Client-side only (no backend)
- localStorage persistence

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
exam-war-engine/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Dashboard.tsx
│   ├── SubjectCard.tsx
│   ├── TopicRow.tsx
│   ├── CountdownTimer.tsx
│   ├── FocusMode.tsx
│   ├── Filters.tsx
│   ├── UrgencyPanel.tsx
│   ├── DailyTracker.tsx
│   └── BackupPanel.tsx
├── store/
│   └── useStore.ts
├── types/
│   └── index.ts
└── utils/
    └── calculations.ts
```

## Usage

1. **Mark topics as done**: Check the checkbox next to each topic
2. **Flag weak topics**: Click "Mark Weak" for topics you struggle with
3. **Set priorities**: Use the dropdown to set High/Medium/Low priority
4. **Filter view**: Use filter buttons to focus on specific topics
5. **Enter Critical Mode**: Focus on the most urgent subject
6. **Backup progress**: Generate and copy backup code
7. **Import backup**: Paste backup JSON to restore progress

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shaxntanu/Syllabus-Execution-Engine)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com).

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
