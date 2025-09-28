import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle, CheckCircle } from "lucide-react";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Updated to your working backend URL
  const API_BASE_URL = "https://mercel-life-1.onrender.com";

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({}); // Clear any previous errors

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      });

      const data = await response.json();

      // Handle errors first
      if (!response.ok) {
        throw new Error(data.message || `Login failed (${response.status})`);
      }

      // Login successful - your backend now returns the expected format
      setLoginSuccess(true);

      // Store authentication data
      if (data.token) {
        const storage = formData.rememberMe ? localStorage : sessionStorage;
        storage.setItem("authToken", data.token);
        
        // Store expiry time if provided
        if (formData.rememberMe && data.expiresIn) {
          const expiryTime = new Date(Date.now() + (data.expiresIn * 1000));
          localStorage.setItem("tokenExpiry", expiryTime.toISOString());
        }
      }

      // Store user info
      if (data.user) {
        const storage = formData.rememberMe ? localStorage : sessionStorage;
        storage.setItem("user", JSON.stringify(data.user));
      }

      // Show success message briefly then redirect
      setTimeout(() => {
        // Redirect to your admin page
        window.location.href = "/admin";
        // Or if using React Router: navigate("/admin");
      }, 1500);

    } catch (error) {
      console.error("Login error:", error);
      
      // Handle specific error cases for better UX
      let errorMessage = error.message;
      
      if (error.message.includes("Invalid email or password")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message.includes("Server error") || error.message.includes("500")) {
        errorMessage = "Server error. Please try again later.";
      } else if (error.message.includes("Failed to fetch")) {
        errorMessage = "Unable to connect to server. Please check your internet connection.";
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Login successful. Redirecting to dashboard...</p>
          </div>
          <div className="animate-spin mx-auto w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
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
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Admin Portal</h1>
          <p className="text-green-100 text-sm">Sign in to manage your portfolio</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {errors.general && (
            <div className="flex items-center gap-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">{errors.general}</span>
            </div>
          )}

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
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full pl-10 pr-3 py-3 text-sm bg-white border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200 text-red-900"
                    : "border-gray-300 hover:border-gray-400 focus:border-green-500 focus:ring-green-200 text-gray-900"
                }`}
                placeholder="Enter your admin email"
                autoComplete="email"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`w-full pl-10 pr-10 py-3 text-sm bg-white border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200 text-red-900"
                    : "border-gray-300 hover:border-gray-400 focus:border-green-500 focus:ring-green-200 text-gray-900"
                }`}
                placeholder="Enter your password"
                autoComplete="current-password"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            <button 
              type="button"
              onClick={() => window.location.href = '/forgot-password'}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className={`w-full py-3 px-4 text-sm font-semibold rounded-lg transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-800 to-green-700 hover:from-gray-900 hover:to-green-800"
            } text-white`}
          >
            {isLoading ? "Signing in..." : "Sign In to Dashboard"}
          </button>
        </div>

        {/* Development Helper */}
        <div className="p-4 bg-yellow-50 border-t text-xs text-yellow-800">
          <strong>API Endpoint:</strong> {API_BASE_URL}/auth/login
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;