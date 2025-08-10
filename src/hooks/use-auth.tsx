"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { User } from "firebase/auth";

// --- Mock User Database ---
// Anggep aja ini data dari file .txt atau database simpel
const mockUsers: Record<string, { password: string, user: User }> = {
  "admin@admin.com": {
    password: "admin",
    user: {
      uid: "admin-test-uid",
      email: "admin@admin.com",
      displayName: "Admin Tester",
    } as User,
  },
  "bro@syukur.com": {
    password: "password",
    user: {
      uid: "bro-test-uid",
      email: "bro@syukur.com",
      displayName: "Bro Syukur",
    } as User,
  },
};
// --------------------------

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cek kalo ada user di session storage pas pertama kali buka
  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("syukurbro-user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Gagal ngambil user dari session storage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = (email: string, pass: string) => {
    return new Promise<void>((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        if (mockUsers[email]) {
          setLoading(false);
          return reject(new Error("Email udah kedaftar, bro."));
        }
        
        const newUser: User = {
          uid: `mock-${Date.now()}`,
          email,
          displayName: email.split('@')[0],
        } as User;

        mockUsers[email] = { password: pass, user: newUser };
        
        setLoading(false);
        resolve();
      }, 500);
    });
  };

  const login = (email: string, pass: string) => {
    return new Promise<void>((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        const existingUser = mockUsers[email];
        if (existingUser && existingUser.password === pass) {
          setUser(existingUser.user);
          sessionStorage.setItem("syukurbro-user", JSON.stringify(existingUser.user));
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error("Email atau password salah, bro."));
        }
      }, 500);
    });
  };

  const logout = () => {
    return new Promise<void>((resolve) => {
      setUser(null);
      sessionStorage.removeItem("syukurbro-user");
      resolve();
    });
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};