import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = import.meta.env.VITE_API_URL;

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const toastId = toast.loading("Registering...");

      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Successfully registered!", { id: toastId });
        // Optionally redirect to login
      } else {
        toast.error(data.message || "Signup failed.", { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign Up</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-2xl text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-4 text-2xl text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-3 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#10B981] to-[#07533A] hover:from-[#0E458C] hover:to-[#1877F2]"
            } text-white font-semibold rounded-lg shadow-md transition duration-300`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

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

// // eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { Link } from "react-router-dom";

// const SignUp = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         <h1 className="text-2xl font-bold text-gray-900  mb-6">Sign Up</h1>

//         {/* Form Fields */}
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="First Name"
//             className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Password Field */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-4 text-2xl text-gray-500 hover:text-gray-700"
//             >
//               {showPassword ? <FiEyeOff /> : <FiEye />}
//             </button>
//           </div>

//           {/* Confirm Password Field */}
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm your password"
//               className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-4 text-2xl text-gray-500 hover:text-gray-700"
//             >
//               {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
//             </button>
//           </div>
//         </div>

//         {/* Sign Up Button */}
//         <button className="w-full mt-6 py-3 bg-gradient-to-r from-[#10B981] to-[#07533A] hover:from-[#0E458C] hover:to-[#1877F2] text-white font-semibold rounded-lg shadow-md transition duration-300">
//           Sign Up
//         </button>

//         {/* Redirect to Login */}
//         <p className="text-center mt-4 text-gray-700">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-blue-500 hover:underline font-medium"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
