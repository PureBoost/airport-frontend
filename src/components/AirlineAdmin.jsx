import { useEffect, useState } from "react";

function AirlineAdmin() {
    const [airlines, setAirlines] = useState([]);

    const [airline, setAirline] = useState({
        name: "",
        code: ""
    });

    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        fetch("http://localhost:8080/airlines")
            .then((response) => response.json())
            .then((data) => setAirlines(data))
            .catch((error) => console.error(error));
    }, []);


    function createAirline() {
        fetch("http://localhost:8080/airlines", {
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
        fetch(`http://localhost:8080/airlines/${id}`, {
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
        fetch(`http://localhost:8080/airlines/${editingId}`, {
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
        <div>
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

            <button onClick={editingId ? updateAirline : createAirline}>
                {editingId ? "Update Airline" : "Add Airline"}
            </button>

            {editingId && (
                <button onClick={cancelEdit}>
                    Cancel Edit
                </button>
            )}


            <table border="1" cellPadding="5">
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
                            <button onClick={() => editAirline(airline)}>
                                Edit
                            </button>

                            <button onClick={() => deleteAirline(airline.id)}>
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

export default AirlineAdmin;