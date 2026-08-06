import { useEffect, useState } from "react";

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
        fetch("http://localhost:8080/gates")
            .then((response) => response.json())
            .then((data) => setGates(data))
            .catch((error) => console.error(error));


        fetch("http://localhost:8080/airports")
            .then((response) => response.json())
            .then((data) => setAirports(data))
            .catch((error) => console.error(error));

    }, []);


    function createGate() {
        fetch("http://localhost:8080/gates", {
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
        fetch(`http://localhost:8080/gates/${id}`, {
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
        fetch(`http://localhost:8080/gates/${editingId}`, {
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
        <div>
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

            <button onClick={editingId ? updateGate : createGate}>
                {editingId ? "Update Gate" : "Add Gate"}
            </button>

            {editingId && (
                <button onClick={cancelEdit}>
                    Cancel Edit
                </button>
            )}


            <table border="1" cellPadding="5">
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
                            <button onClick={() => editGate(gate)}>
                                Edit
                            </button>

                            <button onClick={() => deleteGate(gate.id)}>
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

export default GateAdmin;