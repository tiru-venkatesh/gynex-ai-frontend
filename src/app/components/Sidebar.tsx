import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/app/components/ui/utils";
import {
  LayoutDashboard,
  UploadCloud,
  FolderOpen,
  Zap,
  History,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide sidebar on landing and auth pages
  if (location.pathname === "/" || location.pathname === "/auth") return null;

  const handleLogout = () => {
    // TODO: add real logout logic (firebase / auth provider)
    console.log("User logged out");
    navigate("/auth");
  };

  const linkBase =
    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group";

  const activeLink =
    "bg-[#FAFAFA] text-[#F6A5C0] shadow-sm border border-[#F0F0F0]";

  const inactiveLink =
    "text-[#666666] hover:text-[#111111] hover:bg-[#FAFAFA]";

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-[#F0F0F0] flex flex-col z-40">

      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-[#F0F0F0]">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FADADD] to-[#F6A5C0] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            G
          </div>
          <span className="text-xl font-bold tracking-tight text-[#111111]">
            Gynex<span className="text-[#F6A5C0]">AI</span>
          </span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">

        {/* Platform */}
        <div className="text-xs font-semibold text-[#F6A5C0] uppercase tracking-wider mb-4 px-2">
          Platform
        </div>

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            cn(linkBase, isActive ? activeLink : inactiveLink)
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard?upload=true"
          className={() =>
            cn(
              linkBase,
              location.search.includes("upload")
                ? activeLink
                : inactiveLink
            )
          }
        >
          <UploadCloud className="w-5 h-5" />
          Upload File
        </NavLink>

        <NavLink
          to="/tools"
          className={({ isActive }) =>
            cn(linkBase, isActive ? activeLink : inactiveLink)
          }
        >
          <Zap className="w-5 h-5" />
          AI Tools
        </NavLink>

        {/* Data */}
        <div className="text-xs font-semibold text-[#F6A5C0] uppercase tracking-wider mt-8 mb-4 px-2">
          Data
        </div>

        <NavLink
          to="/files"
          className={({ isActive }) =>
            cn(linkBase, isActive ? activeLink : inactiveLink)
          }
        >
          <FolderOpen className="w-5 h-5" />
          My Files
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            cn(linkBase, isActive ? activeLink : inactiveLink)
          }
        >
          <History className="w-5 h-5" />
          History
        </NavLink>

        {/* Account */}
        <div className="text-xs font-semibold text-[#F6A5C0] uppercase tracking-wider mt-8 mb-4 px-2">
          Account
        </div>

        <NavLink
          to="/billing"
          className={({ isActive }) =>
            cn(linkBase, isActive ? activeLink : inactiveLink)
          }
        >
          <CreditCard className="w-5 h-5" />
          Billing
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(linkBase, isActive ? activeLink : inactiveLink)
          }
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-[#F0F0F0]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#666666] hover:bg-[#FAFAFA] hover:text-red-400 w-full transition-colors group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>
      </div>

    </aside>
  );
}
