import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Tasks</h1>
        <button
          onClick={() => navigate("/create-task")}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          + Create Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Create your first task!</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {tasks.map((task) => (
            <div key={task._id} className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <p className="mt-2 text-sm text-gray-500">Status: {task.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
