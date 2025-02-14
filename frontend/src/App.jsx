import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register"; // Register page component
import Login from "./pages/Login"; // Login page component
import Home from "./pages/Home"; // Home page component
import Recommendations from "./pages/Recommendations"; // Recommendations page component
import { useState } from "react";
import Navbar from "./pages/Navbar"; // Navbar component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authToken") ? true : false
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated} 
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/recommendations" element={<Recommendations />} /> {/* No auth check here */}
          </Routes>
        </main>
        <footer className="bg-gray-800 text-gray-200 py-4 text-center">
          © 2025 MindFlip. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
