import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "resident" | "doctor" | "admin";

export interface User {
  id: number;
  name: string;
  initials: string;
  role: UserRole;
  roleLabel: string;
  department: string;
  email: string;
  stats: {
    cases: number;
    score: number;
    hours: number;
    rank: string;
  };
}

export const DEMO_USERS: User[] = [
  {
    id: 1,
    name: "Иванов Алексей Петрович",
    initials: "АИ",
    role: "resident",
    roleLabel: "Ординатор",
    department: "Кафедра дерматологии",
    email: "ivanov@dermamed.ru",
    stats: { cases: 27, score: 91, hours: 48, rank: "#3" },
  },
  {
    id: 2,
    name: "Смирнова Елена Викторовна",
    initials: "ЕС",
    role: "doctor",
    roleLabel: "Врач-дерматолог",
    department: "Дерматологическое отделение",
    email: "smirnova@dermamed.ru",
    stats: { cases: 84, score: 97, hours: 210, rank: "#1" },
  },
  {
    id: 3,
    name: "Петров Дмитрий Сергеевич",
    initials: "ДП",
    role: "admin",
    roleLabel: "Преподаватель",
    department: "Учебный отдел",
    email: "petrov@dermamed.ru",
    stats: { cases: 112, score: 99, hours: 380, rank: "Эксперт" },
  },
];

interface AuthContextValue {
  user: User | null;
  login: (userId: number, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function login(userId: number, password: string): boolean {
    if (password.length < 3) return false;
    const found = DEMO_USERS.find((u) => u.id === userId);
    if (!found) return false;
    setUser(found);
    return true;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
