import { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL;

// Token management utilities
const TokenManager = {
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    // Set expiration time (assuming 1 hour for access token)
    const expirationTime = Date.now() + 60 * 60 * 1000;
    localStorage.setItem("tokenExpiration", expirationTime.toString());
  },

  getAccessToken: () => localStorage.getItem("accessToken"),
  getRefreshToken: () => localStorage.getItem("refreshToken"),

  isTokenExpired: () => {
    const expiration = localStorage.getItem("tokenExpiration");
    if (!expiration) return true;
    return Date.now() > parseInt(expiration);
  },

  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("username");
  },

  isLoggedIn: () => {
    return TokenManager.getAccessToken() && !TokenManager.isTokenExpired();
  },
};

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect if already logged in
  useEffect(() => {
    if (TokenManager.isLoggedIn()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t("email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t("invalid_email");
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = t("password_required");
    } else if (formData.password.length < 6) {
      newErrors.password = t("password_too_short");
    }

    return newErrors;
  };

  const fetchUserProfile = async (email, token) => {
    try {
      const response = await fetch(
        `${API_URL}/api/hdfs/getUsernameByEmail?email=${encodeURIComponent(
          email
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const username = await response.text();
        localStorage.setItem("username", username);
        localStorage.setItem("userEmail", email);
      } else {
        console.warn("Could not fetch username, but login was successful");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Don't fail the login process if profile fetch fails
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Show first validation error as toast
      const firstError = Object.values(validationErrors)[0];
      toast.error(firstError);
      return;
    }

    setLoading(true);
    const toastId = toast.loading(t("logging_in_toast"));

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();
      toast.dismiss(toastId);

      if (response.ok && data.accessToken) {
        // Store tokens securely
        TokenManager.setTokens(data.accessToken, data.refreshToken);

        // Fetch user profile asynchronously
        await fetchUserProfile(
          formData.email.trim().toLowerCase(),
          data.accessToken
        );

        toast.success(t("login_successful"));

        // Small delay to show success message
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 500);
      } else {
        // Handle various error scenarios
        if (response.status === 401) {
          toast.error(t("invalid_credentials"));
          setErrors({ password: t("invalid_credentials") });
        } else if (response.status === 429) {
          toast.error(t("too_many_attempts"));
        } else {
          toast.error(data.message || t("login_failed"));
        }
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Login error:", error);

      if (error.name === "AbortError") {
        toast.error(t("request_timeout"));
      } else if (!navigator.onLine) {
        toast.error(t("network_error"));
      } else {
        toast.error(t("an_error_occurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "#4ade80",
            },
          },
          error: {
            duration: 5000,
            theme: {
              primary: "#f87171",
            },
          },
        }}
      />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t("login_title")}
          </h1>
          <p className="text-gray-600 text-sm">{t("welcome_back_message")}</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              {t("email_label")}
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              onKeyPress={handleKeyPress}
              className={`w-full border-2 ${
                errors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
              placeholder={t("email_placeholder")}
              required
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              {t("password_label")}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleInputChange("password")}
                onKeyPress={handleKeyPress}
                className={`w-full border-2 ${
                  errors.password
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
                placeholder={t("password_placeholder")}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={togglePassword}
                disabled={loading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
            >
              {t("forgot_password")}
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed transform scale-95"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transform hover:scale-105 active:scale-95"
            }`}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin text-lg mr-2" />
                {t("logging_in")}
              </>
            ) : (
              t("login")
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-600 text-sm">
            {t("dont_have_account")}{" "}
            <Link
              to="/signup"
              className="text-green-600 hover:text-green-800 hover:underline font-semibold transition-colors duration-200"
            >
              {t("sign_up")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { TokenManager };
export default Login;
