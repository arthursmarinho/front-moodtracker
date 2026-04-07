"use client";
import { Trash2, CalendarDays } from "lucide-react";

export function HistoryTable({
  entries,
  onDelete,
}: {
  entries: any[];
  onDelete: (id: number) => void;
}) {
  const getEmoji = (v: number) => ["", "😢", "😐", "😊", "🤩"][v];

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-bold text-gray-800 text-lg">Histórico Recente</h3>
        <CalendarDays className="text-gray-300" size={20} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[10px] text-gray-400 uppercase tracking-widest">
              <th className="px-4">Data</th>
              <th className="px-4 text-center">Humor</th>
              <th className="px-4">Hábitos</th>
              <th className="px-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((item) => (
              <tr
                key={item.id}
                className="group hover:bg-gray-50 transition-colors"
              >
                <td className="bg-gray-50/50 group-hover:bg-transparent rounded-l-2xl px-4 py-4 text-xs font-bold text-gray-500">
                  {new Date(item.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </td>
                <td className="px-4 py-4 text-2xl text-center">
                  {getEmoji(item.mood)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {item.habits
                      .filter((h: any) => h.status)
                      .map((h: any, i: number) => (
                        <span
                          key={i}
                          className="bg-purple-50 text-[#6C5CE7] text-[9px] px-2 py-1 rounded-lg font-bold"
                        >
                          {h.name}
                        </span>
                      ))}
                  </div>
                </td>
                <td className="bg-gray-50/50 group-hover:bg-transparent rounded-r-2xl px-4 py-4 text-right">
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
