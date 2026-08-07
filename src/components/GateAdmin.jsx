import { useEffect, useState } from "react";
import { apiFetch } from "../api";

function GateAdmin() {
    const [gates, setGates] = useState([]);
    const [airports, setAirports] = useState([]);

    const [gate, setGate] = useState({
        gateNumber: "",
        terminal: "",
        airport: {
            id: 1
        }
    });

    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        apiFetch("/gates")
            .then((response) => response.json())
            .then((data) => setGates(data))
            .catch((error) => console.error(error));


        apiFetch("/airports")
            .then((response) => response.json())
            .then((data) => setAirports(data))
            .catch((error) => console.error(error));

    }, []);


    function createGate() {
        apiFetch("/gates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gate)
        })
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            });
    }


    function deleteGate(id) {
        apiFetch(`/gates/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setGates(
                    gates.filter((gate) => gate.id !== id)
                );
            });
    }


    function editGate(selectedGate) {
        setEditingId(selectedGate.id);

        setGate({
            gateNumber: selectedGate.gateNumber,
            terminal: selectedGate.terminal,
            airport: {
                id: selectedGate.airport.id
            }
        });
    }


    function updateGate() {
        apiFetch(`/gates/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gate)
        })
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            });
    }


    function cancelEdit() {
        setEditingId(null);

        setGate({
            gateNumber: "",
            terminal: "",
            airport: {
                id: 1
            }
        });
    }


    return (
        <div className="admin-section">
            <div className="admin-form-grid">
                <input
                    placeholder="Gate Number"
                    value={gate.gateNumber}
                    onChange={(e) =>
                        setGate({
                            ...gate,
                            gateNumber: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Terminal"
                    value={gate.terminal}
                    onChange={(e) =>
                        setGate({
                            ...gate,
                            terminal: e.target.value
                        })
                    }
                />
                <select
                    value={gate.airport.id}
                    onChange={(e) =>
                        setGate({
                            ...gate,
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
            </div>

            <div className="admin-actions">
                <button onClick={editingId ? updateGate : createGate}>
                    {editingId ? "Update Gate" : "Add Gate"}
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
                    <th>Gate</th>
                    <th>Terminal</th>
                    <th>Airport</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {gates.map((gate) => (
                    <tr key={gate.id}>
                        <td>{gate.gateNumber}</td>
                        <td>{gate.terminal}</td>
                        <td>{gate.airport.name}</td>

                        <td>
                            <div className="admin-table-actions">
                                <button onClick={() => editGate(gate)}>
                                    Edit
                                </button>

                                <button onClick={() => deleteGate(gate.id)}>
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

export default GateAdmin;