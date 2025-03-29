import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-4xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Log in
        </h1>

        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-l-lg px-4 py-4 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mb-1">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:border-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-2 top-4 text-2xl text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
        <div className="mb-6 ">
          <Link
            to="#!"
            className="text-sm text-blue-600 hover:underline inline-block"
          >
            Forgot password?
          </Link>
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-[#1877F2] to-[#0E458C] hover:from-[#0E458C] hover:to-[#1877F2] text-white font-semibold rounded-full shadow-md transition duration-300">
          Login
        </button>
        <div className="text-center mt-6">
          <p className="text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-emerald-500 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
