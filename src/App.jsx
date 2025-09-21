import React from "react";
import { Routes, Route } from "react-router-dom";
import Session from "./components/Session";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AgentsPage from "./components/AgentsPage";
import Analyzer from "./components/Clarifier";
import Conflict from "./components/Conflict";
import Validate from "./components/Validate";
import Priorities from "./components/Priorities";
import Clarifier from "./components/Clarifier";
import "./output.css";
import ProfileDashboard from "./components/ProfileDashboard";

function App() {
  return (
    <div className="max-w-full max-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/conflict" element={<Conflict />} />
        <Route path="/priorities" element={<Priorities />} />
        <Route path="/session" element={<Session />} />
        <Route path="/validate" element={<Validate />} />
        <Route path="/Profile" element={<ProfileDashboard/>}></Route>
        <Route path="/clarifier" element={<Clarifier/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
