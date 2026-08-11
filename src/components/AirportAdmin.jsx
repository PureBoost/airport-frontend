import { useEffect, useState } from "react";
import { apiFetch } from "../api";

function AirportAdmin() {
    const [airports, setAirports] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [airport, setAirport] = useState({
        name: "",
        code: ""
    });

    useEffect(() => {
        apiFetch("/airports")
            .then((response) => response.json())
            .then((data) => setAirports(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    function createAirport() {
        apiFetch("/airports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(airport)
        })
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            });
    }

    function deleteAirport(id) {
        apiFetch(`/airports/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setAirports(
                    airports.filter((airport) => airport.id !== id)
                );
            });
    }

    function editAirport(selectedAirport) {
        setEditingId(selectedAirport.id);

        setAirport({
            name: selectedAirport.name,
            code: selectedAirport.code
        });
    }

    function updateAirport() {
        apiFetch(`/airports/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(airport)
        })
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            });
    }

    function cancelEdit() {
        setEditingId(null);

        setAirport({
            name: "",
            code: ""
        });
    }

    if (loading) {
        return <h2>Loading airports... <br/> This may take a few seconds.</h2>;
    }

    return (
        <div className="admin-section">

            <div className="admin-form-grid">
                <input
                    placeholder="Airport Name"
                    value={airport.name}
                    onChange={(e) =>
                        setAirport({
                            ...airport,
                            name: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Airport Code"
                    value={airport.code}
                    onChange={(e) =>
                        setAirport({
                            ...airport,
                            code: e.target.value
                        })
                    }
                />
            </div>

            <div className="admin-actions">
                <button onClick={editingId ? updateAirport : createAirport}>
                    {editingId ? "Update Airport" : "Add Airport"}
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
                    <th>Name</th>
                    <th>Code</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {airports.map((airport) => (
                    <tr key={airport.id}>
                        <td>{airport.name}</td>
                        <td>{airport.code}</td>
                        <td>
                            <div className="admin-table-actions">
                                <button onClick={() => editAirport(airport)}>
                                    Edit
                                </button>

                                <button onClick={() => deleteAirport(airport.id)}>
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

export default AirportAdmin;