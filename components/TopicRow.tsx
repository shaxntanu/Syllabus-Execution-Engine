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
      className={`flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-gray-700/30 border ${priorityColors[topic.priority]} transition-all hover:bg-gray-700/50`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Custom Checkbox */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id={`task-${topic.id}`}
            className="task-checkbox"
            checked={topic.done}
            onChange={onToggleDone}
          />
          <label htmlFor={`task-${topic.id}`} className="checkbox-label">
            <div className="checkbox-box">
              <div className="checkbox-fill"></div>
              <div className="checkmark">
                <svg viewBox="0 0 24 24" className="check-icon">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                </svg>
              </div>
              <div className="success-ripple"></div>
            </div>
            <span className="checkbox-text text-base text-gray-200 break-words">
              {topic.name}
            </span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:ml-auto flex-shrink-0">
        <button
          onClick={onToggleWeak}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
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
          className="bg-gray-600 text-gray-200 px-4 py-2 rounded-xl text-sm border border-gray-500 cursor-pointer"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <style jsx>{`
        .checkbox-container {
          display: inline-block;
          user-select: none;
        }

        .task-checkbox {
          display: none;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          transition: all 0.2s ease;
          padding: 4px;
          border-radius: 8px;
        }

        .checkbox-label:hover {
          background: rgba(16, 185, 129, 0.05);
        }

        .checkbox-box {
          position: relative;
          width: 22px;
          height: 22px;
          border: 2px solid #6b7280;
          border-radius: 6px;
          margin-right: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: #374151;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          flex-shrink: 0;
        }

        .checkbox-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          transform: scale(0);
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          border-radius: 4px;
          opacity: 0;
        }

        .checkmark {
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: scale(0.3) rotate(20deg);
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .check-icon {
          width: 14px;
          height: 14px;
          fill: white;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
        }

        .success-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(16, 185, 129, 0.4);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          pointer-events: none;
        }

        .checkbox-text {
          transition: all 0.3s ease;
          position: relative;
        }

        .checkbox-text::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          width: 0;
          height: 2px;
          background: #6b7280;
          transition: width 0.4s ease;
          transform: translateY(-50%);
        }

        .checkbox-label:hover .checkbox-box {
          border-color: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
        }

        .task-checkbox:checked + .checkbox-label .checkbox-box {
          border-color: #10b981;
          background: #10b981;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3), 0 0 0 2px rgba(16, 185, 129, 0.2);
        }

        .task-checkbox:checked + .checkbox-label .checkbox-fill {
          transform: scale(1);
          opacity: 1;
        }

        .task-checkbox:checked + .checkbox-label .checkmark {
          opacity: 1;
          transform: scale(1) rotate(0deg);
          animation: checkPop 0.3s ease-out 0.2s;
        }

        .task-checkbox:checked + .checkbox-label .success-ripple {
          animation: rippleSuccess 0.6s ease-out;
        }

        .task-checkbox:checked + .checkbox-label .checkbox-text {
          color: #6b7280;
        }

        .task-checkbox:checked + .checkbox-label .checkbox-text::after {
          width: 100%;
        }

        .checkbox-label:active .checkbox-box {
          transform: scale(0.95);
        }

        @keyframes checkPop {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(-5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes rippleSuccess {
          0% {
            width: 0;
            height: 0;
            opacity: 0.6;
          }
          70% {
            width: 50px;
            height: 50px;
            opacity: 0.3;
          }
          100% {
            width: 60px;
            height: 60px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
