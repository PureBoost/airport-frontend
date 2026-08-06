import { useEffect, useState } from "react";

function AirportAdmin() {
    const [airports, setAirports] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [airport, setAirport] = useState({
        name: "",
        code: ""
    });

    useEffect(() => {
        fetch("http://localhost:8080/airports")
            .then((response) => response.json())
            .then((data) => setAirports(data))
            .catch((error) => console.error(error));
    }, []);

    function createAirport() {
        fetch("http://localhost:8080/airports", {
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
        fetch(`http://localhost:8080/airports/${id}`, {
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
        fetch(`http://localhost:8080/airports/${editingId}`, {
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

    return (
        <div>
            <h3>Add Airport</h3>

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

            <button onClick={editingId ? updateAirport : createAirport}>
                {editingId ? "Update Airport" : "Add Airport"}
            </button>

            {editingId && (
                <button onClick={cancelEdit}>
                    Cancel Edit
                </button>
            )}


            <h3>Airport List</h3>

            <table border="1" cellPadding="5">
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
                            <button onClick={() => editAirport(airport)}>
                                Edit
                            </button>

                            <button onClick={() => deleteAirport(airport.id)}>
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

export default AirportAdmin;