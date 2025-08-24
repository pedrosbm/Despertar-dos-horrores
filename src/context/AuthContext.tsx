import { createContext, useContext, useEffect, type PropsWithChildren } from "react";
import { useCookies } from "react-cookie";
import type { Usuario } from "@/types/usuario";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/userRequests";

type AuthContextType = {
    user: Usuario | undefined;
    login: (email: string, senha: string) => void;
    logout: () => void;
    register: (data: Omit<Usuario, "id">) => void;
    updateUser: (patch: Partial<Usuario>) => void;
};

const STORAGE_KEY = "ddhUser";

// const API = import.meta.env.VITE_API_URL as string

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [cookies] = useCookies([STORAGE_KEY]);

    const query = useQuery<Usuario, Error>({
        queryKey: ["usuario"],
        queryFn: () => getUser(cookies.ddhUser),
        enabled: false
    })

    const { data: user } = query

    useEffect(() => {
        if (cookies.ddhUser) {
            query.refetch();
        }
    }, [cookies.ddhUser])

    const login = async (nome: string, senha: string) => {
        console.log("Salve: " + nome + " " + senha)
    };

    const register = (data: Omit<Usuario, "id">) => {
        console.log(data)
    }

    const logout = () => {

    };

    const updateUser = (patch: Partial<Usuario>) => {
        console.log(patch)
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