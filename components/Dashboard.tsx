"use client";

import { useStore } from "@/store/useStore";
import { calculateOverallProgress, getNextExam } from "@/utils/calculations";
import SubjectCard from "./SubjectCard";
import Filters from "./Filters";
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
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">⚔️ Exam War Engine</h1>
          <p className="text-gray-400">Strategic exam preparation system</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-sm text-gray-400 mb-1">Overall Progress</div>
                <div className="text-3xl font-bold text-white">{overallProgress.toFixed(0)}%</div>
              </div>
              <div className="text-right text-sm text-gray-400">
                {completedTopics} / {totalTopics}
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Next Exam</div>
            {nextExam ? (
              <>
                <div className="text-2xl font-bold text-white mb-2">{nextExam.name}</div>
                <CountdownTimer examDate={nextExam.examDate} subjectName={nextExam.name} />
              </>
            ) : (
              <div className="text-xl text-gray-400">No upcoming exams</div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <Filters />
          <button
            onClick={() => setFocusMode(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            🎯 Focus Mode
          </button>
        </div>

        <div className="space-y-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </div>
    </div>
  );
}
