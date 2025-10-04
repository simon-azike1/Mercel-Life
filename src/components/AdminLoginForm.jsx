import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle, CheckCircle } from "lucide-react";
import { useTheme } from './ThemeContext';

const AdminLogin = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Login failed (${response.status})`);
      }

      setLoginSuccess(true);

      const storage = formData.rememberMe ? localStorage : sessionStorage;

      if (data.token) {
        storage.setItem("authToken", data.token);
        if (formData.rememberMe && data.expiresIn) {
          const expiryTime = new Date(Date.now() + data.expiresIn * 1000);
          localStorage.setItem("tokenExpiry", expiryTime.toISOString());
        }
      }

      if (data.user) {
        storage.setItem("user", JSON.stringify(data.user));
      }

      setTimeout(() => {
        window.location.href = "/admin";
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = error.message.includes("Failed to fetch")
        ? "Unable to connect to server. Check your internet."
        : error.message;

      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  // Success Screen with Theme
  if (loginSuccess) {
    return (
      <div className={`
        min-h-screen flex items-center justify-center p-4 transition-colors duration-300
        ${isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }
      `}>
        <div className={`
          rounded-2xl p-8 w-full max-w-md text-center transition-all duration-300
          ${isDarkMode 
            ? 'bg-gray-800 shadow-2xl shadow-black/50 border border-gray-700' 
            : 'bg-white shadow-2xl shadow-gray-300/50 border border-gray-200'
          }
        `}>
          <div className="mb-6">
            <div className={`
              mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300
              ${isDarkMode ? 'bg-green-400/20' : 'bg-green-100'}
            `}>
              <CheckCircle className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h2 className={`
              text-2xl font-bold mb-2 transition-colors duration-300
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}>
              Welcome Back!
            </h2>
            <p className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Login successful. Redirecting to dashboard...
            </p>
          </div>
          <div className={`
            animate-spin mx-auto w-8 h-8 border-4 rounded-full
            ${isDarkMode 
              ? 'border-gray-600 border-t-green-400' 
              : 'border-blue-200 border-t-blue-600'
            }
          `}></div>
        </div>
      </div>
    );
  }

  // Main Login Form with Theme
  return (
    <div className={`
      min-h-screen mt-10 flex items-center justify-center p-4 transition-colors duration-300
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
        : 'bg-gradient-to-br from-gray-100 via-gray-50 to-green-50'
      }
    `}>
      <div className={`
        rounded-2xl overflow-hidden w-full max-w-md transition-all duration-300
        ${isDarkMode 
          ? 'bg-gray-800 shadow-2xl shadow-black/50 border border-gray-700' 
          : 'bg-white shadow-2xl shadow-gray-300/50 border border-gray-200'
        }
      `}>
        
        {/* Enhanced Header with Theme */}
        <div className={`
          p-6 text-center transition-colors duration-300
          ${isDarkMode 
            ? 'bg-gradient-to-r from-gray-800 to-green-700' 
            : 'bg-gradient-to-r from-gray-900 to-green-800'
          }
        `}>
          <div className={`
            mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors duration-300
            ${isDarkMode ? 'bg-white/10 backdrop-blur-sm' : 'bg-white/20 backdrop-blur-sm'}
          `}>
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Admin Portal</h1>
          <p className={`text-sm ${isDarkMode ? 'text-green-200' : 'text-green-100'}`}>
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Form with Theme Support */}
        <div className="p-6 space-y-5">
          
          {/* Error Message with Theme */}
          {errors.general && (
            <div className={`
              flex items-center gap-3 text-sm p-3 rounded-lg border transition-colors duration-300
              ${isDarkMode 
                ? 'text-red-400 bg-red-900/20 border-red-800' 
                : 'text-red-600 bg-red-50 border-red-200'
              }
            `}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">{errors.general}</span>
            </div>
          )}

          {/* Email Field with Theme */}
          <div>
            <label htmlFor="email" className={`
              block text-sm font-semibold mb-2 transition-colors duration-300
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}>
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              </div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`
                  w-full pl-10 pr-3 py-3 text-sm border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2
                  ${errors.email
                    ? isDarkMode
                      ? "border-red-500 bg-red-900/20 focus:border-red-400 focus:ring-red-400/20 text-red-400"
                      : "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200 text-red-900"
                    : isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 hover:border-gray-500 focus:border-green-400 focus:ring-green-400/20"
                    : "bg-white border-gray-300 text-gray-900 hover:border-gray-400 focus:border-green-500 focus:ring-green-200"
                  }
                `}
                placeholder="Enter your admin email"
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className={`mt-1 text-xs ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field with Theme */}
          <div>
            <label htmlFor="password" className={`
              block text-sm font-semibold mb-2 transition-colors duration-300
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}>
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`
                  w-full pl-10 pr-10 py-3 text-sm border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2
                  ${errors.password
                    ? isDarkMode
                      ? "border-red-500 bg-red-900/20 focus:border-red-400 focus:ring-red-400/20 text-red-400"
                      : "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200 text-red-900"
                    : isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 hover:border-gray-500 focus:border-green-400 focus:ring-green-400/20"
                    : "bg-white border-gray-300 text-gray-900 hover:border-gray-400 focus:border-green-500 focus:ring-green-200"
                  }
                `}
                placeholder="Enter your password"
                autoComplete="current-password"
                onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`
                  absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300
                  ${isDarkMode ? 'hover:text-gray-300' : 'hover:text-gray-600'}
                `}
              >
                {showPassword ? (
                  <EyeOff className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                ) : (
                  <Eye className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className={`mt-1 text-xs ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password with Theme */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
                className={`
                  w-4 h-4 rounded transition-colors duration-300
                  ${isDarkMode 
                    ? 'text-green-400 bg-gray-700 border-gray-600 focus:ring-green-400/20' 
                    : 'text-green-600 bg-white border-gray-300 focus:ring-green-200'
                  }
                `}
              />
              <span className={`
                ml-2 text-sm transition-colors duration-300
                ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
              `}>
                Remember me
              </span>
            </label>
            <button
              type="button"
              onClick={() => (window.location.href = "/forgot-password")}
              className={`
                text-sm font-medium transition-colors duration-300
                ${isDarkMode 
                  ? 'text-green-400 hover:text-green-300' 
                  : 'text-green-600 hover:text-green-700'
                }
              `}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button with Enhanced Theme */}
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className={`
              w-full py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4
              ${isLoading
                ? isDarkMode
                  ? "bg-gray-600 cursor-not-allowed text-gray-400"
                  : "bg-gray-400 cursor-not-allowed text-gray-200"
                : isDarkMode
                ? "bg-gradient-to-r from-gray-700 to-green-600 hover:from-gray-600 hover:to-green-500 text-white shadow-lg hover:shadow-xl focus:ring-green-400/20"
                : "bg-gradient-to-r from-gray-800 to-green-700 hover:from-gray-900 hover:to-green-800 text-white shadow-lg hover:shadow-xl focus:ring-green-500/20"
              }
            `}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className={`
                  animate-spin w-4 h-4 border-2 rounded-full
                  ${isDarkMode ? 'border-gray-400 border-t-transparent' : 'border-gray-200 border-t-transparent'}
                `}></div>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>

          {/* Additional Security Note */}
          <div className={`
            text-center text-xs pt-2 transition-colors duration-300
            ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          `}>
            <Shield className="w-3 h-3 inline mr-1" />
            Secure admin access protected by encryption
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
