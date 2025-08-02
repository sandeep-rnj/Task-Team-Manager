import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("❌ Get Tasks Error:", error.message);
    res.status(500).json({ error: "Server error while fetching tasks" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and Description are required" });
    }

    const newTask = new Task({
      title,
      description,
      status: status || "Pending",
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("❌ Create Task Error:", error.message);
    res.status(500).json({ error: "Server error while creating task" });
  }
};
