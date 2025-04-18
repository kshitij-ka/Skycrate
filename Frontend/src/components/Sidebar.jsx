import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {

  const navigate = useNavigate();  // Hook for programmatic navigation

  const handleLogout = () => {
    // Show loading toast
    const loadingToast = toast.loading("Logging out...");

    // Simulate a delay (for example, network request)
    setTimeout(() => {
      // Remove the token from localStorage
      localStorage.removeItem('token');  // Adjust the key if necessary

      // Redirect user to the homepage
      navigate('/');

      // Show success toast after logout
      toast.update(loadingToast, {
        render: "Logged out successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    }, 1500);  // Simulate a 1.5 second delay before showing success
  };

  return (
    <>
        <nav className="fixed top-0 z-50 h-[60px] w-full bg-white border-b border-gray-200">
      <div className="p-[15px] h-full lg:px-5 lg:pl-3">
        <div className="flex h-full items-center justify-between">
          {/* Left Section - Logo */}
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-lg text-white rounded-lg sm:hidden hover:bg-[#37A0EA] focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-[#37A0EA] dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link to="/" className="flex ms-2 md:me-24">
              <img
                src="./image.png"
                className="h-8 me-3"
                alt="Skycrate Logo"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                Skycrate
              </span>
            </Link>
          </div>

          {/* Right Section - Search & User Menu */}
          <div className="flex items-center">
            {/* Search Bar */}
            <div className="flex items-center justify-end mr-40">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>

            {/* User Profile & Dropdown */}
            <div className="flex items-center ms-3">
              <div>
                <button
                  type="button"
                  className="flex text-lg bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="User Photo"
                  />
                </button>
              </div>
              <div
                className="z-50 hidden my-4 text-base list-none bg-[#1877F2] divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                id="dropdown-user"
              >
                <div className="px-4 py-3" role="none">
                  <p className="text-lg text-white dark:text-white" role="none">
                    Neil Sims
                  </p>
                  <p
                    className="text-lg font-medium text-white truncate dark:text-gray-300"
                    role="none"
                  >
                    Skycrate@Skycrate.com
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-lg text-white hover:bg-[#37A0EA] dark:text-gray-300 dark:hover:bg-[#37A0EA] dark:hover:text-white"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-lg text-white hover:bg-[#37A0EA] dark:text-gray-300 dark:hover:bg-[#37A0EA] dark:hover:text-white"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-lg text-white hover:bg-[#37A0EA] dark:text-gray-300 dark:hover:bg-[#37A0EA] dark:hover:text-white"
                      role="menuitem"
                    >
                      Earnings
                    </Link>
                  </li>
                  <li>
                    {/* Log Out Button */}
                    <button
                      type="button"
                      onClick={handleLogout}  // Trigger the logout function
                      className="block px-4 py-2 text-lg text-white hover:bg-[#37A0EA] dark:text-gray-300 dark:hover:bg-[#37A0EA] dark:hover:text-white"
                      role="menuitem"
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-[60px] transition-transform -translate-x-full bg-[#1877F2] border-r border-gray-200 sm:translate-x-0 dark:bg-[#1877F2] dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-[#1877F2] dark:bg-[#1877F2] custom-scrollbar">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="#"
                className="flex items-center p-2 mt-5 pt-4 pb-4 text-white rounded-lg dark:text-white hover:bg-[#37A0EA] dark:hover:bg-[#37A0EA] group"
              >
                <svg
                  className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
                </svg>

                <span className="ms-3">Starred</span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center p-2 pt-4 pb-4 text-white rounded-lg dark:text-white hover:bg-[#37A0EA] dark:hover:bg-[#37A0EA] group"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.31763 16.0834C1.93846 16.0834 1.60669 15.9372 1.32231 15.6449C1.03794 15.3527 0.895752 15.0248 0.895752 14.6615V2.33856C0.895752 1.97519 1.03794 1.64737 1.32231 1.3551C1.60669 1.06282 1.93846 0.916687 2.31763 0.916687H8.97674L10.3986 2.33856H18.4322C18.7956 2.33856 19.1234 2.4847 19.4157 2.77697C19.7079 3.06925 19.8541 3.39707 19.8541 3.76044V14.6615C19.8541 15.0248 19.7079 15.3527 19.4157 15.6449C19.1234 15.9372 18.7956 16.0834 18.4322 16.0834H10.3986L8.97674 14.6615H2.31763Z"
                    fill="currentColor"
                  />
                </svg>

                <span className="ms-3">Documents</span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center p-2 pt-4 pb-4 text-white rounded-lg dark:text-white hover:bg-[#37A0EA] dark:hover:bg-[#37A0EA] group"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.00016 2C5.68841 2 3.00016 4.68821 3.00016 8C3.00016 11.3118 5.68841 14 9.00016 14C12.3119 14 15.0002 11.3118 15.0002 8C15.0002 4.68821 12.3119 2 9.00016 2ZM9.00016 12C6.79006 12 5.00016 10.21 5.00016 8C5.00016 5.79 6.79006 4 9.00016 4C11.2103 4 13.0002 5.79 13.0002 8C13.0002 10.21 11.2103 12 9.00016 12Z"
                    fill="currentColor"
                  />
                </svg>

                <span className="ms-3">Team</span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center p-2 pt-4 pb-4 text-white rounded-lg dark:text-white hover:bg-[#37A0EA] dark:hover:bg-[#37A0EA] group"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.00002 2C5.44775 2 5.00002 2.44772 5.00002 3V15C5.00002 15.5523 5.44775 16 6.00002 16H12C12.5523 16 13 15.5523 13 15V3C13 2.44772 12.5523 2 12 2H6.00002Z"
                    fill="currentColor"
                  />
                </svg>

                <span className="ms-3">Admin</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;