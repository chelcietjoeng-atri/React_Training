import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3001/users", {
        params: { username },
      });

      if (res.data.length > 0) {
        setError("Username already exists.");
        return;
      }

      await axios.post("http://localhost:3001/users", { username, password });
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
          🍽️ Create Account
        </h2>
        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="flex flex-col items-center space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="w-72 mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col items-center space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-72 mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{
              scale: 1.05, // Slight lift
              boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.6)",
            }}
            whileTap={{ scale: 0.95 }} // Shrinks a little when clicked
            type="submit"
            className="w-72 mx-auto block py-3 text-white font-semibold rounded-xl transition-all duration-300"
          >
            Register
          </motion.button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 hover:underline">
              Login here!
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
