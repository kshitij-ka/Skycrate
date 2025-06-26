import Footer from "../../components/Footer";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // for multilinguality

const DrivethruLandingPage = () => {
  const { t } = useTranslation(); // for multilinguality

  const features = [
    {
      title: t("feature_easy_upload_title"),
      description: t("feature_easy_upload_desc"),
      icon: (
         <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
          />
        </svg>
      ),
    },
    {
      title: t("feature_secure_title"),
      description: t("feature_secure_desc"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: t("feature_sharing_title"),
      description: t("feature_sharing_desc"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      ),
    },
    {
      title: t("feature_access_anywhere_title"),
      description: t("feature_access_anywhere_desc"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65"
          />
        </svg>
      ),
    },
  ];

  const howItWorks = [
    {
      title: t("how_create_account_title"),
      description: t("how_create_account_desc"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: t("how_upload_files_title"),
      description: t("how_upload_files_desc"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      ),
    },
    {
      title: t("how_manage_files_title"),
      description: t("how_manage_files_desc"),
      icon: (
       <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: t("how_access_anytime_title"),
      description: t("how_access_anytime_desc"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];


  // UseEffect and handle....click function to handle set and handle the animation of features..
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % features.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, features.length]);

  // Handle user interaction
  const handleFeatureClick = (index) => {
    setActiveIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const [activeIndex1, setActiveIndex1] = useState(0);
  const [isPaused1, setIsPaused1] = useState(false);

  useEffect(() => {
    if (!isPaused1) {
      const interval = setInterval(() => {
        setActiveIndex1((prevIndex) => (prevIndex + 1) % howItWorks.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused1, howItWorks.length]);

  const handleFeatureClick1 = (index) => {
    setActiveIndex1(index);
    setIsPaused1(true);
    setTimeout(() => setIsPaused1(false), 1000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Hero Section */}
      <div
        id="about"
        className="bg-gradient-to-r from-blue-50 to-white min-h-[90vh] flex items-center relative"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            {/* Left Side - Text Content */}
            <div className="w-full  md:w-1/2 text-center md:text-left order-1 md:order-1">
              <div className="flex justify-center md:justify-start items-center mb-6 lg:mb-8">
                <div className="text-cyan-400 mr-2 md:mr-3">
                  <svg
                    className="w-10 md:w-12 h-10 md:h-12"
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
                <h1 className="text-4xl md:text-5xl font-bold text-black">
                  {t("skycrate")}
                </h1>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-black">
                {t("hero_subtitle")}
              </h2>

              <p className="text-gray-800 mb-6 md:mb-10 text-base md:text-lg">
                {t("hero_desc")}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/signup"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full px-6 py-4 md:px-8 md:py-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t("get_started")}
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-6 py-4 md:px-8 md:py-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t("login")}
                </Link>
              </div>
            </div>
            {/* Right Side - Image */}
            <div className="w-full md:w-1/2 flex justify-center order-2 md:order-1">
              <div className="relative p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl max-w-xs sm:max-w-lg md:max-w-md lg:max-w-lvh">
                <img
                  src="/Dashboard.png"
                  alt="Skycrate Dashboard Interface"
                  className="w-full rounded-xl shadow-2xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 rounded-2xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="w-full max-w-5xl  mx-auto p-6 sm:p-8 bg-gray-100 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-8">{t("key_features")}</h2>
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side - Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/He.png"
              alt="Feature Illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Right Side - Feature List */}
          <div className="w-full md:w-1/2">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-5 border-2 rounded-lg cursor-pointer transition-all duration-500 ${
                    index === activeIndex
                      ? "border-blue-500 bg-white shadow-lg scale-105"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleFeatureClick(index)}
                >
                  <div className="flex items-center space-x-4">
                    {feature.icon}
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  {index === activeIndex && (
                    <p className="text-gray-600 mt-3 transition-opacity duration-500 opacity-100">
                      {feature.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div
        id="howItWorks"
        className="w-full max-w-5xl mx-auto p-6 sm:p-8 bg-gray-100 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-8">{t("how_it_works")}</h2>
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side - Feature List */}
          <div className="w-full md:w-1/2">
            <div className="space-y-6">
              {howItWorks.map((howItWork, index) => (
                <div
                  key={index}
                  className={`p-5 border-2 rounded-lg cursor-pointer transition-all duration-500 ${
                    index === activeIndex1
                      ? "border-blue-500 bg-white shadow-lg scale-105"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleFeatureClick1(index)}
                >
                  <div className="flex items-center space-x-4">
                    {howItWork.icon}
                    <h3 className="text-lg font-semibold">{howItWork.title}</h3>
                  </div>
                  {index === activeIndex1 && (
                    <p className="text-gray-600 mt-3 transition-opacity duration-500 opacity-100">
                      {howItWork.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/She.png"
              alt="Feature Illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DrivethruLandingPage;
