import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LanguageSwitcher from './components/LanguageSwitcher'; // Language switcher dropdown menu
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import DrivethruLandingPage from "./pages/UserPages/DrivethruLandingPage";
import Dashboard from "./pages/UserPages/Dashboard";
import NotFoundPage from "./pages/UserPages/NotFoundPage";

function App() {
  return (
    <Router>
      <LanguageSwitcher />
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
