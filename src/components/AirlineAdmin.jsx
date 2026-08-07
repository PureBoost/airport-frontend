import { useEffect, useState } from "react";
import { apiFetch } from "../api";

function AirlineAdmin() {
    const [airlines, setAirlines] = useState([]);

    const [airline, setAirline] = useState({
        name: "",
        code: ""
    });

    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        apiFetch("/airlines")
            .then((response) => response.json())
            .then((data) => setAirlines(data))
            .catch((error) => console.error(error));
    }, []);


    function createAirline() {
        apiFetch("/airlines", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(airline)
        })
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            });
    }


    function deleteAirline(id) {
        apiFetch(`/airlines/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setAirlines(
                    airlines.filter((airline) => airline.id !== id)
                );
            });
    }


    function editAirline(selectedAirline) {
        setEditingId(selectedAirline.id);

        setAirline({
            name: selectedAirline.name,
            code: selectedAirline.code
        });
    }


    function updateAirline() {
        apiFetch(`/airlines/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(airline)
        })
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            });
    }


    function cancelEdit() {
        setEditingId(null);

        setAirline({
            name: "",
            code: ""
        });
    }


    return (
        <div className="admin-section">
            <div className="admin-form-grid">
                <input
                    placeholder="Airline Name"
                    value={airline.name}
                    onChange={(e) =>
                        setAirline({
                            ...airline,
                            name: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Airline Code"
                    value={airline.code}
                    onChange={(e) =>
                        setAirline({
                            ...airline,
                            code: e.target.value
                        })
                    }
                />
            </div>

            <div className="admin-actions">
                <button onClick={editingId ? updateAirline : createAirline}>
                    {editingId ? "Update Airline" : "Add Airline"}
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
                {airlines.map((airline) => (
                    <tr key={airline.id}>
                        <td>{airline.name}</td>
                        <td>{airline.code}</td>
                        <td>
                            <div className="admin-table-actions">
                                <button onClick={() => editAirline(airline)}>
                                    Edit
                                </button>

                                <button onClick={() => deleteAirline(airline.id)}>
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

export default AirlineAdmin;