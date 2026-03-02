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
    high: "bg-red-500/20 border-red-500",
    medium: "bg-yellow-500/20 border-yellow-500",
    low: "bg-green-500/20 border-green-500",
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border ${priorityColors[topic.priority]} transition-all`}
    >
      <input
        type="checkbox"
        checked={topic.done}
        onChange={onToggleDone}
        className="w-5 h-5 cursor-pointer accent-green-500"
      />
      
      <span className={`flex-1 ${topic.done ? "line-through text-gray-500" : "text-gray-200"}`}>
        {topic.name}
      </span>

      <button
        onClick={onToggleWeak}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          topic.weak
            ? "bg-orange-500 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        {topic.weak ? "⚠ Weak" : "Mark Weak"}
      </button>

      <select
        value={topic.priority}
        onChange={(e) => onSetPriority(e.target.value as "high" | "medium" | "low")}
        className="bg-gray-700 text-gray-200 px-2 py-1 rounded text-sm border border-gray-600 cursor-pointer"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}
