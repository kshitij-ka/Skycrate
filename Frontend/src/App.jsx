import "./App.css";
import DrivethruLandingPage from "./pages/DrivethruLandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page at root ("/") */}
        <Route path="/" element={<DrivethruLandingPage />} />

        {/* Login Page at "/login" */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
