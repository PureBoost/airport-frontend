import { useState } from "react";
import FlightAdmin from "../components/FlightAdmin";
import AirportAdmin from "../components/AirportAdmin";
import AirlineAdmin from "../components/AirlineAdmin";
import GateAdmin from "../components/GateAdmin";
import AircraftAdmin from "../components/AircraftAdmin";

function Admin() {
    const [section, setSection] = useState("flights");

    return (
        <div className="home-shell">
            <div className="home-section admin-header-card">
                <h1 className="home-title">Admin Dashboard</h1>
                <p className="home-subtitle">Manage airport data and operational settings.</p>

                <div className="admin-controls">
                    <button
                        className={section === "flights" ? "admin-button active" : "admin-button"}
                        onClick={() => setSection("flights")}
                    >
                        Flights
                    </button>

                    <button
                        className={section === "airports" ? "admin-button active" : "admin-button"}
                        onClick={() => setSection("airports")}
                    >
                        Airports
                    </button>

                    <button
                        className={section === "airlines" ? "admin-button active" : "admin-button"}
                        onClick={() => setSection("airlines")}
                    >
                        Airlines
                    </button>

                    <button
                        className={section === "aircraft" ? "admin-button active" : "admin-button"}
                        onClick={() => setSection("aircraft")}
                    >
                        Aircraft
                    </button>

                    <button
                        className={section === "gates" ? "admin-button active" : "admin-button"}
                        onClick={() => setSection("gates")}
                    >
                        Gates
                    </button>
                </div>
            </div>

            {section === "flights" && <FlightAdmin />}

            {section === "airports" && <AirportAdmin />}

            {section === "airlines" && <AirlineAdmin />}

            {section === "aircraft" && <AircraftAdmin />}

            {section === "gates" && <GateAdmin />}
        </div>
    );
}

export default Admin;