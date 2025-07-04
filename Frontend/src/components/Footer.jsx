import { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useTranslation } from "react-i18next"; // for multilinguality

const Footer = () => {
  const { t } = useTranslation(); // for multilinguality
  const [email, setEmail] = useState("");

  //Currently storing user email in localstorage
  const handleSubscribe = () => {
    if (email.trim() !== "") {
      localStorage.setItem("subscribedEmail", email);
      alert(t("subscribe_success")); 
      setEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-r from-[#4a7cbd] via-[#5b4fd3] to-[#9377ff] w-full pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="text-white mr-3">
                <svg
                  className="w-10 h-10"
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
              <h3 className="text-2xl font-bold text-white">{t("footer_brand")}</h3>
            </div>
            <p className="text-white/90">
              {t("footer_tagline")}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5 text-white cursor-pointer hover:text-cyan-200 transition-all duration-200 transform hover:scale-110" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5 text-white cursor-pointer hover:text-cyan-200 transition-all duration-200 transform hover:scale-110" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 text-white cursor-pointer hover:text-cyan-200 transition-all duration-200 transform hover:scale-110" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 text-white cursor-pointer hover:text-cyan-200 transition-all duration-200 transform hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("footer_quick_links")}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-white/90 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  {t("footer_about_us")}
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-white/90 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  {t("footer_features")}
                </a>
              </li>
              <li>
                <a
                  href="#howItWorks"
                  className="text-white/90 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  {t("footer_how_it_works")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("footer_contact")}</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-white/90 hover:text-white group transition-colors duration-200">
                <Mail className="w-4 h-4 mr-2 group-hover:text-cyan-200" />
                {t("footer_email")}
              </li>
              <li className="flex items-center text-white/90 hover:text-white group transition-colors duration-200">
                <Phone className="w-4 h-4 mr-2 group-hover:text-cyan-200" />
                {t("footer_phone")}
              </li>
              <li className="flex items-center text-white/90 hover:text-white group transition-colors duration-200">
                <MapPin className="w-4 h-4 mr-2 group-hover:text-cyan-200" />
                {t("footer_address")}
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("footer_newsletter_title")}</h4>
            <p className="text-white/90 mb-4">
              {t("footer_newsletter_desc")}
            </p>
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer_newsletter_placeholder")}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 transition-all duration-200 outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                onClick={handleSubscribe}
                className="w-full px-4 py-2 rounded-md bg-white text-blue-600 font-medium hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105"
              >
                {t("footer_newsletter_button")}
              </button>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/20 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white/90 text-sm">
          <p>© {new Date().getFullYear()} {t("footer_brand")}. {t("footer_rights")}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
            >
              {t("footer_privacy_policy")}
            </a>
            <a
              href="#"
              className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
            >
              {t("footer_terms_of_service")}
            </a>
            <a
              href="#"
              className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
            >
              {t("footer_cookie_policy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
