"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Habit {
  name: string;
  status: boolean;
}

export function HabitList({
  habits,
  toggle,
}: {
  habits: Habit[];
  toggle: (i: number) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
      <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
        Hábitos de hoje
      </h2>
      <div className="space-y-3">
        {habits.map((habit, idx) => (
          <div
            key={idx}
            onClick={() => toggle(idx)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                habit.status
                  ? "bg-[#6C5CE7] border-[#6C5CE7]"
                  : "border-gray-200 group-hover:border-purple-300"
              }`}
            >
              {habit.status && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check size={14} className="text-white" strokeWidth={4} />
                </motion.div>
              )}
            </div>
            <span
              className={`text-sm font-medium transition-all ${habit.status ? "text-gray-300 line-through" : "text-gray-600"}`}
            >
              {habit.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
