import type { Usuario } from "@/types/usuario"

const API = import.meta.env.VITE_API_URL as string

/**
 * Busca usuario por id
 * @returns 
 */
export async function getUser(id: number): Promise<Usuario> {
    const response = await fetch(`${API}/usuario/${id}`)
    if (!response.ok) {
        throw new Error(`Erro ao buscar usuario: ${response.status}`)
    }

    return response.json()
}