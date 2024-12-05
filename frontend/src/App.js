import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login Route */}
          <Route
            path="/home/ishtdev/Sem5/DB/DBProject/frontend/src/components/login/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Dashboard Route (Protected) */}
          <Route
            path="/dashboard/:role"
            element={
              isAuthenticated ? (
                <Dashboard role={localStorage.getItem("role")} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Default Route */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/dashboard/student" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
