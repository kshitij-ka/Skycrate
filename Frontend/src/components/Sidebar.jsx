import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next"; // for multilinguality

const Sidebar = () => {
  const { t } = useTranslation(); // for multilinguality
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef();

  // Show loading toast and perform logout
  const handleLogout = () => {
    const loadingToast = toast.loading(t("sidebar_logging_out"));

    // Simulate a delay (for example, network request)
    setTimeout(() => {
      // Remove the token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("expiresIn");

      // Redirect user to the homepage
      navigate("/");

      // Show success toast after logout
      toast.update(loadingToast, {
        render: t("sidebar_logged_out"),
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
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
              className="inline-flex items-center p-2 text-lg text-white rounded-lg sm:hidden hover:bg-[#37A0EA] focus:outline-none"
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
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                {t("sidebar_brand")}
              </span>
            </Link>
          </div>

          {/* Right Section - Search & User Menu */}
          <div className="flex items-center">
            {/* Search Bar */}
            <div className="flex items-center justify-end mr-40"></div>

            {/* User Profile & Dropdown */}
            <div className="relative ms-3">
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
                  className="z-50 absolute right-0 mt-2 w-48 bg-[#1877F2] divide-y divide-gray-100 rounded-sm shadow-sm"
                >
                  <div className="px-4 py-3" role="none">
                    <p className="text-lg text-white" role="none">
                      {localStorage.getItem("username")}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-lg text-white hover:bg-[#37A0EA]"
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
                to="#"
                className="flex items-center p-2 mt-5 pt-4 pb-4 text-white rounded-lg hover:bg-[#37A0EA] group"
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
            {/* ...additional sidebar items... */}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
