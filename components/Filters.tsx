"use client";

import { useStore } from "@/store/useStore";

export default function Filters() {
  const { filter, setFilter } = useStore();

  const filters: Array<{ value: "all" | "unchecked" | "weak" | "high"; label: string }> = [
    { value: "all", label: "All Topics" },
    { value: "unchecked", label: "Unchecked" },
    { value: "weak", label: "Weak" },
    { value: "high", label: "High Priority" },
  ];

  return (
    <div className="flex gap-6 flex-wrap">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={`px-8 py-4 rounded-2xl font-medium transition-colors ${
            filter === f.value
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
