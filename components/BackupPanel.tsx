"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { calculateOverallProgress, calculateUrgencyScore } from "@/utils/calculations";
import NotificationPopup from "./NotificationPopup";

export default function BackupPanel() {
  const { subjects, dailyProgress, importBackup } = useStore();
  const [importText, setImportText] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false
  });

  const showNotification = (message: string, type: "success" | "error" | "info") => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const generateBackup = () => {
    const overallProgress = calculateOverallProgress(subjects);
    const urgencyRanking = subjects
      .map((s) => ({ name: s.name, urgency: calculateUrgencyScore(s) }))
      .sort((a, b) => b.urgency - a.urgency);

    // Get current filter state from store
    const currentFilter = useStore.getState().filter;
    const currentFocusMode = useStore.getState().focusMode;

    const backup = {
      version: "1.0",
      timestamp: new Date().toISOString(),
      metadata: {
        overallProgress,
        urgencyRanking,
        totalTopics: subjects.reduce((sum, s) => sum + s.topics.length, 0),
        completedTopics: subjects.reduce((sum, s) => sum + s.topics.filter(t => t.done).length, 0),
        weakTopics: subjects.reduce((sum, s) => sum + s.topics.filter(t => t.weak).length, 0),
        highPriorityTopics: subjects.reduce((sum, s) => sum + s.topics.filter(t => t.priority === "high").length, 0)
      },
      appState: {
        subjects: subjects.map(subject => ({
          ...subject,
          topics: subject.topics.map(topic => ({
            id: topic.id,
            name: topic.name,
            done: topic.done,
            weak: topic.weak,
            priority: topic.priority
          }))
        })),
        dailyProgress,
        filter: currentFilter,
        focusMode: currentFocusMode
      }
    };

    const json = JSON.stringify(backup, null, 2);
    navigator.clipboard.writeText(json);
    
    showNotification(
      "🎉 Backup created successfully! Code copied to clipboard. Store it safely in your notes, email, or cloud storage.",
      "success"
    );
  };

  const handleImport = () => {
    try {
      importBackup(importText);
      showNotification(
        "🎉 Backup imported successfully! All your data has been restored including topics, priorities, weak flags, and daily progress.",
        "success"
      );
      setImportText("");
    } catch (err) {
      showNotification(
        `❌ Import failed: ${err instanceof Error ? err.message : "Invalid backup format"}. Please check your JSON format.`,
        "error"
      );
    }
  };

  return (
    <>
      <NotificationPopup
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      
      <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">💾 Backup & Restore</h3>

        <div className="space-y-6">
          <button
            onClick={generateBackup}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Generate Backup Code
          </button>

          <div>
            <label className="block text-sm text-gray-400 mb-3">Import Backup</label>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste your complete backup JSON here... (includes all topics, priorities, weak flags, completion status, and daily progress)"
              className="w-full bg-gray-700 text-gray-200 rounded-lg p-4 border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm"
              rows={5}
            />
          </div>

          <button
            onClick={handleImport}
            disabled={!importText}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
          >
            Import Backup
          </button>
        </div>
      </div>
    </>
  );
}
