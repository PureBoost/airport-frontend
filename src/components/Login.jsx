import { useState } from "react";

function Login({ onLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        const token = btoa(`${username}:${password}`);

        const response = await fetch(
            "https://airport-api-3ixj.onrender.com/airports",
            {
                headers: {
                    Authorization: `Basic ${token}`
                }
            }
        );

        if (response.ok) {
            localStorage.setItem("auth", token);
            onLogin();
        } else {
            setError("Invalid username or password");
        }
    }


    return (
        <div className="login-shell">
            <div className="login-card">
                <div className="login-brand">
                    <p className="login-ap">Airport</p>
                    <h1>Login</h1>
                    <p className="login-subtitle">Access the control panel and flight information.</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>
                </form>

                {error && <p className="login-error">{error}</p>}
            </div>
        </div>
    );
}

export default Login;