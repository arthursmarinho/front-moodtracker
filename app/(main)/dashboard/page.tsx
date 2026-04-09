"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { HabitList } from "@/app/(main)/dashboard/components/HabitList";
import { HistoryTable } from "@/app/(main)/dashboard/components/HistoryTable";
import { MoodPicker } from "@/app/(main)/dashboard/components/MoodPicker";
import Header from "./components/Header";
import { MoodService } from "@/app/services/MoodService";
import { toast } from "sonner";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [mood, setMood] = useState(0);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [habits, setHabits] = useState([
    { name: "Água 2L", status: false },
    { name: "Exercícios", status: false },
    { name: "Meditação", status: false },
    { name: "Estudos", status: false },
  ]);

  const { user } = useUser();

  const postMood = async () => {
    if (loading) return;

    setLoading(true);

    const selectedHabits = habits.filter((h) => h.status).map((h) => h.name);

    const { ok } = await MoodService.createPost({
      author: user?.username || "Arthur Marinho",
      mood: mood,
      habits: selectedHabits,
      content: note,
    });

    if (ok) {
      toast.success("Mood criado com Sucesso!");
      setNote("");
      setMood(0);
      setHabits(habits.map((h) => ({ ...h, status: false })));
    }

    const handleDelete = async (id: number) => {
      await MoodService.deletePost(id);
      toast.error("Deletado com sucesso");
    };

    return (
      <div className="min-h-screen bg-[#F8F9FD] p-4 md:p-10 font-rubik text-slate-800">
        <div className="max-w-7xl mx-auto">
          <Header />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="lg:col-span-4 space-y-6"
            >
              <MoodPicker selected={mood} onSelect={setMood} />
              <HabitList
                habits={habits}
                toggle={(idx) => {
                  const newH = [...habits];
                  newH[idx].status = !newH[idx].status;
                  setHabits(newH);
                }}
              />
              <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
                <textarea
                  placeholder="Alguma nota especial?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-gray-50 rounded-2xl p-4 text-sm border-none outline-none focus:ring-2 focus:ring-purple-200"
                  rows={3}
                />
                <button
                  onClick={postMood}
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl font-bold mt-4 shadow-xl transition-all
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#6C5CE7] text-white hover:bg-[#5b4bc4] shadow-purple-100"
    }
  `}
                >
                  {loading ? "Salvando..." : "Salvar Dia"}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="lg:col-span-8"
            >
              <HistoryTable entries={history} onDelete={handleDelete} />
            </motion.div>
          </div>
        </div>
      </div>
    );
  };
}
