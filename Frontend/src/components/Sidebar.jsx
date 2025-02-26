import { Link } from "react-router-dom";
import { RiDonutChartFill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <>
      <nav className="fixed top-0 z-50 h-[60px]  w-full bg-white border-b border-gray-200 dark:bg-black dark:border-gray-700">
        <div className="p-[15px] h-full lg:px-5 lg:pl-3 ">
          <div className="flex items-center justify-between">
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
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to="/" className="flex ms-2 md:me-24">
                <img
                  src="./image.png"
                  className="h-8 me-3"
                  alt="Drive-thru Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Drive-thru
                </span>
              </Link>
            </div>
            <div className="flex items-center">
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
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-[#1877F2] divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-lg text-white dark:text-white"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      className="text-lg font-medium text-white truncate dark:text-gray-300"
                      role="none"
                    >
                      Drive-thru@Drive-thru.com
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
                        className="block px-4 py-2 text-lg text-white hover:bg-[#37A0EA] dark:text-gray-300 dark:hover:bg-[##37A0EA] dark:hover:text-white"
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
                      <Link
                        to="#"
                        className="block px-4 py-2 text-lg text-white hover:bg-[#37A0EA] dark:text-gray-300 dark:hover:bg-[#37A0EA] dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </Link>
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
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-[60px] transition-transform -translate-x-full bg-[##1877F2] border-r border-gray-200 sm:translate-x-0 dark:bg-[#1877F2] dark:border-gray-700"
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
                    d="M2.31763 16.0834C1.93846 16.0834 1.60669 15.9372 1.32231 15.6449C1.03794 15.3527 0.895752 15.0248 0.895752 14.6615V2.33856C0.895752 1.97519 1.03794 1.64737 1.32231 1.3551C1.60669 1.06282 1.93846 0.916687 2.31763 0.916687H8.97674L10.3986 2.33856H18.4322C18.7956 2.33856 19.1234 2.4847 19.4157 2.77697C19.7079 3.06925 19.8541 3.39707 19.8541 3.76044V14.6615C19.8541 15.0248 19.7079 15.3527 19.4157 15.6449C19.1234 15.9372 18.7956 16.0834 18.4322 16.0834H2.31763ZM9.4033 13.0026H16.9866V12.5524C16.9866 11.8888 16.6509 11.3477 15.9795 10.9291C15.308 10.5104 14.3799 10.3011 13.195 10.3011C12.0101 10.3011 11.0819 10.5104 10.4105 10.9291C9.73903 11.3477 9.4033 11.8888 9.4033 12.5524V13.0026ZM13.195 8.87919C13.6689 8.87919 14.0757 8.70935 14.4154 8.36968C14.7551 8.03001 14.9249 7.6232 14.9249 7.14924C14.9249 6.67528 14.7551 6.26847 14.4154 5.9288C14.0757 5.58913 13.6689 5.41929 13.195 5.41929C12.721 5.41929 12.3142 5.58913 11.9745 5.9288C11.6349 6.26847 11.465 6.67528 11.465 7.14924C11.465 7.6232 11.6349 8.03001 11.9745 8.36968C12.3142 8.70935 12.721 8.87919 13.195 8.87919Z"
                    fill="white"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Shared with me
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center p-2 pt-4 pb-4 text-white rounded-lg dark:text-white hover:bg-[#37A0EA] dark:hover:bg-[#37A0EA] group"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M5 3h2v18H5V3zm6 6h2v12h-2V9zm6-4h2v16h-2V5z" />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Statistics
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center p-2 pt-4 pb-4 text-white rounded-lg dark:text-white hover:bg-[#37A0EA] dark:hover:bg-[#37A0EA] group"
              >
                <svg
                  className="w-5 h-5 text-white dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">My files</span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center p-2 pt-4 pb-4 text-white rounded-lg dark:text-white hover:bg-[#37A0EA] dark:hover:bg-[#37A0EA] group"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.19471 18.9791L7.72075 15.9932C7.42058 15.8826 7.10461 15.7325 6.77284 15.5429C6.44106 15.3534 6.14879 15.1559 5.89601 14.9505L3.09966 16.2302L0.895752 12.3437L3.45513 10.4716C3.42353 10.3294 3.40378 10.1675 3.39588 9.98579C3.38798 9.8041 3.38403 9.64217 3.38403 9.49998C3.38403 9.35779 3.38798 9.19586 3.39588 9.01417C3.40378 8.83249 3.42353 8.67055 3.45513 8.52837L0.895752 6.65623L3.09966 2.76977L5.89601 4.04946C6.14879 3.84408 6.44106 3.64659 6.77284 3.45701C7.10461 3.26743 7.42058 3.12524 7.72075 3.03045L8.19471 0.020813H12.5551L13.0291 3.00675C13.3293 3.11734 13.6492 3.26348 13.9889 3.44516C14.3285 3.62685 14.6168 3.82828 14.8538 4.04946L17.6502 2.76977L19.8541 6.65623L17.2947 8.48097C17.3263 8.63896 17.3461 8.80879 17.354 8.99048C17.3619 9.17216 17.3658 9.34199 17.3658 9.49998C17.3658 9.65797 17.3619 9.82385 17.354 9.99764C17.3461 10.1714 17.3263 10.3373 17.2947 10.4953L19.8541 12.3437L17.6502 16.2302L14.8538 14.9505C14.601 15.1559 14.3127 15.3573 13.9889 15.5548C13.665 15.7523 13.3451 15.8984 13.0291 15.9932L12.5551 18.9791H8.19471ZM10.3749 12.5807C11.228 12.5807 11.9548 12.2805 12.5551 11.6802C13.1555 11.0798 13.4556 10.3531 13.4556 9.49998C13.4556 8.64686 13.1555 7.92012 12.5551 7.31977C11.9548 6.71942 11.228 6.41925 10.3749 6.41925C9.52179 6.41925 8.79506 6.71942 8.19471 7.31977C7.59436 7.92012 7.29419 8.64686 7.29419 9.49998C7.29419 10.3531 7.59436 11.0798 8.19471 11.6802C8.79506 12.2805 9.52179 12.5807 10.3749 12.5807Z"
                    fill="white"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center p-2 pt-4 pb-4 text-white rounded-lg dark:text-white hover:bg-[#37A0EA] dark:hover:bg-[#37A0EA] group"
              >
                <svg
                  className="w-5 h-5 text-white dark:text-white self-center"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Trash</span>
              </Link>
            </li>
          </ul>
          <div className="mt-6 p-4 rounded-lg  text-white">
            {/* Cloud Icon + Title */}
            <div className="flex items-center">
              <svg
                class="w-7 h-7 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.383 4.076a6.5 6.5 0 0 0-6.887 3.95A5 5 0 0 0 7 18h3v-4a2 2 0 0 1-1.414-3.414l2-2a2 2 0 0 1 2.828 0l2 2A2 2 0 0 1 14 14v4h4a4 4 0 0 0 .988-7.876 6.5 6.5 0 0 0-5.605-6.048Z" />
                <path d="M12.707 9.293a1 1 0 0 0-1.414 0l-2 2a1 1 0 1 0 1.414 1.414l.293-.293V19a1 1 0 1 0 2 0v-6.586l.293.293a1 1 0 0 0 1.414-1.414l-2-2Z" />
              </svg>

              <span className="ml-2 font-semibold">My Storage</span>
            </div>
            {/* Usage Text & Progress Bar */}
            <p className="mt-2 text-lg">Used: of 100GB</p>
            <div className="w-full bg-white rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "24%" }}
              ></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
