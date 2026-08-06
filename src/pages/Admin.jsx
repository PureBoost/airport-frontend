import { useState } from "react";
import FlightAdmin from "../components/FlightAdmin";

function Admin() {
    const [section, setSection] = useState("flights");

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <button onClick={() => setSection("flights")}>
                Flights
            </button>

            <button onClick={() => setSection("airports")}>
                Airports
            </button>

            <button onClick={() => setSection("airlines")}>
                Airlines
            </button>

            <button onClick={() => setSection("aircraft")}>
                Aircraft
            </button>

            <button onClick={() => setSection("gates")}>
                Gates
            </button>

            <hr />

            {section === "flights" && <FlightAdmin />}

            {section === "airports" && (
                <h2>Airport Management</h2>
            )}

            {section === "airlines" && (
                <h2>Airline Management</h2>
            )}

            {section === "aircraft" && (
                <h2>Aircraft Management</h2>
            )}

            {section === "gates" && (
                <h2>Gate Management</h2>
            )}
        </div>
    );
}

export default Admin;