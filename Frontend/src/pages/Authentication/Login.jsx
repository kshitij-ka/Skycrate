import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import React Hot Toast
import { useTranslation } from "react-i18next"; // for multilinguality

const API_URL = import.meta.env.VITE_API_URL; // Using .env variable

const Login = () => {
  const { t } = useTranslation(); // for multilinguality
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Check if token is present in localStorage and redirect to Dashboard
    if (localStorage.getItem("token")) {
      navigate("/dashboard"); // Redirect to Dashboard
    }
  }, [navigate]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Show loading toast
    const toastId = toast.loading(t("logging_in_toast"));

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      // Dismiss the loading toast after the response
      toast.dismiss(toastId);

      if (response.ok) {
        // On success, store the token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("expiresIn", data.expiresIn);
        fetch(`${API_URL}/api/hdfs/getUsernameByEmail?email=${email}`)
          .then((response) => response.text())
          .then((username) => {
            localStorage.setItem("username", username);
          })
          .catch((error) => {
            console.error("Error fetching username:", error);
          });

        // Show success toast
        toast.success(t("login_successful"));
        // Redirect to Dashboard
        navigate("/dashboard");
      } else {
        // Show error toast if login fails
        toast.error(data.message || t("login_failed"));
      }
    } catch (error) {
      // Dismiss the loading toast and show error
      toast.dismiss(toastId);
      toast.error(t("an_error_occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-4xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          {t("login_title")}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="email"
                id="email"
                placeholder={t("email_placeholder")}
                className="w-full border border-gray-300 rounded-l-lg px-4 py-4 focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-1">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder={t("password_placeholder")}
                className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:border-blue-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
              {t("forgot_password")}
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#1877F2] to-[#0E458C] hover:from-[#0E458C] hover:to-[#1877F2] text-white font-semibold rounded-full shadow-md transition duration-300"
          >
            {loading ? t("logging_in") : t("login")}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-700">
            {t("dont_have_account")}{" "}
            <Link
              to="/signup"
              className="text-emerald-500 hover:underline font-medium"
            >
              {t("sign_up")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
