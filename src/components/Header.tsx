import type { PropsWithChildren } from "react"
import "./Header.scss"

const Header = ({ children }: PropsWithChildren) => {
    return (
        <header className="header">
            <div className="title">
                <h1>Despertar do horrores</h1>
            </div>

            <div className="options">
                {children}
            </div>
        </header>
    )
}

export default Header