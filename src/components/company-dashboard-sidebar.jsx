import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  Settings,
  MessageCircleMore,
  MonitorIcon as MonitorCog,
  Users,
  Building2,
  Briefcase,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import onaminiLogo from "/onamini.svg";
import { cn } from "@/lib/utils";

// Custom icon component for Onamini logo
function OnaminiLogoIcon({ className }) {
  return (
    <img
      src={onaminiLogo || "/placeholder.svg"}
      alt="Onamini AI"
      className={cn("h-6 w-6 object-contain", className)}
      style={{ borderRadius: 4 }}
    />
  );
}

const navigation = [
  { name: "Dashboard", href: "/company-dashboard", icon: LayoutDashboard },
  { name: "Company Profile", href: "/company-dashboard/profile", icon: Building2 },
  { name: "Post Gigs", href: "/company-dashboard/post-gigs", icon: Briefcase },
  { name: "My Gigs", href: "/company-dashboard/my-gigs", icon: MonitorCog },
  { name: "Browse Talents", href: "/company-dashboard/browse-talents", icon: Users },
  { name: "Messages", href: "/company-dashboard/messages", icon: MessageCircleMore },
  { name: "Onamini AI", href: "/company-dashboard/onaminiai", icon: OnaminiLogoIcon },
  { name: "Earnings & Wallet", href: "/company-dashboard/payments", icon: CreditCard },
];

const bottomNavigation = [
  { name: "Help", href: "/help", icon: HelpCircle },
  { name: "Settings", href: "/settings", icon: Settings },
];

function NavItem({ name, href, icon: Icon, isActive, isCollapsed }) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full gap-x-3",
        isCollapsed ? "justify-center px-2" : "justify-start",
        isActive && "bg-primary/10 text-primary hover:bg-primary/20"
      )}
      asChild
      title={isCollapsed ? name : undefined}
    >
      <Link to={href}>
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!isCollapsed && <span className="truncate">{name}</span>}
      </Link>
    </Button>
  );
}

function SidebarContent({ isCollapsed }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex h-full flex-col gap-y-5">
      <nav className="flex flex-1 flex-col px-4 pt-10">
        <div className="space-y-4">
          {navigation.map((item) => (
            <NavItem
              key={item.name}
              {...item}
              isActive={currentPath === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
        <div className="mt-auto space-y-1 pt-10">
          {bottomNavigation.map((item) => (
            <NavItem key={item.name} {...item} isCollapsed={isCollapsed} />
          ))}
        </div>
      </nav>
    </div>
  );
}

export function CompanyDashboardSidebar({ isOpen, onClose, isCollapsed = false, onToggleCollapse }) {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden ${
          isOpen ? "block opacity-100" : "hidden opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] flex-col gap-y-5 overflow-y-auto border-r bg-white backdrop-blur-md px-1 transition-all duration-200 lg:top-16 lg:block",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          isCollapsed ? "lg:w-16" : "w-64"
        )}
        style={{ willChange: "transform, width" }}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-2">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <span className="sr-only">Close sidebar</span>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Desktop collapse toggle button */}
        {onToggleCollapse && (
          <div className="hidden lg:flex justify-end p-2 border-b border-gray-200">
            <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="h-8 w-8 hover:bg-gray-100">
              <span className="sr-only">{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        )}

        <SidebarContent isCollapsed={isCollapsed} />
      </div>
    </>
  );
}
