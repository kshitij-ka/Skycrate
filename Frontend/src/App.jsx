import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import DrivethruLandingPage from "./pages/UserPages/DrivethruLandingPage";
import Dashboard from "./pages/UserPages/Dashboard";
import NotFoundPage from "./pages/UserPages/NotFoundPage";

function App() {
  return (
    <Router>
      {/* Language Switcher positioned at top-right with proper positioning */}
      <div
        style={{
          position: "absolute",
          top: "0px",
          right: "5rem",
          zIndex: 1000,
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "4px",
          padding: "0.25em 0.5em",
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 2px 8px",
        }}
      >
        <LanguageSwitcher />
      </div>
      <Routes>
        <Route path="/" element={<DrivethruLandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
