import { BrowserRouter as Router, Routes, Route } from "react-router"

// Layout wrappers
import PublicLayout from "./layouts/PublicLayout"
import PrivateLayout from "./layouts/PrivateLayout"

// Telas
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route path="/" element={<PrivateLayout />}>                        
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App