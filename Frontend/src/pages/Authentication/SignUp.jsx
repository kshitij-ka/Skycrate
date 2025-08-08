import { useState } from "react";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL;

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = t("invalid_email");
    if (form.password.length < 8) e.password = t("password_too_short");
    if (form.password !== form.confirmPassword)
      e.confirmPassword = t("passwords_do_not_match");
    if (form.username.length < 3) e.username = t("username_too_short");
    return e;
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setLoading(true);
    const toastId = toast.loading(t("registering"));

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          username: form.username,
          password: form.password,
          fullname: `${form.firstname} ${form.lastname}`,
        }),
      });
      const contentType = res.headers.get("content-type");
      let body;

      if (contentType && contentType.includes("application/json")) {
        body = await res.json();
      } else {
        body = { message: await res.text() }; // fallback for plain text or empty
      }

      console.log(res);
      console.log(res.status);

      if (!res.ok) {
        throw new Error(body.message || `Status ${res.status}`);
      }

      // 2️⃣ Create HDFS folder (encode the slash!)
      const hdfsPath = encodeURIComponent(`/${form.username}`);
      const folderRes = await fetch(
        `${API_URL}/api/hdfs/createFolder?hdfsPath=${hdfsPath}`,
        { method: "POST" }
      );

      if (!folderRes.ok) {
        toast.error(t("failed_create_folder"), { id: toastId });
      } else {
        toast.success(t("signup_success"), { id: toastId });
      }

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.message || t("an_error_occurred"), { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {t("sign_up")}
        </h1>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            {["firstname", "lastname"].map((key, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t(key)}
                </label>
                <input
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          {/* username, email */}
          {["username", "email"].map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t(key)}
              </label>
              <input
                type={key === "email" ? "email" : "text"}
                name={key}
                placeholder={t(`enter_${key}`)}
                value={form[key]}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors[key] && (
                <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
              )}
            </div>
          ))}

          {/* passwords */}
          {[
            {
              key: "password",
              show: showPassword,
              toggle: () => setShowPassword((v) => !v),
            },
            {
              key: "confirmPassword",
              show: showConfirm,
              toggle: () => setShowConfirm((v) => !v),
            },
          ].map(({ key, show, toggle }) => (
            <div className="relative" key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t(key)}
              </label>
              <input
                type={show ? "text" : "password"}
                name={key}
                value={form[key]}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={toggle}
                className="absolute right-3 top-9 text-xl text-gray-500"
              >
                {show ? <FiEyeOff /> : <FiEye />}
              </button>
              {errors[key] && (
                <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-3 flex justify-center items-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#10B981] to-[#07533A] hover:from-[#0E458C] hover:to-[#1877F2]"
            } text-white font-semibold rounded-lg shadow-md transition duration-300`}
          >
            {loading ? (
              <FiLoader className="animate-spin text-xl" />
            ) : (
              t("sign_up")
            )}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700">
          {t("already_have_account")}{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
