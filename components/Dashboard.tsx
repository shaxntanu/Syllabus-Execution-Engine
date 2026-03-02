"use client";

import { useStore } from "@/store/useStore";
import { calculateOverallProgress, getNextExam } from "@/utils/calculations";
import SubjectCard from "./SubjectCard";
import Filters from "./Filters";
import CountdownTimer from "./CountdownTimer";
import BackupPanel from "./BackupPanel";

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
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-24">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">⚔️ Exam War Engine</h1>
            <p className="text-gray-400 text-lg">Strategic exam preparation system</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <div className="bg-gray-800/50 backdrop-blur rounded-3xl p-12 border border-gray-700">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-sm text-gray-400 mb-4">Overall Progress</div>
                  <div className="text-4xl font-bold text-white">{overallProgress.toFixed(0)}%</div>
                </div>
                <div className="text-right text-sm text-gray-400">
                  {completedTopics} / {totalTopics}
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur rounded-3xl p-12 border border-gray-700">
              <div className="text-sm text-gray-400 mb-4">Next Exam</div>
              {nextExam ? (
                <>
                  <div className="text-2xl font-bold text-white mb-6">{nextExam.name}</div>
                  <CountdownTimer examDate={nextExam.examDate} subjectName={nextExam.name} />
                </>
              ) : (
                <div className="text-xl text-gray-400">No upcoming exams</div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-24">
            <Filters />
            <button
              onClick={() => setFocusMode(true)}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-2xl transition-colors"
            >
              🎯 Focus Mode
            </button>
            <button
              onClick={() => useStore.getState().forceRefresh()}
              className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-2xl transition-colors"
            >
              🔄 Refresh Data
            </button>
          </div>

          <div className="space-y-12 mb-32">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <BackupPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
