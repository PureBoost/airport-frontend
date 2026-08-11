import { useEffect, useState } from "react";
import { apiFetch } from "../api";

function AircraftAdmin() {
    const [aircraft, setAircraft] = useState([]);
    const [airlines, setAirlines] = useState([]);

    const [aircraftForm, setAircraftForm] = useState({
        model: "",
        registration: "",
        capacity: "",
        airline: {
            id: 1
        }
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        Promise.all([
            apiFetch("/aircraft").then((response) => response.json()),
            apiFetch("/airlines").then((response) => response.json())
        ])
            .then(([aircraftData, airlineData]) => {
                setAircraft(aircraftData);
                setAirlines(airlineData);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

    }, []);


    function createAircraft() {
        apiFetch("/aircraft", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aircraftForm)
        })
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            });
    }


    function deleteAircraft(id) {
        apiFetch(`/aircraft/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setAircraft(
                    aircraft.filter((plane) => plane.id !== id)
                );
            });
    }


    function editAircraft(selectedAircraft) {
        setEditingId(selectedAircraft.id);

        setAircraftForm({
            model: selectedAircraft.model,
            registration: selectedAircraft.registration,
            capacity: selectedAircraft.capacity,
            airline: {
                id: selectedAircraft.airline.id
            }
        });
    }


    function updateAircraft() {
        apiFetch(`/aircraft/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aircraftForm)
        })
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            });
    }


    function cancelEdit() {
        setEditingId(null);

        setAircraftForm({
            model: "",
            registration: "",
            capacity: "",
            airline: {
                id: 1
            }
        });
    }

    if (loading) {
        return <h2>Loading aircraft... <br/> This may take a few seconds.</h2>;
    }


    return (
        <div className="admin-section">

            <div className="admin-form-grid">
                <input
                    placeholder="Model"
                    value={aircraftForm.model}
                    onChange={(e) =>
                        setAircraftForm({
                            ...aircraftForm,
                            model: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Registration"
                    value={aircraftForm.registration}
                    onChange={(e) =>
                        setAircraftForm({
                            ...aircraftForm,
                            registration: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Capacity"
                    type="number"
                    value={aircraftForm.capacity}
                    onChange={(e) =>
                        setAircraftForm({
                            ...aircraftForm,
                            capacity: e.target.value
                        })
                    }
                />
                <select
                    value={aircraftForm.airline.id}
                    onChange={(e) =>
                        setAircraftForm({
                            ...aircraftForm,
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
            </div>

            <div className="admin-actions">
                <button onClick={editingId ? updateAircraft : createAircraft}>
                    {editingId ? "Update Aircraft" : "Add Aircraft"}
                </button>

                {editingId && (
                    <button onClick={cancelEdit}>
                        Cancel Edit
                    </button>
                )}
            </div>


            <table cellPadding="5">
                <thead>
                <tr>
                    <th>Model</th>
                    <th>Registration</th>
                    <th>Capacity</th>
                    <th>Airline</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {aircraft.map((plane) => (
                    <tr key={plane.id}>
                        <td>{plane.model}</td>
                        <td>{plane.registration}</td>
                        <td>{plane.capacity}</td>
                        <td>{plane.airline.name}</td>

                        <td>
                            <div className="admin-table-actions">
                                <button onClick={() => editAircraft(plane)}>
                                    Edit
                                </button>

                                <button onClick={() => deleteAircraft(plane.id)}>
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}

export default AircraftAdmin;