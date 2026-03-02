"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { calculateOverallProgress, calculateUrgencyScore } from "@/utils/calculations";

export default function BackupPanel() {
  const { subjects, dailyProgress, importBackup } = useStore();
  const [importText, setImportText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const generateBackup = () => {
    const overallProgress = calculateOverallProgress(subjects);
    const urgencyRanking = subjects
      .map((s) => ({ name: s.name, urgency: calculateUrgencyScore(s) }))
      .sort((a, b) => b.urgency - a.urgency);

    const backup = {
      timestamp: new Date().toISOString(),
      overallProgress,
      urgencyRanking,
      subjects,
      dailyProgress,
      filter: "all",
    };

    const json = JSON.stringify(backup, null, 2);
    navigator.clipboard.writeText(json);
    setSuccess("Backup copied to clipboard!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleImport = () => {
    try {
      setError("");
      setSuccess("");
      importBackup(importText);
      setSuccess("Backup imported successfully!");
      setImportText("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Invalid backup format. Please check your JSON.");
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">💾 Backup & Restore</h3>

      <div className="space-y-4">
        <button
          onClick={generateBackup}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
        >
          Generate Backup Code
        </button>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Import Backup</label>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste backup JSON here..."
            className="w-full bg-gray-700 text-gray-200 rounded-lg p-3 border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm"
            rows={4}
          />
        </div>

        <button
          onClick={handleImport}
          disabled={!importText}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
        >
          Import Backup
        </button>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
