// pages/LoginPage.js
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br via-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6">
          🍽️ MealMate Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
            Login
          </motion.button>

          <div className="text-center text-sm text-gray-600 mt-4">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="hover:underline font-semibold">
                Create one!
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
