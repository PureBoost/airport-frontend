import { useEffect, useState } from "react";

function FlightAdmin() {
    const [flights, setFlights] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [airports, setAirports] = useState([]);
    const [airlines, setAirlines] = useState([]);
    const [aircraft, setAircraft] = useState([]);
    const [gates, setGates] = useState([]);

    const [loading, setLoading] = useState(true);

    const [flight, setFlight] = useState({
        flightNumber: "",
        type: "Departure",
        origin: "",
        destination: "",
        status: "On Time",
        airport: { id: 1 },
        airline: { id: 1 },
        aircraft: { id: 1 },
        gate: { id: 1 }
    });


    useEffect(() => {
        Promise.all([
            fetch("http://localhost:8080/flights").then(res => res.json()),
            fetch("http://localhost:8080/airports").then(res => res.json()),
            fetch("http://localhost:8080/airlines").then(res => res.json()),
            fetch("http://localhost:8080/aircraft").then(res => res.json()),
            fetch("http://localhost:8080/gates").then(res => res.json())
        ])
            .then(([flights, airports, airlines, aircraft, gates]) => {
                setFlights(flights);
                setAirports(airports);
                setAirlines(airlines);
                setAircraft(aircraft);
                setGates(gates);

                setLoading(false);
            })
            .catch(error => console.error(error));

    }, []);


    function createFlight() {
        fetch("http://localhost:8080/flights", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(flight)
        })
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            });
    }


    function deleteFlight(id) {
        fetch(`http://localhost:8080/flights/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setFlights(
                    flights.filter((flight) => flight.id !== id)
                );
            });
    }


    function updateFlight() {
        fetch(`http://localhost:8080/flights/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(flight)
        })
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            });
    }


    function editFlight(selectedFlight) {
        setEditingId(selectedFlight.id);

        setFlight({
            flightNumber: selectedFlight.flightNumber,
            type: selectedFlight.type,
            origin: selectedFlight.origin,
            destination: selectedFlight.destination,
            status: selectedFlight.status,
            airport: {
                id: selectedFlight.airport.id
            },
            airline: {
                id: selectedFlight.airline.id
            },
            aircraft: {
                id: selectedFlight.aircraft ? selectedFlight.aircraft.id : 1
            },
            gate: {
                id: selectedFlight.gate.id
            }
        });
    }


    function cancelEdit() {
        setEditingId(null);

        setFlight({
            flightNumber: "",
            type: "Departure",
            origin: "",
            destination: "",
            status: "On Time",
            airport: { id: 1 },
            airline: { id: 1 },
            aircraft: { id: 1 },
            gate: { id: 1 }
        });
    }


    if (loading) {
        return <h2>Loading flight data...</h2>;
    }


    return (
        <div>

            <h2>Add Flight</h2>

            <input
                placeholder="Flight Number"
                value={flight.flightNumber}
                onChange={(e) =>
                    setFlight({
                        ...flight,
                        flightNumber: e.target.value
                    })
                }
            />

            <input
                placeholder="Origin"
                value={flight.origin}
                onChange={(e) =>
                    setFlight({
                        ...flight,
                        origin: e.target.value
                    })
                }
            />

            <input
                placeholder="Destination"
                value={flight.destination}
                onChange={(e) =>
                    setFlight({
                        ...flight,
                        destination: e.target.value
                    })
                }
            />


            <select
                value={flight.airport.id}
                onChange={(e) =>
                    setFlight({
                        ...flight,
                        airport: {
                            id: Number(e.target.value)
                        }
                    })
                }
            >
                {airports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                        {airport.name}
                    </option>
                ))}
            </select>


            <select
                value={flight.airline.id}
                onChange={(e) =>
                    setFlight({
                        ...flight,
                        airline: {
                            id: Number(e.target.value)
                        }
                    })
                }
            >
                {airlines.map((airline) => (
                    <option key={airline.id} value={airline.id}>
                        {airline.name}
                    </option>
                ))}
            </select>


            <select
                value={flight.aircraft.id}
                onChange={(e) =>
                    setFlight({
                        ...flight,
                        aircraft: {
                            id: Number(e.target.value)
                        }
                    })
                }
            >
                {aircraft.map((plane) => (
                    <option key={plane.id} value={plane.id}>
                        {plane.model}
                    </option>
                ))}
            </select>


            <select
                value={flight.gate.id}
                onChange={(e) =>
                    setFlight({
                        ...flight,
                        gate: {
                            id: Number(e.target.value)
                        }
                    })
                }
            >
                {gates.map((gate) => (
                    <option key={gate.id} value={gate.id}>
                        {gate.gateNumber}
                    </option>
                ))}
            </select>


            <select
                value={flight.type}
                onChange={(e) =>
                    setFlight({
                        ...flight,
                        type: e.target.value
                    })
                }
            >
                <option>Departure</option>
                <option>Arrival</option>
            </select>

            <select
                value={flight.status}
                onChange={(e) =>
                    setFlight({
                        ...flight,
                        status: e.target.value
                    })
                }
            >
                <option>On Time</option>
                <option>Delayed</option>
                <option>Cancelled</option>
                <option>Boarding</option>
                <option>Departed</option>
            </select>


            <button onClick={editingId ? updateFlight : createFlight}>
                {editingId ? "Update Flight" : "Add Flight"}
            </button>


            {editingId && (
                <button onClick={cancelEdit}>
                    Cancel Edit
                </button>
            )}


            <h2>Manage Flights</h2>

            <table border="1" cellPadding="5">
                <thead>
                <tr>
                    <th>Flight</th>
                    <th>Type</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {flights.map((flight) => (
                    <tr key={flight.id}>
                        <td>{flight.flightNumber}</td>
                        <td>{flight.type}</td>
                        <td>{flight.origin}</td>
                        <td>{flight.destination}</td>
                        <td>{flight.status}</td>

                        <td>
                            <button onClick={() => editFlight(flight)}>
                                Edit
                            </button>

                            <button onClick={() => deleteFlight(flight.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>

        </div>
    );
}

export default FlightAdmin;