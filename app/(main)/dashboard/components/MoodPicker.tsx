"use client";
import { motion } from "framer-motion";

const moods = [
  { emoji: "😢", value: 1, label: "Triste" },
  { emoji: "😐", value: 2, label: "Neutro" },
  { emoji: "😊", value: 3, label: "Feliz" },
  { emoji: "🤩", value: 4, label: "Incrível" },
];

export function MoodPicker({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (v: number) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
      <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
        Como está seu humor?
      </h2>
      <div className="flex justify-between gap-2">
        {moods.map((m) => (
          <motion.button
            key={m.value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(m.value)}
            className={`flex-1 aspect-square rounded-3xl text-2xl flex items-center justify-center transition-colors ${
              selected === m.value
                ? "bg-[#6C5CE7] shadow-lg shadow-purple-200"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            {m.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
