import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import DrivethruLandingPage from "./pages/UserPages/DrivethruLandingPage";
import Dashboard from "./pages/UserPages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page at root ("/") */}
        <Route path="/" element={<DrivethruLandingPage />} />

        {/* Login Page at "/login" */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
