export interface Topic {
  id: string;
  name: string;
  done: boolean;
  weak: boolean;
  priority: "high" | "medium" | "low";
}

export interface Subject {
  id: string;
  name: string;
  examDate: string;
  confidenceLevel: number;
  topics: Topic[];
}

export interface DailyProgress {
  [date: string]: number;
}

export interface AppState {
  subjects: Subject[];
  dailyProgress: DailyProgress;
  filter: "all" | "unchecked" | "weak" | "high";
  focusMode: boolean;
  setFilter: (filter: "all" | "unchecked" | "weak" | "high") => void;
  toggleTopicDone: (subjectId: string, topicId: string) => void;
  toggleTopicWeak: (subjectId: string, topicId: string) => void;
  setTopicPriority: (subjectId: string, topicId: string, priority: "high" | "medium" | "low") => void;
  setFocusMode: (enabled: boolean) => void;
  importBackup: (data: string) => void;
  resetState: () => void;
  forceRefresh: () => void;
}
