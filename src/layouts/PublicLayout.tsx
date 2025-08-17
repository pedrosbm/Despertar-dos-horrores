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
            <div>
                {/* TODO header */}
                <Outlet />
            </div>
        </>
    )
}

export default PublicLayout