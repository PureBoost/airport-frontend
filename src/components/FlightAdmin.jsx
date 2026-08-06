import { useEffect, useState } from "react";

function FlightAdmin() {
    const [flights, setFlights] = useState([]);
    const [editingId, setEditingId] = useState(null);

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
        fetch("http://localhost:8080/flights")
            .then((response) => response.json())
            .then((data) => setFlights(data))
            .catch((error) => console.error(error));
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
                id: selectedFlight.aircraft.id
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

    return (
        <div>
            <h2>Add Flight</h2>

            <input
                placeholder="Flight Number"
                value={flight.flightNumber}
                onChange={(e) =>
                    setFlight({...flight, flightNumber: e.target.value})
                }
            />

            <input
                placeholder="Origin"
                value={flight.origin}
                onChange={(e) =>
                    setFlight({...flight, origin: e.target.value})
                }
            />

            <input
                placeholder="Destination"
                value={flight.destination}
                onChange={(e) =>
                    setFlight({...flight, destination: e.target.value})
                }
            />

            <select
                value={flight.type}
                onChange={(e) =>
                    setFlight({...flight, type: e.target.value})
                }
            >
                <option>Departure</option>
                <option>Arrival</option>
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