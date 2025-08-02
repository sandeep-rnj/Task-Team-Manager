import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="p-4 transition bg-white shadow rounded-xl hover:shadow-md">
      <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
      <p className="mt-1 text-sm text-gray-600">{task.description}</p>
      <p className="mt-2 text-xs text-gray-400">
        Status: <span className="font-medium">{task.status}</span>
      </p>
    </div>
  );
};

export default TaskCard;
