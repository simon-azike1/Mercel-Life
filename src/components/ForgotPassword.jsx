import React, { useState } from "react";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const API_BASE_URL = "https://mercel-life-1.onrender.com";

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    // Validation
    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      setIsSuccess(true);
      
      // Log the reset URL in development
      if (data.resetUrl) {
        console.log("Password Reset URL:", data.resetUrl);
        alert(`Development Mode - Reset URL: ${data.resetUrl}`);
      }

    } catch (error) {
      console.error("Forgot password error:", error);
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-4">
              If an account with that email exists, we've sent you a password reset link.
            </p>
            <p className="text-sm text-gray-500">
              The link will expire in 10 minutes for security reasons.
            </p>
          </div>
          
          <button 
            onClick={() => window.location.href = '/login'}
            className="w-full bg-gradient-to-r from-gray-800 to-green-700 hover:from-gray-900 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-green-800 p-6 text-center">
          <div className="mx-auto w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Reset Password</h1>
          <p className="text-green-100 text-sm">Enter your email to receive a reset link</p>
        </div>

        {/* Form */}
        <div className="p-6">
          {errors.general && (
            <div className="flex items-center gap-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">{errors.general}</span>
            </div>
          )}

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({});
                  }}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-10 pr-3 py-3 text-sm bg-white border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200 text-red-900"
                      : "border-gray-300 hover:border-gray-400 focus:border-green-500 focus:ring-green-200 text-gray-900"
                  }`}
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 px-4 text-sm font-semibold rounded-lg transition-all ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-gray-800 to-green-700 hover:from-gray-900 hover:to-green-800"
              } text-white`}
            >
              {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
            </button>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <button
              onClick={() => window.location.href = '/login'}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;