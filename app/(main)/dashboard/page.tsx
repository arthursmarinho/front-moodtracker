"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { MapPin, LogOut } from "lucide-react";
import { HabitList } from "@/app/components/HabitList";
import { HistoryTable } from "@/app/components/HistoryTable";
import { MoodPicker } from "@/app/components/MoodPicker";
import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation"; // Entre chaves {}import { toast } from "sonner";
import { toast } from "sonner";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [history, setHistory] = useState([]);
  const [mood, setMood] = useState(0);
  const [habits, setHabits] = useState([
    { name: "Água 2L", status: false },
    { name: "Exercícios", status: false },
    { name: "Meditação", status: false },
    { name: "Estudos", status: false },
  ]);

  const user = useUser();
  const router = useRouter();

  // Efeito de carregar data
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Sessão encerrada!");

      router.push("/login");
    } catch (error) {
      toast.error("Erro ao sair. Tente novamente.");
      console.error("Erro no logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-4 md:p-10 font-rubik text-slate-800">
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-start mb-12"
        >
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Hey, {user.user?.username}!
            </h1>
            <p className="text-gray-400 text-sm mt-1 capitalize">{today}</p>
            <button
              onClick={handleLogout}
              className="text-red-400 text-[10px] font-bold uppercase tracking-widest mt-3 flex items-center gap-1 hover:text-red-600"
            >
              <LogOut size={12} /> Encerrar Sessão
            </button>
          </div>
          <div className="hidden md:flex bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 items-center gap-2 font-bold text-xs">
            <MapPin size={16} className="text-purple-500" /> Rocket Program
          </div>
        </motion.header>

        {/* GRID PRINCIPAL */}
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
                className="w-full bg-gray-50 rounded-2xl p-4 text-sm border-none outline-none focus:ring-2 focus:ring-purple-200"
                rows={3}
              />
              <button className="w-full bg-[#6C5CE7] text-white py-4 rounded-2xl font-bold mt-4 shadow-xl shadow-purple-100">
                Salvar Dia
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-8"
          >
            <HistoryTable entries={history} onDelete={(id) => {}} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
