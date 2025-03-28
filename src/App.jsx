import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateItem from "./components/UpdateItem";

function Home() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8000/doors");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEditClick = (task) => {
    navigate(/update/${task.id}, { state: { task } });
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this Item?");
    if (confirmDelete) {
      try {
        await axios.delete(http://localhost:8000/doors/${id});
        fetchItems();
        alert("Item deleted successfully!");
      } catch (error) {
        alert("Error deleting Item.");
      }
    }
  };

  return (
    <>
      <h2>Door List</h2>
      <ul>
        {items?.map((task) => (
          <li key={task.id}>
            {task.name} - {task.status} 
            <button onClick={() => handleEditClick(task)}>Update</button>
            <button onClick={() => handleDeleteClick(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<UpdateItem />} />
      </Routes>
    </Router>
  );
}

export default App;