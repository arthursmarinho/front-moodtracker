"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase"; // Removido o 'db'

interface UserData {
  uid: string;
  username: string;
  email: string;
}

interface UserContextType {
  user: UserData | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // O onAuthStateChanged observa a sessão do usuário no Auth
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Pegamos os dados direto do objeto de usuário do Firebase
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          // Usamos o displayName como username.
          // Se estiver vazio, ele mostra "Usuário" por padrão.
          username: firebaseUser.displayName || "Usuário",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
