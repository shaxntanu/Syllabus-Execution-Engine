"use client";

import { useStore } from "@/store/useStore";
import { calculateUrgencyScore, getSuggestedTimeSplit } from "@/utils/calculations";

export default function UrgencyPanel() {
  const { subjects } = useStore();

  const sortedByUrgency = [...subjects]
    .map((s) => ({ subject: s, urgency: calculateUrgencyScore(s) }))
    .sort((a, b) => b.urgency - a.urgency);

  const timeSplit = getSuggestedTimeSplit(subjects);
  const mostCritical = sortedByUrgency[0];

  return (
    <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl p-6 border border-red-500/30">
      <h3 className="text-xl font-bold text-white mb-4">🔥 Urgency Analysis</h3>

      {mostCritical && (
        <div className="mb-6 p-4 bg-red-500/20 rounded-lg border border-red-500">
          <div className="text-sm text-red-300 mb-1">Most Critical Subject</div>
          <div className="text-2xl font-bold text-white">{mostCritical.subject.name}</div>
          <div className="text-sm text-gray-300 mt-1">
            Urgency Score: {mostCritical.urgency.toFixed(3)}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-lg font-semibold text-white mb-3">Today&apos;s Recommended Focus</h4>
        <div className="space-y-2">
          {timeSplit.map(({ subject, percentage }) => (
            <div key={subject.id} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{subject.name}</span>
                  <span className="text-gray-400 font-mono">{percentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
