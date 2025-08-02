import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-xl" />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-xl" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="w-full py-2 text-white transition bg-blue-600 rounded-xl hover:bg-blue-700">Login</button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don’t have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
