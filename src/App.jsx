import { useState } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
    const [page, setPage] = useState("home");

    return (
        <div className="app-shell">
            <header className="top-nav">
                <nav className="nav-buttons">
                    <button
                        className={page === "home" ? "nav-button active" : "nav-button"}
                        onClick={() => setPage("home")}
                    >
                        Home
                    </button>

                    <button
                        className={page === "admin" ? "nav-button active" : "nav-button"}
                        onClick={() => setPage("admin")}
                    >
                        Admin
                    </button>
                </nav>
            </header>

            {page === "home" && <Home />}
            {page === "admin" && <Admin />}
        </div>
    );
}

export default App;