"use client";

import { useStore } from "@/store/useStore";
import { calculateOverallProgress, getNextExam } from "@/utils/calculations";
import SubjectCard from "./SubjectCard";
import Filters from "./Filters";
import UrgencyPanel from "./UrgencyPanel";
import DailyTracker from "./DailyTracker";
import BackupPanel from "./BackupPanel";
import CountdownTimer from "./CountdownTimer";

export default function Dashboard() {
  const { subjects, setFocusMode } = useStore();
  const overallProgress = calculateOverallProgress(subjects);
  const nextExam = getNextExam(subjects);
  
  const totalTopics = subjects.reduce((sum, s) => sum + s.topics.length, 0);
  const completedTopics = subjects.reduce(
    (sum, s) => sum + s.topics.filter((t) => t.done).length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">⚔️ Exam War Engine</h1>
          <p className="text-gray-400">Strategic exam preparation system</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl p-6 border border-blue-500/30">
            <div className="text-sm text-blue-300 mb-1">Overall Progress</div>
            <div className="text-4xl font-bold text-white mb-3">{overallProgress.toFixed(1)}%</div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {completedTopics} / {totalTopics} topics completed
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/40 to-teal-900/40 rounded-xl p-6 border border-green-500/30">
            <div className="text-sm text-green-300 mb-1">Next Exam</div>
            {nextExam ? (
              <>
                <div className="text-2xl font-bold text-white mb-2">{nextExam.name}</div>
                <CountdownTimer examDate={nextExam.examDate} subjectName={nextExam.name} />
              </>
            ) : (
              <div className="text-xl text-gray-400">No upcoming exams</div>
            )}
          </div>

          <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 rounded-xl p-6 border border-orange-500/30">
            <div className="text-sm text-orange-300 mb-3">Quick Actions</div>
            <button
              onClick={() => setFocusMode(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors mb-2"
            >
              🎯 Enter Critical Mode
            </button>
            <div className="text-xs text-gray-400 text-center">
              Focus on most urgent subject
            </div>
          </div>
        </div>

        <div className="mb-6">
          <Filters />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <UrgencyPanel />
          </div>
          <div>
            <DailyTracker />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <BackupPanel />
        </div>
      </div>
    </div>
  );
}
