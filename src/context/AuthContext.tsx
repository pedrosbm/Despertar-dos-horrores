import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { useCookies } from "react-cookie";
import type { Usuario } from "@/types/usuario";

type AuthContextType = {
    user: Usuario | null;
    login: (email: string, senha: string) => Promise<Usuario>;
    logout: () => void;
    register: (data: Omit<Usuario, "id">) => Promise<Usuario>;
    updateUser: (patch: Partial<Usuario>) => void;
};

const STORAGE_KEY = "ddh:user";

// Dev-only default user to simulate authentication during development
const DEV_USER: Usuario = {
    id: 1,
    nome: "Dev User",
    email: "dev@example.com",
    senha: "dev",
    cargo: "MESTRE",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    // use cookies for persistence instead of localStorage
    const [cookies, setCookie, removeCookie] = useCookies([STORAGE_KEY]);

    const [user, setUser] = useState<Usuario | null>(() => {
        try {
            const raw = cookies[STORAGE_KEY];
            if (raw) return typeof raw === "string" ? (JSON.parse(raw) as Usuario) : (raw as Usuario);

            // If no persisted user and we're in dev, return a predefined dev user so the app behaves as authenticated
            // if (import.meta.env.DEV) {
            //     return DEV_USER;
            // }

            return null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            // store as string to avoid serialization issues
            setCookie(STORAGE_KEY, JSON.stringify(user), { path: "/" });
        } else {
            removeCookie(STORAGE_KEY, { path: "/" });
        }
    }, [user, setCookie, removeCookie]);

    // TODO: Implement real login calling your API. Currently mocked for local development.
    const login = async (email: string, senha: string) => {
        // Mock implementation: create a user from email/senha
        const logged: Usuario = {
            id: Date.now(),
            nome: email.split("@")[0] ?? "Usuário",
            email,
            senha,
            cargo: "USER",
        };
        setUser(logged);
        return logged;
    };

    // TODO: Implement real registration calling your API. Currently mocked.
    const register = async (data: Omit<Usuario, "id">) => {
        const newUser: Usuario = { id: Date.now(), ...data };
        setUser(newUser);
        return newUser;
    };

    const logout = () => {
        // TODO: call backend logout if necessary
        setUser(null);
    };

    const updateUser = (patch: Partial<Usuario>) => {
        // TODO: persist changes to backend when available
        setUser((prev) => (prev ? { ...prev, ...patch } : null));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
};