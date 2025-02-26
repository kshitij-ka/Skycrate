import React from "react";
import Footer from "../../components/Footer";
{
  /* <img src="vector.png" alt="" className="h-100" /> */
}

const DrivethruLandingPage = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <div className="bg-white min-h-screen flex items-center relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="hidden md:block md:w-1/2 lg:w-3/5"></div>

            <div className="w-full mt-70  md:w-1/2 lg:w-2/5 max-w-lg bg-transparent">
              <div className="flex items-center mb-8">
                <div className="text-cyan-400 mr-3">
                  <svg
                    className="w-12 h-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L2 12L12 22L22 12L12 2Z"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </div>
                <h1 className="text-5xl font-bold text-black">Drive-thru</h1>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-black">
                Store, Access & Share Your Files — Anytime, Anywhere!
              </h2>

              <p className="text-gray-800 mb-10 text-lg">
                A simple, secure, and fast cloud storage solution for all your
                files. Upload, organize, and access with ease.
              </p>

              <div className="flex flex-row space-x-4">
                <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition-colors duration-200 shadow-md">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors duration-200 shadow-md">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-24">
            {" "}
            <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center md:justify-end">
              <img
                src="./He.png"
                alt="Person using Drive-thru on laptop"
                className="mx h-auto max-w-full"
              />
            </div>
            {/* Features Card */}
            <div className="w-full md:w-1/2 lg:w-3/5 mb-12 md:mb-0">
              <div className="bg-blue-100 rounded-3xl p-8 md:p-10 shadow-lg">
                <h2 className="text-3xl font-bold mb-8">Key Features</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="text-emerald-500 mr-3 mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">
                      "Easy Upload & Access" – Drag & drop, instant access.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="text-emerald-500 mr-3 mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">
                      "Secure & Private" – End-to-end encryption.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="text-emerald-500 mr-3 mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">
                      "Seamless Sharing" – Share files with one click.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="text-emerald-500 mr-3 mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">
                      "Access Anywhere" – Works on all devices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="flex flex-col md:flex-row-reverse items-center justify-between">
            {/* Person with Phone Image */}
            <div className="w-full md:w-1/2 lg:w-2/5 mb-12 md:mb-0 flex justify-center md:justify-start">
              <img
                src="./She.png"
                alt="Person using Drive-thru on phone"
                className="h-auto max-w-full"
              />
            </div>

            {/* How It Works Card */}
            <div className="w-full md:w-1/2 lg:w-3/5">
              <div className="bg-blue-100 rounded-3xl p-8 md:p-10 shadow-lg">
                <h2 className="text-3xl font-bold mb-8">How It Works</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="text-emerald-500 mr-3 mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">
                      Create an account – Sign up in seconds.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="text-emerald-500 mr-3 mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">
                      Upload files – Drag & drop or select from your device.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="text-emerald-500 mr-3 mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">
                      Manage files – Rename, move, or delete easily.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="text-emerald-500 mr-3 mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">
                      Access anytime – Open files from any device.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DrivethruLandingPage;
