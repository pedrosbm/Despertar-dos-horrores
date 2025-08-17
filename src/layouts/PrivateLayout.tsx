import { useAuth } from "@/context/AuthContext"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

const PrivateLayout = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user == null) {
            navigate("/login")
        }
    }, [user])

    return (
        <>
            <Outlet />
        </>
    )
}

export default PrivateLayout