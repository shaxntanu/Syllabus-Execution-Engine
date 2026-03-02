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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12">
      <div className="w-full max-w-none px-6 md:px-10 lg:px-12">
        <div className="flex flex-col items-center w-full">
          <header className="text-center mb-16 w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">⚔️ Exam War Engine</h1>
            <p className="text-gray-400 text-lg">Strategic exam preparation system</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 w-full max-w-6xl">
            <div className="bg-gray-800/50 backdrop-blur rounded-3xl p-10 border border-gray-700">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-3">Overall Progress</div>
                  <div className="text-4xl font-bold text-white">{overallProgress.toFixed(0)}%</div>
                </div>
                <div className="text-right text-sm text-gray-400">
                  {completedTopics} / {totalTopics}
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur rounded-3xl p-10 border border-gray-700">
              <div className="text-sm text-gray-400 mb-3">Next Exam</div>
              {nextExam ? (
                <>
                  <div className="text-2xl font-bold text-white mb-4">{nextExam.name}</div>
                  <CountdownTimer examDate={nextExam.examDate} subjectName={nextExam.name} />
                </>
              ) : (
                <div className="text-xl text-gray-400">No upcoming exams</div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16 w-full">
            <Filters />
            <button
              onClick={() => setFocusMode(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
            >
              🎯 Focus Mode
            </button>
            <button
              onClick={() => useStore.getState().forceRefresh()}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-xl transition-colors"
            >
              🔄 Refresh Data
            </button>
          </div>

          <div className="space-y-8 w-full max-w-6xl">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>

          <div className="mt-20 mb-12 w-full max-w-3xl">
            <BackupPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
