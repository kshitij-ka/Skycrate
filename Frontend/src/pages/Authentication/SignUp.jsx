import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next"; // for multilinguality

const API_URL = import.meta.env.VITE_API_URL;

const SignUp = () => {
  const { t } = useTranslation(); // for multilinguality
  const navigate = useNavigate();

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
      toast.error(t("passwords_do_not_match"));
      return;
    }

    setLoading(true);
    const toastId = toast.loading(t("registering"));

    try {
      // 1️⃣ Sign up the user
      const signupRes = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        }),
      });
      const signupData = await signupRes.json();

      if (!signupRes.ok) {
        toast.error(signupData.message || t("signup_failed"), { id: toastId });
        return;
      }

      // 2️⃣ Build username and create HDFS folder
      const username =
        `${formData.firstname}${formData.lastname}`.toLowerCase();
      const folderRes = await fetch(
        `${API_URL}/api/hdfs/createFolder?hdfsPath=/${username}`,
        { method: "POST" }
      );

      if (!folderRes.ok) {
        // you might choose to roll back user creation or just notify
        toast.error(t("failed_create_folder"), { id: toastId });
      } else {
        toast.success(t("signup_success"), { id: toastId });
      }

      // 3️⃣ Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(t("an_error_occurred"), { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{t("sign_up")}</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder={t("first_name")}
            value={formData.firstname}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder={t("last_name")}
            value={formData.lastname}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t("email_placeholder")}
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
              placeholder={t("password_placeholder")}
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
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
              placeholder={t("confirm_password_placeholder")}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
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
            {loading ? t("signing_up") : t("sign_up")}
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-center mt-4 text-gray-700">
          {t("already_have_account")}{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
