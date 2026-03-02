import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppState, Subject } from "@/types";
import { getTodayKey } from "@/utils/calculations";

const initialSubjects: Subject[] = [
  {
    id: "differential",
    name: "Differential",
    examDate: "2026-03-11T08:00:00",
    confidenceLevel: 3,
    topics: [
      { id: "ode", name: "Ordinary differential equations", done: false, weak: false, priority: "medium" },
      { id: "laplace", name: "Laplace transformations", done: false, weak: false, priority: "high" },
      { id: "tutorial1", name: "Tutorial 1", done: false, weak: false, priority: "medium" },
      { id: "tutorial2", name: "Tutorial 2", done: false, weak: false, priority: "medium" },
      { id: "tutorial3", name: "Tutorial 3", done: false, weak: false, priority: "medium" },
      { id: "tutorial4", name: "Tutorial 4", done: false, weak: false, priority: "medium" },
      { id: "tutorial5", name: "Tutorial 5", done: false, weak: false, priority: "medium" },
    ],
  },
  {
    id: "physics",
    name: "Physics",
    examDate: "2026-03-13T08:00:00",
    confidenceLevel: 1,
    topics: [
      { id: "waves", name: "Waves oscillations", done: false, weak: false, priority: "medium" },
      { id: "acoustics", name: "Acoustics", done: false, weak: false, priority: "medium" },
      { id: "ultrasonics", name: "Ultrasonics", done: false, weak: false, priority: "medium" },
      { id: "em", name: "EM waves", done: false, weak: false, priority: "medium" },
    ],
  },
  {
    id: "ed",
    name: "ED",
    examDate: "2026-03-16T08:00:00",
    confidenceLevel: 3,
    topics: [
      { id: "points", name: "Projection of points", done: false, weak: false, priority: "medium" },
      { id: "lines", name: "Projection of lines", done: false, weak: false, priority: "medium" },
      { id: "ortho", name: "Orthographic projections", done: false, weak: false, priority: "medium" },
      { id: "section", name: "Section of solids", done: false, weak: false, priority: "medium" },
    ],
  },
  {
    id: "profcomm",
    name: "Professional Communication",
    examDate: "2026-03-17T15:00:00",
    confidenceLevel: 4,
    topics: [
      { id: "johari", name: "Johari window", done: false, weak: false, priority: "medium" },
      { id: "ta", name: "T.A", done: false, weak: false, priority: "medium" },
      { id: "7cs", name: "7C's", done: false, weak: false, priority: "medium" },
      { id: "barriers", name: "Barriers", done: false, weak: false, priority: "medium" },
      { id: "oral", name: "Oral communication", done: false, weak: false, priority: "medium" },
      { id: "intro", name: "Introduction to communication", done: false, weak: false, priority: "medium" },
      { id: "listening", name: "Listening skills and 2 case studies", done: false, weak: false, priority: "medium" },
    ],
  },
  {
    id: "manpro",
    name: "ManPro",
    examDate: "2026-03-20T08:00:00",
    confidenceLevel: 2,
    topics: [
      { id: "intro-manuf", name: "Introduction to Manufacturing Processes", done: false, weak: false, priority: "medium" },
      { id: "cnc", name: "CNC", done: false, weak: false, priority: "medium" },
      { id: "intro-mach", name: "Introduction to machining process", done: false, weak: false, priority: "medium" },
      { id: "turning", name: "Turning principle and numerical", done: false, weak: false, priority: "medium" },
      { id: "chips", name: "Types of Chips", done: false, weak: false, priority: "medium" },
      { id: "tool", name: "Tool Material", done: false, weak: false, priority: "medium" },
      { id: "additive", name: "Additive Manufacturing", done: false, weak: false, priority: "medium" },
      { id: "forming", name: "Forming introduction", done: false, weak: false, priority: "medium" },
      { id: "rolling", name: "Rolling", done: false, weak: false, priority: "medium" },
      { id: "forging", name: "Forging", done: false, weak: false, priority: "medium" },
    ],
  },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      subjects: initialSubjects,
      dailyProgress: {},
      filter: "all",
      focusMode: false,

      setFilter: (filter) => set({ filter }),

      toggleTopicDone: (subjectId, topicId) => {
        const state = get();
        const todayKey = getTodayKey();
        
        set({
          subjects: state.subjects.map((subject) =>
            subject.id === subjectId
              ? {
                  ...subject,
                  topics: subject.topics.map((topic) =>
                    topic.id === topicId
                      ? { ...topic, done: !topic.done }
                      : topic
                  ),
                }
              : subject
          ),
        });

        const newState = get();
        const completedToday = newState.subjects.reduce(
          (sum, s) => sum + s.topics.filter((t) => t.done).length,
          0
        );
        
        set({
          dailyProgress: {
            ...state.dailyProgress,
            [todayKey]: completedToday,
          },
        });
      },

      toggleTopicWeak: (subjectId, topicId) =>
        set((state) => ({
          subjects: state.subjects.map((subject) =>
            subject.id === subjectId
              ? {
                  ...subject,
                  topics: subject.topics.map((topic) =>
                    topic.id === topicId
                      ? { ...topic, weak: !topic.weak }
                      : topic
                  ),
                }
              : subject
          ),
        })),

      setTopicPriority: (subjectId, topicId, priority) =>
        set((state) => ({
          subjects: state.subjects.map((subject) =>
            subject.id === subjectId
              ? {
                  ...subject,
                  topics: subject.topics.map((topic) =>
                    topic.id === topicId ? { ...topic, priority } : topic
                  ),
                }
              : subject
          ),
        })),

      setFocusMode: (enabled) => set({ focusMode: enabled }),

      importBackup: (data) => {
        try {
          const parsed = JSON.parse(data);
          
          // Handle both old and new backup formats
          let subjects, dailyProgress, filter, focusMode;
          
          if (parsed.version && parsed.appState) {
            // New format with complete state
            subjects = parsed.appState.subjects;
            dailyProgress = parsed.appState.dailyProgress || {};
            filter = parsed.appState.filter || "all";
            focusMode = parsed.appState.focusMode || false;
          } else if (parsed.subjects) {
            // Old format - backward compatibility
            subjects = parsed.subjects;
            dailyProgress = parsed.dailyProgress || {};
            filter = parsed.filter || "all";
            focusMode = false;
          } else {
            throw new Error("Invalid backup format");
          }

          // Validate subjects structure
          if (!Array.isArray(subjects)) {
            throw new Error("Invalid subjects data");
          }

          // Ensure all topics have required properties
          const validatedSubjects = subjects.map((subject: any) => ({
            ...subject,
            topics: subject.topics.map((topic: any) => ({
              id: topic.id || `topic-${Date.now()}-${Math.random()}`,
              name: topic.name || "Unnamed Topic",
              done: Boolean(topic.done),
              weak: Boolean(topic.weak),
              priority: topic.priority || "medium"
            }))
          }));

          set({
            subjects: validatedSubjects,
            dailyProgress,
            filter,
            focusMode: false, // Always reset focus mode on import
          });
        } catch (error) {
          console.error("Invalid backup data", error);
          throw new Error("Invalid backup format");
        }
      },

      resetState: () =>
        set({
          subjects: initialSubjects,
          dailyProgress: {},
          filter: "all",
          focusMode: false,
        }),
    }),
    {
      name: "exam-war-engine-storage",
    }
  )
);
