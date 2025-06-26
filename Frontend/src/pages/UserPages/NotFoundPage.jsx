import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // for multilinguality

const NotFoundPage = () => {
  const { t } = useTranslation(); // for multilinguality

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <img
        src="/404.png"
        style={{ width: "30%", height: "auto" }}
        alt="404 Not Found"
      />
      <h2 className="text-2xl font-bold mb-4 mt-4">{t("not_found_title")}</h2>
      <p className="text-center text-gray-700 mb-6">
        {t("not_found_description")}
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-[#1877F2] text-white rounded hover:bg-blue-600 transition duration-200"
      >
        {t("go_home")}
      </Link>
    </div>
  );
};

export default NotFoundPage;
