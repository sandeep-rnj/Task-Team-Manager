import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const CreateTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/tasks", task);
      console.log("✅ Task created:", res.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Failed to create task:", error.response?.data || error.message);
      alert("❌ " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 bg-white shadow rounded-xl">
      <h2 className="mb-4 text-2xl font-bold">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
