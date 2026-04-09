"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, CalendarDays, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

export function HistoryTable({
  entries,
  onDelete,
}: {
  entries: any[];
  onDelete: (id: number) => void;
}) {
  const getEmoji = (mood: number) => {
    switch (mood) {
      case 1:
        return "😢";
      case 2:
        return "😐";
      case 3:
        return "😊";
      case 4:
        return "🤩";
      default:
        return "😶";
    }
  };
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-bold text-gray-800 text-lg">Histórico Recente</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[10px] text-gray-400 uppercase tracking-widest">
              <th className="px-4">Data</th>
              <th className="px-4 text-center">Humor</th>
              <th className="px-4">Hábitos & Notas</th>
              <th className="px-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {isloading ? (
              <tr>
                <td colSpan={4}>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </td>
              </tr>
            ) : (
              entries?.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-gray-50 transition-colors"
                >
                  <td className="bg-gray-50/50 rounded-l-2xl px-4 py-4 text-xs font-bold text-gray-500">
                    {new Date(item.publishedAt).toLocaleDateString("pt-BR")}
                  </td>

                  <td className="px-4 py-4 text-2xl text-center">
                    {getEmoji(item.moods ?? item.mood)}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(item.habits) ? (
                          item.habits.map((habit: string, i: number) => (
                            <span
                              key={i}
                              className="bg-purple-50 text-[#6C5CE7] text-[9px] px-2 py-1 rounded-lg font-bold"
                            >
                              {habit}
                            </span>
                          ))
                        ) : (
                          <span className="text-[9px] text-gray-400 italic">
                            Sem hábitos
                          </span>
                        )}
                      </div>

                      {item.content && (
                        <div className="flex items-start gap-1 text-gray-400 italic text-[11px]">
                          <MessageSquare size={10} className="mt-0.5" />
                          <p>{item.content}</p>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="bg-gray-50/50 rounded-r-2xl px-4 py-4 text-right">
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
