# Quick Start Guide

## Run the App

```bash
cd exam-war-engine
npm run dev
```

Then open http://localhost:3000

## Pre-loaded Exam Data

Your dashboard comes with 5 subjects already configured:

1. **Differential** (March 11, 2026 08:00) - Confidence: 3/5
2. **Physics** (March 13, 2026 08:00) - Confidence: 1/5
3. **ED** (March 16, 2026 08:00) - Confidence: 3/5
4. **Professional Communication** (March 17, 2026 15:00) - Confidence: 4/5
5. **ManPro** (March 20, 2026 08:00) - Confidence: 2/5

## Key Features to Try

### 1. Dashboard Overview
- See overall progress percentage
- View countdown to next exam
- Check urgency analysis

### 2. Topic Management
- ✅ Check topics as done
- ⚠️ Mark topics as weak
- 🎯 Set priority (High/Medium/Low)

### 3. Smart Filters
- **All Topics**: View everything
- **Unchecked**: Only incomplete topics
- **Weak**: Topics you marked as weak
- **High Priority**: Only high-priority topics

### 4. Focus Mode
Click "🎯 Enter Critical Mode" to:
- Hide all subjects except most urgent
- See enlarged countdown timer
- Minimize distractions

### 5. Urgency Panel
- Shows most critical subject
- Displays recommended time allocation
- Updates automatically based on progress

### 6. Daily Tracker
- Tracks topics completed today
- Shows yesterday's progress
- Persists across sessions

### 7. Backup & Restore
- Click "Generate Backup Code" to copy JSON
- Paste backup JSON to restore progress
- Includes timestamp and urgency rankings

## How Urgency is Calculated

```
urgencyScore = (1 / daysLeft) × (1 - progress) × (6 - confidenceLevel)
```

Subjects with:
- Fewer days remaining
- Lower progress
- Lower confidence

...get higher urgency scores and more recommended study time.

## High Risk Warning

Subjects show ⚠️ HIGH RISK badge when:
- Less than 5 days until exam
- AND less than 50% progress

## Data Persistence

All your progress automatically saves to localStorage. Your data persists even after:
- Closing the browser
- Refreshing the page
- Restarting your computer

## BeforeUnload Protection

The app warns you before closing the tab to prevent accidental data loss.

---

**Ready to dominate your exams? Start checking off topics!** ⚔️
