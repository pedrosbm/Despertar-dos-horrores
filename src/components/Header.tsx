import type { PropsWithChildren } from "react"

const Header = ({ children }: PropsWithChildren) => {
    return (
        <header className="">
            {/* Fixed logo */}
            <div className="">
                <h1>Despertar dos horrores</h1>
            </div>

            {/* Options via children */}
            <div className="">
                {children}
            </div>
        </header>
    )
}

export default Header