"use client";

import { useStore } from "@/store/useStore";
import { getTodayKey } from "@/utils/calculations";

export default function DailyTracker() {
  const { dailyProgress } = useStore();
  const todayKey = getTodayKey();
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().split("T")[0];

  const todayCount = dailyProgress[todayKey] || 0;
  const yesterdayCount = dailyProgress[yesterdayKey] || 0;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">📊 Daily Completion</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
          <div className="text-sm text-blue-300 mb-1">Today</div>
          <div className="text-3xl font-bold text-white">{todayCount}</div>
          <div className="text-xs text-gray-400 mt-1">topics completed</div>
        </div>
        
        <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-500/30">
          <div className="text-sm text-purple-300 mb-1">Yesterday</div>
          <div className="text-3xl font-bold text-white">{yesterdayCount}</div>
          <div className="text-xs text-gray-400 mt-1">topics completed</div>
        </div>
      </div>
    </div>
  );
}
