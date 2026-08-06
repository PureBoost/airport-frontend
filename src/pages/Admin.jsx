import { useState } from "react";
import FlightAdmin from "../components/FlightAdmin";
import AirportAdmin from "../components/AirportAdmin";
import AirlineAdmin from "../components/AirlineAdmin";
import GateAdmin from "../components/GateAdmin";
import AircraftAdmin from "../components/AircraftAdmin";

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

            {section === "airports" && <AirportAdmin />}

            {section === "airlines" && <AirlineAdmin />}

            {section === "aircraft" && <AircraftAdmin />}

            {section === "gates" && <GateAdmin />}
        </div>
    );
}

export default Admin;