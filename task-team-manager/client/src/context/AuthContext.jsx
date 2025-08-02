import { createContext, useContext, useState } from "react";
import axios from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (formData) => {
    const res = await axios.post("/register", formData);
    setUser(res.data.user);
    return res.data;
  };

  const login = async (formData) => {
    const res = await axios.post("/login", formData);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
