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

interface UserWithPassword extends User {
  password: string;
}

const USERS: UserWithPassword[] = [
  {
    id: 1,
    name: "Студент-ординатор",
    initials: "СО",
    role: "resident",
    roleLabel: "Ординатор",
    department: "Кафедра дерматологии",
    email: "resident@dermamed.ru",
    password: "resident123",
    stats: { cases: 27, score: 91, hours: 48, rank: "#3" },
  },
  {
    id: 2,
    name: "Врач-дерматолог",
    initials: "ВД",
    role: "doctor",
    roleLabel: "Врач-дерматолог",
    department: "Дерматологическое отделение",
    email: "doctor@dermamed.ru",
    password: "doctor123",
    stats: { cases: 84, score: 97, hours: 210, rank: "#1" },
  },
  {
    id: 3,
    name: "Администратор-преподаватель",
    initials: "АП",
    role: "admin",
    roleLabel: "Преподаватель",
    department: "Учебный отдел",
    email: "admin@dermamed.ru",
    password: "admin123",
    stats: { cases: 112, score: 99, hours: 380, rank: "Эксперт" },
  },
];

export const SYSTEM_USERS: User[] = USERS.map(({ password: _, ...u }) => u);

interface AuthContextValue {
  user: User | null;
  login: (userId: number, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function login(userId: number, password: string): boolean {
    const found = USERS.find((u) => u.id === userId && u.password === password);
    if (!found) return false;
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
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