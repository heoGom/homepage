"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getMeApi, loginApi, type MeResponse } from "@/app/lib/api/authApi";
import { getAccessToken } from "@/app/lib/api/client";

type AuthContextType = {
  me: MeResponse | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    if (!getAccessToken()) {
      setMe(null);
      setLoading(false);
      return;
    }

    try {
      const data = await getMeApi();
      setMe(data);
    } catch {
      localStorage.removeItem("accessToken");
      setMe(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchMe();
  }, [fetchMe]);

  async function login(email: string, password: string) {
    const data = await loginApi(email, password);
    localStorage.setItem("accessToken", data.accessToken);
    await fetchMe();
  }

  function logout() {
    localStorage.removeItem("accessToken");
    setMe(null);
  }

  return (
    <AuthContext.Provider value={{ me, loading, login, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 AuthProvider 안에서만 사용할 수 있습니다.");
  }

  return context;
}
