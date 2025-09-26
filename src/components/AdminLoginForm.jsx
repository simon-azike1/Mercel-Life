import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle, CheckCircle } from "lucide-react";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Min 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (formData.email === "admin@portfolio.com" && formData.password === "admin123") {
        setLoginSuccess(true);
        setTimeout(() => console.log("Redirecting..."), 1000);
      } else {
        setErrors({ general: "Invalid email or password" });
      }
    } catch {
      setErrors({ general: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="bg-white rounded-2xl shadow p-6 w-full max-w-sm text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-900">Welcome Back!</h2>
          <p className="text-gray-600">Login successful. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-green-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-green-800 p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Admin Portal</h1>
          <p className="text-green-100 text-sm">Sign in to manage your portfolio</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.general && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{errors.general}</span>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-2 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={e => handleChange("email", e.target.value)}
                className={`w-full pl-8 pr-3 py-2 border rounded ${
                  errors.email ? "border-red-400 bg-red-50" : "border-gray-300"
                } focus:ring-2 focus:ring-green-200 focus:border-green-500`}
                placeholder="Enter email"
              />
            </div>
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-2 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={e => handleChange("password", e.target.value)}
                className={`w-full pl-8 pr-8 py-2 border rounded ${
                  errors.password ? "border-red-400 bg-red-50" : "border-gray-300"
                } focus:ring-2 focus:ring-green-200 focus:border-green-500`}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={e => handleChange("rememberMe", e.target.checked)}
                className="w-4 h-4 border rounded"
              />
              Remember me
            </label>
            <button type="button" className="text-green-600 hover:underline">Forgot password?</button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded text-white font-medium ${
              isLoading ? "bg-gray-400" : "bg-gradient-to-r from-gray-800 to-green-700 hover:from-gray-900 hover:to-green-800"
            }`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* Demo Credentials */}
          <div className="mt-4 text-sm text-gray-700">
            <p><strong>Email:</strong> admin@portfolio.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
