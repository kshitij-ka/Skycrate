import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      {/* Placeholder SVG - Replace this with your SVG */}
      <img
        src="/404.png"
        style={{ width: "30%", height: "auto" }}
        alt="404 Not Found"
      ></img>
      {/* Page number and title */}
      <h2 className="text-2xl font-bold mb-4 mt-4">Page Not Found</h2>

      {/* Description text */}
      <p className="text-center text-gray-700 mb-6">
        Sorry, we couldn&apos;t find the page you were looking for. It may have
        been moved or deleted.
      </p>

      {/* Call-to-action button */}
      <Link
        to="/"
        className="px-6 py-2 bg-[#1877F2] text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
