import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_URL;

const PasswordForDownload = ({ filename, onDownload, onClose }) => {
  const currentPath = useSelector((state) => state.path?.currentPath);
  const username = localStorage.getItem("username") || "";
  const userRoot = `/${username}`;

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [downloadMethod, setDownloadMethod] = useState("curl-like");
  const [attempts, setAttempts] = useState([]);

  // Fixed: Use crypto.randomUUID() for unique IDs instead of Date.now()
  const addAttempt = (method, status, errorMsg = null) => {
    const newAttempt = {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,
      method,
      status,
      error: errorMsg,
      timestamp: new Date().toLocaleTimeString(),
    };
    setAttempts((prev) => [newAttempt, ...prev.slice(0, 4)]);
  };

  // Enhanced error handling and request debugging
  const handleDownload = async (method = "curl-like") => {
    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("accessToken");

      // Check if token exists
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      let response;
      let requestDetails = {};

      if (method === "curl-like") {
        // Method 1: Try to replicate curl as closely as possible using XMLHttpRequest
        // This allows us to send GET request with body (which fetch() doesn't allow)
        requestDetails = {
          url: `${API_URL}/api/files/download`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: {
            filename: filename,
            password: password,
          },
        };

        console.log(
          "Download request details (GET with JSON body via XMLHttpRequest - curl-like):",
          {
            url: requestDetails.url,
            method: requestDetails.method,
            headers: requestDetails.headers,
            body: requestDetails.body,
          }
        );

        // Use XMLHttpRequest to allow GET with body (like curl)
        response = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", requestDetails.url);

          // Set headers
          Object.entries(requestDetails.headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });

          xhr.responseType = "blob"; // Expect binary data

          xhr.onload = function () {
            // Create a response-like object to maintain compatibility
            const response = {
              ok: xhr.status >= 200 && xhr.status < 300,
              status: xhr.status,
              statusText: xhr.statusText,
              headers: {
                get: (name) => xhr.getResponseHeader(name),
                entries: () => {
                  const headers = {};
                  const allHeaders = xhr.getAllResponseHeaders();
                  allHeaders.split("\r\n").forEach((line) => {
                    const parts = line.split(": ");
                    if (parts.length === 2) {
                      headers[parts[0].toLowerCase()] = parts[1];
                    }
                  });
                  return Object.entries(headers);
                },
              },
              blob: async () => xhr.response,
              json: async () => JSON.parse(xhr.responseText),
              text: async () => xhr.responseText,
            };
            resolve(response);
          };

          xhr.onerror = function () {
            reject(new Error(`Network error: ${xhr.status} ${xhr.statusText}`));
          };

          // Send JSON body with GET request (like curl)
          xhr.send(JSON.stringify(requestDetails.body));
        });
      } else if (method === "body") {
        // Method 2: POST with body (original method)
        requestDetails = {
          url: `${API_URL}/api/files/download`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/octet-stream, application/json",
          },
          body: {
            filename: filename,
            password: password,
          },
        };

        console.log("Download request details (POST with body):", {
          url: requestDetails.url,
          method: requestDetails.method,
          headers: requestDetails.headers,
          body: requestDetails.body,
        });

        response = await fetch(requestDetails.url, {
          method: "POST",
          headers: requestDetails.headers,
          body: JSON.stringify(requestDetails.body),
        });
      } else {
        // Method 3: GET with URL parameters (no body)
        const urlParams = new URLSearchParams({
          filename: filename,
          password: password,
        });
        const url = `${API_URL}/api/files/download?${urlParams.toString()}`;

        requestDetails = {
          url: url,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/octet-stream, application/json",
          },
        };

        console.log("Download request details (GET with params):", {
          url: requestDetails.url,
          method: requestDetails.method,
          headers: requestDetails.headers,
        });

        response = await fetch(url, {
          method: "GET",
          headers: requestDetails.headers,
        });
      }

      addAttempt(method, response.status);

      // Enhanced error handling
      if (!response.ok) {
        let errorText = "";
        const contentType = response.headers.get("content-type");

        try {
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errorText =
              errorData.message || errorData.error || JSON.stringify(errorData);
          } else {
            errorText = await response.text();
          }
        } catch (e) {
          errorText = `Failed to parse error response: ${e.message}`;
        }

        let errorMessage = `HTTP ${response.status}`;

        switch (response.status) {
          case 401:
            errorMessage =
              "Authentication failed - Your session may have expired. Please log in again.";
            // Clear invalid token
            localStorage.removeItem("accessToken");
            break;
          case 403:
            errorMessage =
              "Access denied - This could be due to:\n• Incorrect password\n• Insufficient permissions\n• File access restrictions";
            break;
          case 404:
            errorMessage = "File not found at the specified path";
            break;
          case 422:
            errorMessage =
              "Invalid request data - Check file path and parameters";
            break;
          case 500:
            errorMessage = "Server error - Please try again later";
            break;
          default:
            errorMessage = `Request failed with status ${response.status}`;
        }

        if (errorText && errorText.length < 200) {
          errorMessage += `\n\nServer response: ${errorText}`;
        }

        addAttempt(method, response.status, errorMessage);
        throw new Error(errorMessage);
      }

      // Check if response is actually a file
      const contentType = response.headers.get("content-type");
      const contentLength = response.headers.get("content-length");

      console.log("Response headers:", {
        contentType,
        contentLength,
        allHeaders: Object.fromEntries(response.headers.entries()),
      });

      const blob = await response.blob();

      if (blob.size === 0) {
        throw new Error("Downloaded file is empty");
      }

      // Enhanced download with proper filename handling
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Try to get filename from Content-Disposition header if available
      const disposition = response.headers.get("content-disposition");
      let downloadFilename = filename;

      if (disposition && disposition.includes("filename=")) {
        const filenameMatch = disposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        );
        if (filenameMatch && filenameMatch[1]) {
          downloadFilename = filenameMatch[1].replace(/['"]/g, "");
        }
      }

      a.download = downloadFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      addAttempt(method, 200, "Download successful");
      onDownload();
      onClose();
    } catch (err) {
      const errorMessage = err.message || "Download failed";
      console.error("Download error:", err);
      setError(errorMessage);
      addAttempt(method, "ERROR", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 200) return "text-green-600";
    if (status === "ERROR") return "text-red-600";
    if (status >= 400) return "text-red-600";
    return "text-yellow-600";
  };

  const getStatusIcon = (status) => {
    if (status === 200) return "✅";
    if (status === "ERROR") return "❌";
    if (status >= 400) return "🚫";
    return "⚠️";
  };

  // Enhanced token validation
  const token = localStorage.getItem("accessToken");
  const tokenStatus = token
    ? token.length > 20
      ? "Valid format"
      : "Invalid format"
    : "Missing";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
          <h3 className="text-lg font-semibold">🔐 Secure Download</h3>
          <p className="text-blue-100 text-sm mt-1">
            Enter your password to download the file
          </p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Token Warning */}
          {!token && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <p className="text-red-700 text-sm">
                  Authentication token is missing. Please log in again.
                </p>
              </div>
            </div>
          )}

          {/* File Information */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">📄</span>
              <div>
                <p className="font-medium text-gray-800">{filename}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-mono">{currentPath || userRoot}</span>
                </p>
              </div>
            </div>

            {/* Debug Toggle */}
            <button
              onClick={() => setShowDebugInfo(!showDebugInfo)}
              className="text-xs text-blue-600 hover:text-blue-800 mt-2"
            >
              {showDebugInfo ? "Hide" : "Show"} Debug Info
            </button>
          </div>

          {/* Enhanced Debug Information */}
          {showDebugInfo && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <h4 className="font-medium text-yellow-800 mb-2">
                🔧 Debug Information
              </h4>
              <div className="text-xs space-y-1">
                <p>
                  <strong>User:</strong>{" "}
                  <span className="font-mono">{username}</span>
                </p>
                <p>
                  <strong>Current Path:</strong>{" "}
                  <span className="font-mono">{currentPath || "null"}</span>
                </p>
                <p>
                  <strong>Full Path:</strong>{" "}
                  <span className="font-mono">
                    {(currentPath || userRoot) + "/" + filename}
                  </span>
                </p>
                <p>
                  <strong>API URL:</strong>{" "}
                  <span className="font-mono">{API_URL}</span>
                </p>
                <p>
                  <strong>Token Status:</strong>{" "}
                  <span
                    className={`font-mono ${
                      token ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tokenStatus}
                  </span>
                </p>
                {token && (
                  <p>
                    <strong>Token Preview:</strong>{" "}
                    <span className="font-mono text-xs">
                      {token.substring(0, 20)}...
                    </span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Download Method Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Download Method
            </label>
            <div className="flex space-x-2 flex-wrap">
              <button
                onClick={() => setDownloadMethod("curl-like")}
                className={`px-3 py-2 rounded text-sm mb-2 ${
                  downloadMethod === "curl-like"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                POST + JSON Body (curl-like) ✓
              </button>
              <button
                onClick={() => setDownloadMethod("body")}
                className={`px-3 py-2 rounded text-sm mb-2 ${
                  downloadMethod === "body"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                POST with Body
              </button>
              <button
                onClick={() => setDownloadMethod("url")}
                className={`px-3 py-2 rounded text-sm mb-2 ${
                  downloadMethod === "url"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                GET with Params
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {downloadMethod === "curl-like" &&
                "✓ Recommended: Uses POST with same data structure as your working curl command"}
              {downloadMethod === "body" && "Original POST method"}
              {downloadMethod === "url" && "GET with URL parameters"}
            </p>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" &&
                !loading &&
                token &&
                handleDownload(downloadMethod)
              }
              disabled={loading}
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-0.5">⚠️</span>
                <div className="flex-1">
                  <p className="text-red-700 text-sm whitespace-pre-wrap">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Attempt History */}
          {attempts.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                📊 Recent Attempts
              </h4>
              <div className="space-y-2">
                {attempts.map((attempt) => (
                  <div key={attempt.id} className="bg-gray-50 rounded p-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span>{getStatusIcon(attempt.status)}</span>
                        <span className="text-xs font-mono">
                          {attempt.method}
                        </span>
                        <span
                          className={`text-xs ${getStatusColor(
                            attempt.status
                          )}`}
                        >
                          {attempt.status}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {attempt.timestamp}
                      </span>
                    </div>
                    {attempt.error && (
                      <p className="text-xs text-red-600 mt-1 ml-6 whitespace-pre-wrap">
                        {attempt.error}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>

          <div className="flex space-x-2">
            <button
              onClick={() => handleDownload(downloadMethod)}
              disabled={loading || !password.trim() || !token}
              className={`px-6 py-2 text-white rounded-lg transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : !password.trim() || !token
                  ? "bg-gray-400 cursor-not-allowed"
                  : downloadMethod === "curl-like"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Downloading...
                </div>
              ) : (
                "Download"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PasswordForDownload.propTypes = {
  filename: PropTypes.string.isRequired,
  onDownload: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PasswordForDownload;
