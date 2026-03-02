"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import Dashboard from "@/components/Dashboard";
import FocusMode from "@/components/FocusMode";

export default function Home() {
  const { focusMode } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return focusMode ? <FocusMode /> : <Dashboard />;
}
