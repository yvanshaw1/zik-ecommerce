import { createContext } from "react";
import { User } from "../models/User";

export interface AuthContextType {
  user: User | null;
  // identifier pode ser username OU email
  login: (identifier: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
