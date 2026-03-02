"use client";

import { Subject } from "@/types";
import { calculateSubjectProgress, isHighRisk } from "@/utils/calculations";
import CountdownTimer from "./CountdownTimer";
import TopicRow from "./TopicRow";
import { useStore } from "@/store/useStore";

interface SubjectCardProps {
  subject: Subject;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const { toggleTopicDone, toggleTopicWeak, setTopicPriority, filter } = useStore();
  const progress = calculateSubjectProgress(subject);
  const highRisk = isHighRisk(subject);

  const filteredTopics = subject.topics.filter((topic) => {
    if (filter === "unchecked") return !topic.done;
    if (filter === "weak") return topic.weak;
    if (filter === "high") return topic.priority === "high";
    return true;
  });

  return (
    <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{subject.name}</h2>
            {highRisk && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold">
                ⚠ HIGH RISK
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Confidence: {subject.confidenceLevel}/5</span>
            <span>•</span>
            <span>{progress.toFixed(0)}% Complete</span>
          </div>
        </div>
        <div className="text-left md:text-right">
          <CountdownTimer examDate={subject.examDate} subjectName={subject.name} />
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredTopics.map((topic) => (
          <TopicRow
            key={topic.id}
            topic={topic}
            onToggleDone={() => toggleTopicDone(subject.id, topic.id)}
            onToggleWeak={() => toggleTopicWeak(subject.id, topic.id)}
            onSetPriority={(priority) => setTopicPriority(subject.id, topic.id, priority)}
          />
        ))}
        {filteredTopics.length === 0 && (
          <div className="text-center text-gray-500 py-8 text-sm">
            No topics match the current filter
          </div>
        )}
      </div>
    </div>
  );
}
