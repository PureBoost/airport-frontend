import { useEffect, useState } from "react";

function App() {
    const [airports, setAirports] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState("");
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/airports")
            .then((response) => response.json())
            .then((data) => {
                setAirports(data);
                setSelectedAirport(data[0].id);
            });
    }, []);

    useEffect(() => {
        if (selectedAirport === "") return;

        fetch(`http://localhost:8080/flights/airport/${selectedAirport}`)
            .then((response) => response.json())
            .then((data) => setFlights(data))
            .catch((error) => console.error(error));
    }, [selectedAirport]);

    const arrivals = flights.filter(
        (flight) => flight.type === "Arrival"
    );

    const departures = flights.filter(
        (flight) => flight.type === "Departure"
    );

    return (
        <div>
            <h1>Airport System</h1>

            <label>
                Select Airport:
            </label>

            <select
                value={selectedAirport}
                onChange={(e) => setSelectedAirport(e.target.value)}
            >
                {airports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                        {airport.name} ({airport.code})
                    </option>
                ))}
            </select>

            <h2>Arrivals</h2>

            {arrivals.length === 0 ? (
                <p>No arrivals.</p>
            ) : (
                <table border="1" cellPadding="5">
                    <thead>
                    <tr>
                        <th>Flight</th>
                        <th>Origin</th>
                        <th>Airline</th>
                        <th>Gate</th>
                        <th>Time</th>
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
                            <td>{flight.scheduledTime ?? "TBD"}</td>
                            <td>{flight.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <h2>Departures</h2>

            {departures.length === 0 ? (
                <p>No departures.</p>
            ) : (
                <table border="1" cellPadding="5">
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

            <h2>Selected Airport ID: {selectedAirport}</h2>
        </div>
    );
}

export default App;