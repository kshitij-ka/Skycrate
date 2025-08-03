import { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Import React Hot Toast
import { useTranslation } from "react-i18next"; // for multilinguality

const API_URL = import.meta.env.VITE_API_URL; // Using .env variable

const Login = () => {
  const { t } = useTranslation(); // for multilinguality
  const navigate = useNavigate(); // For navigation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = t("email_required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = t("invalid_email");
    if (!password) errs.password = t("password_required");
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setLoading(true);
    const toastId = toast.loading(t("logging_in_toast"));

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      toast.dismiss(toastId);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("expiresIn", data.expiresIn);
        // fetch username asynchronously
        fetch(`${API_URL}/api/hdfs/getUsernameByEmail?email=${email}`)
          .then((res) => res.text())
          .then((username) => localStorage.setItem("username", username))
          .catch((err) => console.error("Error fetching username:", err));

        toast.success(t("login_successful"));
        navigate("/dashboard");
      } else {
        toast.error(data.message || t("login_failed"));
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.error(error);
      toast.error(t("an_error_occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t("login_title")}
        </h1>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("email_placeholder")}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder={t("email_placeholder")}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("password_placeholder")}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder={t("password_placeholder")}
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-8 text-xl text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Forgot & Submit */}
          <div className="flex items-center justify-between">
            <Link to="#!" className="text-sm text-blue-600 hover:underline">
              {t("forgot_password")}
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-3 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
            } text-white font-semibold rounded-lg shadow-md transition duration-300`}
          >
            {loading ? (
              <FiLoader className="animate-spin text-lg" />
            ) : (
              t("login")
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {t("dont_have_account")}{" "}
          <Link
            to="/signup"
            className="text-green-600 hover:underline font-medium"
          >
            {t("sign_up")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
