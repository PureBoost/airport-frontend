import { useState } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
    const [page, setPage] = useState("home");

    return (
        <div>
            <button onClick={() => setPage("home")}>
                Home
            </button>

            <button onClick={() => setPage("admin")}>
                Admin
            </button>

            <hr />

            {page === "home" && <Home />}
            {page === "admin" && <Admin />}
        </div>
    );
}

export default App;