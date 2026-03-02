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
    high: "border-red-500/50",
    medium: "border-yellow-500/50",
    low: "border-green-500/50",
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 border ${priorityColors[topic.priority]} transition-all hover:bg-gray-700/50`}
    >
      <input
        type="checkbox"
        checked={topic.done}
        onChange={onToggleDone}
        className="w-4 h-4 cursor-pointer accent-blue-500"
      />
      
      <span className={`flex-1 text-sm md:text-base ${topic.done ? "line-through text-gray-500" : "text-gray-200"}`}>
        {topic.name}
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleWeak}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            topic.weak
              ? "bg-orange-500 text-white"
              : "bg-gray-600 text-gray-300 hover:bg-gray-500"
          }`}
        >
          {topic.weak ? "⚠" : "Mark Weak"}
        </button>

        <select
          value={topic.priority}
          onChange={(e) => onSetPriority(e.target.value as "high" | "medium" | "low")}
          className="bg-gray-600 text-gray-200 px-2 py-1 rounded text-xs border border-gray-500 cursor-pointer"
        >
          <option value="high">High</option>
          <option value="medium">Med</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
}
