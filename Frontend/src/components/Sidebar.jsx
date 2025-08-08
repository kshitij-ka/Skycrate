import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
// import LanguageSwitcher from "./LanguageSwitcher";

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef();

  // Show loading toast and perform logout
  const handleLogout = () => {
    const loadingToast = toast.loading(t("sidebar_logging_out"));

    // Simulate a delay (for example, network request)
    setTimeout(() => {
      // Remove the token from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("userEmail");

      // Dismiss the loading toast
      toast.dismiss(loadingToast);

      // Show success toast after logout
      toast.success(t("sidebar_logged_out"), {
        duration: 2000,
      });

      // Redirect user to the homepage
      navigate("/");
    }, 1500);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-50 h-[60px] w-full bg-white border-b border-gray-200">
        <div className="p-[15px] h-full lg:px-5 lg:pl-3 flex items-center justify-between">
          {/* Left Section - Logo & Toggle */}
          <div className="flex items-center">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-lg text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">{t("sidebar_open_sidebar")}</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </button>
            <Link to="/" className="flex ms-2 md:me-24">
              <img src="./image.png" className="h-8 me-3" alt="Skycrate Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-800">
                {t("sidebar_brand")}
              </span>
            </Link>
          </div>

          {/* Center/Right Section - Language Switcher, Search & User Menu */}
          <div className="flex items-center space-x-6 mr-4">
            {/* Language Switcher */}

            {/* Search Bar (if needed) */}
            <div className="flex items-center justify-end">
              {/* Add search functionality here if needed */}
            </div>

            {/* User Profile & Dropdown */}
            <div className="relative z-50">
              <button
                type="button"
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex text-lg bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
              >
                <span className="sr-only">{t("sidebar_open_user_menu")}</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt={t("sidebar_user_photo")}
                />
              </button>

              {userMenuOpen && (
                <div
                  ref={menuRef}
                  className="z-50 absolute right-0 mt-2 w-48 bg-[#1877F2] divide-y divide-gray-100 rounded-lg shadow-lg"
                >
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-white font-medium" role="none">
                      {localStorage.getItem("username")}
                    </p>
                    <p className="text-xs text-gray-200 truncate" role="none">
                      {localStorage.getItem("userEmail") || "user@example.com"}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <hr className="border-gray-300 my-1" />
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#37A0EA] transition-colors"
                        role="menuitem"
                      >
                        {t("sidebar_logout")}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-[60px] transition-transform -translate-x-full bg-[#1877F2] border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-[#1877F2] custom-scrollbar">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 mt-5 pt-4 pb-4 text-white rounded-lg hover:bg-[#37A0EA] group transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
                <span className="ms-3">{t("sidebar_dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/files"
                className="flex items-center p-2 pt-4 pb-4 text-white rounded-lg hover:bg-[#37A0EA] group transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8l6-6V8l-6-6H6zm7 7V3.5L18.5 9H13z" />
                </svg>
                <span className="ms-3">{t("sidebar_files")}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/starred"
                className="flex items-center p-2 pt-4 pb-4 text-white rounded-lg hover:bg-[#37A0EA] group transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="ms-3">{t("sidebar_starred")}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/shared"
                className="flex items-center p-2 pt-4 pb-4 text-white rounded-lg hover:bg-[#37A0EA] group transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                </svg>
                <span className="ms-3">{t("sidebar_shared")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
