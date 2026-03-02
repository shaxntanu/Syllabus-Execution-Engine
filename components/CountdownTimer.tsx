"use client";

import { useState, useEffect } from "react";
import { formatCountdown, getCountdownColor, getDaysLeft } from "@/utils/calculations";

interface CountdownTimerProps {
  examDate: string;
  subjectName: string;
  large?: boolean;
}

export default function CountdownTimer({ examDate, subjectName, large = false }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState(formatCountdown(examDate));
  const daysLeft = getDaysLeft(examDate);
  const colorClass = getCountdownColor(daysLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(formatCountdown(examDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [examDate]);

  return (
    <div className={large ? "text-center" : ""}>
      <div className={`font-mono ${large ? "text-4xl" : "text-base md:text-lg"} font-bold ${colorClass}`}>
        {countdown}
      </div>
      {large && (
        <div className="text-gray-400 mt-2 text-xl">
          until {subjectName}
        </div>
      )}
    </div>
  );
}
