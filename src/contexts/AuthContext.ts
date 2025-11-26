import { createContext } from "react";
import { User } from "../models/User";

// API pública de autenticação exposta via Context.
export interface AuthContextType {
  user: User | null;
  // identifier pode ser username OU email
  login: (identifier: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logout: () => void;
  updateUsername: (newUsername: string) => void;
  updatePassword: (currentPassword: string, newPassword: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
