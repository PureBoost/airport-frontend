import { useEffect, useState } from "react";

function AircraftAdmin() {
    const [aircraft, setAircraft] = useState([]);

    const [aircraftForm, setAircraftForm] = useState({
        model: "",
        registration: "",
        capacity: "",
        airline: {
            id: 1
        }
    });

    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        fetch("http://localhost:8080/aircraft")
            .then((response) => response.json())
            .then((data) => setAircraft(data))
            .catch((error) => console.error(error));
    }, []);


    function createAircraft() {
        fetch("http://localhost:8080/aircraft", {
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
        fetch(`http://localhost:8080/aircraft/${id}`, {
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
        fetch(`http://localhost:8080/aircraft/${editingId}`, {
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


    return (
        <div>
            <h2>Manage Aircraft</h2>

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

            <button onClick={editingId ? updateAircraft : createAircraft}>
                {editingId ? "Update Aircraft" : "Add Aircraft"}
            </button>

            {editingId && (
                <button onClick={cancelEdit}>
                    Cancel Edit
                </button>
            )}


            <table border="1" cellPadding="5">
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
                            <button onClick={() => editAircraft(plane)}>
                                Edit
                            </button>

                            <button onClick={() => deleteAircraft(plane.id)}>
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

export default AircraftAdmin;