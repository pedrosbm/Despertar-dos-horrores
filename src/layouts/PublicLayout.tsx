import { useAuth } from "@/context/AuthContext"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

const PublicLayout = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user])

    return (
        <>
            {/* TODO header */}
            <Outlet />

            <img
                src="/fundo.png"
                alt="background"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="absolute bottom-0 w-full object-fill opacity-70 select-none pointer-events-none"
            />
        </>
    )
}

export default PublicLayout