"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { MapPin, LogOut } from "lucide-react";
import { HabitList } from "@/app/components/HabitList";
import { HistoryTable } from "@/app/components/HistoryTable";
import { MoodPicker } from "@/app/components/MoodPicker";

export default function Dashboard() {
  // Estados (Mesma lógica do anterior, mas componentes separados)
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

  // Efeito de carregar data
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-6 text-slate-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-white p-10 rounded-[3rem] shadow-xl shadow-purple-100"
        >
          <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center text-4xl mb-6 mx-auto">
            💜
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Health Hub</h1>
          <p className="text-gray-400 text-center mb-8 text-sm">
            Organize sua rotina com estilo.
          </p>
          <input
            type="text"
            className="w-full p-4 bg-gray-50 rounded-2xl mb-4 outline-none focus:ring-2 focus:ring-purple-400 transition-all border-none"
            placeholder="Como quer ser chamado?"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-[#6C5CE7] py-4 rounded-2xl text-white font-bold shadow-lg shadow-purple-200 hover:bg-[#5b4bc4] transition-all"
          >
            Entrar
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-4 md:p-10 font-rubik text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-start mb-12"
        >
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Hey, {userName}!
            </h1>
            <p className="text-gray-400 text-sm mt-1 capitalize">{today}</p>
            <button className="text-red-400 text-[10px] font-bold uppercase tracking-widest mt-3 flex items-center gap-1 hover:text-red-600">
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
