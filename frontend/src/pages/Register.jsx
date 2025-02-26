import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.jpg"; 
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Initialize useNavigate for redirecting

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_EXPRESS_SERVER}/api/register`, {
        username,
        email,
        password,
      });
      alert("Registration successful! Please log in.");
      navigate("/login");  // Redirect to the login page after successful registration
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${bgImage})` }}>
      <form
        onSubmit={handleRegister}
        className="p-8 bg-white rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-black text-center">
          Welcome to MindFlip
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Take the first step toward better mental health by registering below.
        </p>

        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-blue-400 transition duration-300"
        >
          Register
        </button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
