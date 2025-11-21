// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getMe } from "../api/auth";
import {
  getAccessToken,
  clearTokens,
} from "../utils/storage";

type User = {
  id: number;
  username: string;
  email: string;
  // aggiungi altri campi se servono
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const data = await getMe();
      setUser(data);
    } catch (e) {
      console.log("REFRESH USER ERROR:", e);
      setUser(null);
    }
  }

  async function bootstrap() {
    try {
      const token = await getAccessToken();
      if (token) {
        await refreshUser();
      }
    } catch (e) {
      console.log("BOOTSTRAP AUTH ERROR:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    bootstrap();
  }, []);

  async function logout() {
    await clearTokens();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
