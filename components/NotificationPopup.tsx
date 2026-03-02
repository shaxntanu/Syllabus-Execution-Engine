"use client";

import { useEffect } from "react";

interface NotificationPopupProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
}

export default function NotificationPopup({ message, type, isVisible, onClose }: NotificationPopupProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: "bg-green-500/90 border-green-400 text-white",
    error: "bg-red-500/90 border-red-400 text-white",
    info: "bg-blue-500/90 border-blue-400 text-white"
  };

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️"
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`${typeStyles[type]} backdrop-blur-sm rounded-lg border p-4 shadow-lg max-w-sm`}>
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0">{icons[type]}</span>
          <div className="flex-1">
            <p className="font-medium text-sm leading-relaxed">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-lg leading-none flex-shrink-0"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}