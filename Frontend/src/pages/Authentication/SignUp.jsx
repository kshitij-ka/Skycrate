import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900  mb-6">Sign Up</h1>

        {/* Form Fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* Sign Up Button */}
        <button className="w-full mt-6 py-3 bg-gradient-to-r from-[#10B981] to-[#07533A] hover:from-[#0E458C] hover:to-[#1877F2] text-white font-semibold rounded-lg shadow-md transition duration-300">
          Sign Up
        </button>

        {/* Redirect to Login */}
        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
