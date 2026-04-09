import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import { LogOut, MapPin } from "lucide-react";
import router from "next/router";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Header() {
  const user = useUser();
  const router = useRouter();

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

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
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
  );
}
