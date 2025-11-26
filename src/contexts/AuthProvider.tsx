import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import { User } from "../models/User";

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_STORAGE_KEY = "@ZiK:authUser";
const ACCOUNTS_STORAGE_KEY = "@ZiK:accounts";

interface StoredAccount {
  username: string;
  email: string;
  password: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Usuário autenticado atualmente.
  // Carrega do localStorage apenas os dados públicos (sem senha).
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;

    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;

    try {
      const parsed = JSON.parse(stored) as Omit<StoredAccount, "password">;
      return new User(parsed);
    } catch {
      return null;
    }
  });

  // "Banco" de contas armazenado no localStorage (inclui senha em texto puro).
  const [accounts, setAccounts] = useState<StoredAccount[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored) as StoredAccount[];
    } catch {
      return [];
    }
  });

  // Sincroniza usuário logado com localStorage (sem senha).
  useEffect(() => {
    if (!user) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }

    const serialized = {
      username: user.username,
      email: user.email ?? "",
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(serialized));
  }, [user]);

  // Sincroniza lista de contas com localStorage.
  useEffect(() => {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  }, [accounts]);

  // Login por username OU email + senha.
  // Lança erros específicos para a UI tratar via toast.
  const login = (identifier: string, password: string) => {
    const lowered = identifier.toLowerCase();

    const existing = accounts.find(
      (acc) =>
        acc.username.toLowerCase() === lowered ||
        acc.email.toLowerCase() === lowered
    );

    if (!existing) {
      throw new Error("USER_NOT_FOUND");
    }

    if (existing.password !== password) {
      throw new Error("INVALID_PASSWORD");
    }

    const loggedUser = new User({
      username: existing.username,
      email: existing.email,
    });

    setUser(loggedUser);
  };

  // Cadastro de nova conta + login automático.
  const register = (username: string, email: string, password: string) => {
    const loweredUsername = username.toLowerCase();
    const loweredEmail = email.toLowerCase();

    const usernameExists = accounts.some(
      (acc) => acc.username.toLowerCase() === loweredUsername
    );
    if (usernameExists) {
      throw new Error("USER_ALREADY_EXISTS");
    }

    const emailExists = accounts.some(
      (acc) => acc.email.toLowerCase() === loweredEmail
    );
    if (emailExists) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const newAccount: StoredAccount = { username, email, password };
    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);

    const newUser = new User({ username, email });
    setUser(newUser); // auto login após cadastro
  };

  const logout = () => {
    setUser(null);
  };

  // Atualiza o username em todas as referências:
  // - valida se não existe outro igual
  // - atualiza accounts e o user atual
  const updateUsername = (newUsername: string) => {
    if (!user) {
      throw new Error("NOT_AUTHENTICATED");
    }

    const loweredNew = newUsername.toLowerCase();

    const usernameExists = accounts.some(
      (acc) => acc.username.toLowerCase() === loweredNew
    );

    if (usernameExists) {
      throw new Error("USERNAME_ALREADY_EXISTS");
    }

    const updatedAccounts = accounts.map((acc) =>
      acc.username === user.username ? { ...acc, username: newUsername } : acc
    );

    setAccounts(updatedAccounts);
    setUser(new User({ username: newUsername, email: user.email }));
  };

  // Troca a senha da conta atual:
  // - garante que o usuário está autenticado
  // - confere a senha atual
  const updatePassword = (currentPassword: string, newPassword: string) => {
    if (!user) {
      throw new Error("NOT_AUTHENTICATED");
    }

    const account = accounts.find(
      (acc) => acc.username === user.username && acc.email === user.email
    );

    if (!account) {
      throw new Error("ACCOUNT_NOT_FOUND");
    }

    if (account.password !== currentPassword) {
      throw new Error("INVALID_CURRENT_PASSWORD");
    }

    const updatedAccounts = accounts.map((acc) =>
      acc.username === account.username && acc.email === account.email
        ? { ...acc, password: newPassword }
        : acc
    );

    setAccounts(updatedAccounts);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateUsername,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
