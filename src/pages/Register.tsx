// React import not required in newer JSX runtimes
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, Key } from "lucide-react"
import type { FormEvent, ChangeEvent } from "react"
import { useState } from "react"
import type { Usuario } from "@/types/usuario"

export default function Register() {
    const [usuario, setUsuario] = useState<Usuario>({ cargo: "USER" } as Usuario)

    const handleChange = (field: keyof Usuario) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setUsuario((prev) => ({ ...prev, [field]: value }))
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        console.log("registro:", usuario)
    }
    
    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 bg-gradient-to-b from-black to-red-800 overflow-hidden">
            <div className="relative z-20 flex flex-col items-center">
                <h1 style={{ animationDelay: '80ms' }} className="animate-enter-up mb-3 text-5xl font-extrabold text-white drop-shadow-lg">Despertar dos horrores</h1>
                <p style={{ animationDelay: '160ms' }} className="animate-enter-up mb-6 max-w-md text-center text-sm text-muted-foreground">Os monstros despertaram. Enfrente-os, se tiver coragem...</p>

                <Card style={{ animationDelay: '240ms' }} className="animate-enter-scale w-full max-w-md bg-card/70 backdrop-blur-md shadow-2xl">
                    <CardHeader>
                        <CardTitle>Cadastrar-se</CardTitle>
                        <CardDescription className="mt-1">Crie o seu perfil e adentre a aventura.</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ animationDelay: '320ms' }}>
                            <Label htmlFor="nome">Nome</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><Mail size={16} /></span>
                                <Input id="nome" name="nome" type="nome" placeholder="seu@exemplo.com" autoComplete="nome" required className="pl-10" value={usuario.nome} onChange={handleChange("nome")} />
                            </div>

                            <Label htmlFor="senha">Senha</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><Key size={16} /></span>
                                <Input id="senha" name="senha" type="password" placeholder="••••••••" autoComplete="current-password" required className="pl-10" value={usuario.senha} onChange={handleChange("senha")} />
                            </div>

                            <Button type="submit" className="mt-2 w-full">Entrar</Button>
                        </form>
                    </CardContent>

                    <CardFooter>
                        <div className="flex w-full items-center justify-between text-sm">
                            <span className="text-muted-foreground">Já possui conta? <a className="text-primary hover:underline" href="/login">Entrar</a></span>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
