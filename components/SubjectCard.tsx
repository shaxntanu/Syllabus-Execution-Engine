"use client";

import { Subject, Topic } from "@/types";
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
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{subject.name}</h2>
          <div className="text-sm text-gray-400">
            Confidence: {subject.confidenceLevel}/5
          </div>
        </div>
        <div className="text-right">
          <CountdownTimer examDate={subject.examDate} subjectName={subject.name} />
          {highRisk && (
            <div className="mt-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              ⚠ HIGH RISK
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Progress</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
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
          <div className="text-center text-gray-500 py-4">
            No topics match the current filter
          </div>
        )}
      </div>
    </div>
  );
}
