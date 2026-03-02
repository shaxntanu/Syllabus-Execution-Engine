import { Subject, Topic } from "@/types";

export const calculateSubjectProgress = (subject: Subject): number => {
  if (subject.topics.length === 0) return 0;
  const completed = subject.topics.filter((t) => t.done).length;
  return (completed / subject.topics.length) * 100;
};

export const calculateOverallProgress = (subjects: Subject[]): number => {
  const totalTopics = subjects.reduce((sum, s) => sum + s.topics.length, 0);
  if (totalTopics === 0) return 0;
  const completedTopics = subjects.reduce(
    (sum, s) => sum + s.topics.filter((t) => t.done).length,
    0
  );
  return (completedTopics / totalTopics) * 100;
};

export const getDaysLeft = (examDate: string): number => {
  const now = new Date();
  const exam = new Date(examDate);
  const diff = exam.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const calculateUrgencyScore = (subject: Subject): number => {
  const daysLeft = getDaysLeft(subject.examDate);
  const progress = calculateSubjectProgress(subject);
  
  if (daysLeft <= 0) return 0;
  
  const urgency =
    (1 / daysLeft) * (1 - progress / 100) * (6 - subject.confidenceLevel);
  return urgency;
};

export const getNextExam = (subjects: Subject[]): Subject | null => {
  const upcoming = subjects
    .filter((s) => getDaysLeft(s.examDate) > 0)
    .sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime());
  
  return upcoming.length > 0 ? upcoming[0] : null;
};

export const getSuggestedTimeSplit = (
  subjects: Subject[]
): { subject: Subject; percentage: number }[] => {
  const urgencyScores = subjects.map((s) => ({
    subject: s,
    score: calculateUrgencyScore(s),
  }));

  const totalScore = urgencyScores.reduce((sum, item) => sum + item.score, 0);

  if (totalScore === 0) {
    return subjects.map((s) => ({
      subject: s,
      percentage: 100 / subjects.length,
    }));
  }

  return urgencyScores.map((item) => ({
    subject: item.subject,
    percentage: (item.score / totalScore) * 100,
  }));
};

export const formatCountdown = (examDate: string): string => {
  const now = new Date();
  const exam = new Date(examDate);
  const diff = exam.getTime() - now.getTime();

  if (diff <= 0) return "Exam passed";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export const getCountdownColor = (daysLeft: number): string => {
  if (daysLeft < 5) return "text-red-500";
  if (daysLeft < 10) return "text-yellow-500";
  return "text-green-500";
};

export const isHighRisk = (subject: Subject): boolean => {
  const daysLeft = getDaysLeft(subject.examDate);
  const progress = calculateSubjectProgress(subject);
  return daysLeft < 5 && progress < 50;
};

export const getTodayKey = (): string => {
  return new Date().toISOString().split("T")[0];
};
