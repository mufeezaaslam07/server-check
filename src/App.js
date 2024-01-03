// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./components/AuthContext";
import { UserProvider } from "./components/UserContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route exact path="/dashboard" element={<PrivateRoute />}>
                <Route exact path="/dashboard" element={<Dashboard />} />
              </Route> */}
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
