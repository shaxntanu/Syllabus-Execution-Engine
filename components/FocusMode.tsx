"use client";

import { useStore } from "@/store/useStore";
import { calculateUrgencyScore } from "@/utils/calculations";
import CountdownTimer from "./CountdownTimer";
import SubjectCard from "./SubjectCard";

export default function FocusMode() {
  const { subjects, setFocusMode, setFilter } = useStore();

  const mostUrgent = [...subjects]
    .map((s) => ({ subject: s, urgency: calculateUrgencyScore(s) }))
    .sort((a, b) => b.urgency - a.urgency)[0]?.subject;

  if (!mostUrgent) return null;

  const handleExit = () => {
    setFocusMode(false);
    setFilter("all");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🎯 CRITICAL MODE</h1>
          <div className="mb-6">
            <CountdownTimer examDate={mostUrgent.examDate} subjectName={mostUrgent.name} large />
          </div>
          <button
            onClick={handleExit}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Exit Focus Mode
          </button>
        </div>

        <SubjectCard subject={mostUrgent} />
      </div>
    </div>
  );
}
