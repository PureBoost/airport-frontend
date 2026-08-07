import { useEffect, useState } from "react";
import { apiFetch } from "../api";

function Home() {
    const [airports, setAirports] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState("");
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        apiFetch("/airports")
            .then((response) => response.json())
            .then((data) => {
                setAirports(data);
                setSelectedAirport(data[0].id);
            });
    }, []);

    useEffect(() => {
        if (selectedAirport === "") return;

        apiFetch(`/flights/airport/${selectedAirport}`)
            .then((response) => response.json())
            .then((data) => setFlights(data))
            .catch((error) => console.error(error));
    }, [selectedAirport]);

    const flightList = Array.isArray(flights) ? flights : [];

    const arrivals = flightList.filter(
        (flight) => flight.type === "Arrival"
    );

    const departures = flightList.filter(
        (flight) => flight.type === "Departure"
    );

    return (
        <div className="home-shell">
            <div className="home-header">
                <h1 className="home-title">Airport Arrivals & Departures</h1>
                <p className="home-subtitle">Live airport operations at a glance.</p>
            </div>

            <div className="home-controls">
                <label htmlFor="airport-select">Select Airport</label>

                <select
                    id="airport-select"
                    value={selectedAirport}
                    onChange={(e) => setSelectedAirport(e.target.value)}
                >
                    {airports.map((airport) => (
                        <option key={airport.id} value={airport.id}>
                            {airport.name} ({airport.code})
                        </option>
                    ))}
                </select>
            </div>

            <section className="home-section">
                <h2>Arrivals</h2>

                {arrivals.length === 0 ? (
                    <p className="home-empty">No arrivals.</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>Flight</th>
                            <th>Origin</th>
                            <th>Airline</th>
                            <th>Gate</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {arrivals.map((flight) => (
                            <tr key={flight.id}>
                                <td>{flight.flightNumber}</td>
                                <td>{flight.origin}</td>
                                <td>{flight.airline?.name}</td>
                                <td>{flight.gate?.gateNumber}</td>
                                <td>{flight.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </section>

            <section className="home-section">
                <h2>Departures</h2>

                {departures.length === 0 ? (
                    <p className="home-empty">No departures.</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>Flight</th>
                            <th>Destination</th>
                            <th>Airline</th>
                            <th>Gate</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {departures.map((flight) => (
                            <tr key={flight.id}>
                                <td>{flight.flightNumber}</td>
                                <td>{flight.destination}</td>
                                <td>{flight.airline?.name}</td>
                                <td>{flight.gate?.gateNumber}</td>
                                <td>{flight.scheduledTime ?? "TBD"}</td>
                                <td>{flight.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}

export default Home;