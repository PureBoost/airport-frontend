import { useState } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./components/Login";

function App() {

    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("auth") !== null
    );

    const [page, setPage] = useState("home");


    if (!loggedIn) {
        return (
            <Login 
                onLogin={() => setLoggedIn(true)}
            />
        );
    }


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