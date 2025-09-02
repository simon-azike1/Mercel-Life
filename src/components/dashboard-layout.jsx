import  { useState } from "react";
import { Search, Bell, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CompanyDashboardSidebar } from "@/components/company/Sidebar";
import logo from "@/assets/logo.png";

export default function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-light to-primary-50/30">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-primary-100 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo.src || logo} alt="Company Logo" className="w-10 h-10 object-contain" />
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-4 flex-1 max-w-2xl mx-8">
            {/* Browse Talents Dropdown */}
            <div className="flex items-center space-x-1 text-text-dark">
              <span className="text-sm font-semibold font-inter">Browse Talents</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray h-4 w-4" />
              <Input
                placeholder="Search for Talent by skills, level, etc."
                className="pl-10 pr-4 h-11 border-primary-200 bg-bg-white text-sm placeholder-light-gray focus:border-primary focus:ring-primary-100 rounded-xl font-inter"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="icon"
              className="text-light-gray hover:text-primary hover:bg-primary-50 transition-colors duration-200"
            >
              <Edit3 className="h-5 w-5" />
            </Button>

            {/* Notification with badge */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-light-gray hover:text-primary hover:bg-primary-50 transition-colors duration-200"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-primary rounded-full flex items-center justify-center shadow-sm">
                <span className="text-xs text-white font-medium">1</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9 ring-2 ring-primary-100">
                <AvatarImage src="/placeholder.svg?height=36&width=36" />
                <AvatarFallback className="bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700 font-semibold">
                  IL
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold text-text-dark font-inter">Ibrahim Lukman</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <CompanyDashboardSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
