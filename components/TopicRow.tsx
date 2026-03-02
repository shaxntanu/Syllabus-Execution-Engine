"use client";

import { Topic } from "@/types";

interface TopicRowProps {
  topic: Topic;
  onToggleDone: () => void;
  onToggleWeak: () => void;
  onSetPriority: (priority: "high" | "medium" | "low") => void;
}

export default function TopicRow({ topic, onToggleDone, onToggleWeak, onSetPriority }: TopicRowProps) {
  const priorityColors = {
    high: "border-red-500/40",
    medium: "border-yellow-500/40",
    low: "border-green-500/40",
  };

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-gray-700/30 border ${priorityColors[topic.priority]} transition-all hover:bg-gray-700/50`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={topic.done}
          onChange={onToggleDone}
          className="w-5 h-5 cursor-pointer accent-blue-500 flex-shrink-0"
        />
        
        <span className={`text-base ${topic.done ? "line-through text-gray-500" : "text-gray-200"} break-words`}>
          {topic.name}
        </span>
      </div>

      <div className="flex items-center gap-3 sm:ml-auto flex-shrink-0">
        <button
          onClick={onToggleWeak}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            topic.weak
              ? "bg-orange-500 text-white"
              : "bg-gray-600 text-gray-300 hover:bg-gray-500"
          }`}
        >
          {topic.weak ? "⚠ Weak" : "Mark Weak"}
        </button>

        <select
          value={topic.priority}
          onChange={(e) => onSetPriority(e.target.value as "high" | "medium" | "low")}
          className="bg-gray-600 text-gray-200 px-3 py-1.5 rounded-lg text-sm border border-gray-500 cursor-pointer"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
}
