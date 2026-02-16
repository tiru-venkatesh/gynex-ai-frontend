import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { LandingPage } from "./pages/Landing";
import { AuthPage } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { ToolsPage } from "./pages/Tools";
import { WorkspacePage } from "./pages/Workspace";
import { Toaster } from "@/app/components/ui/sonner";

// Global styles for custom scrollbar
const GlobalStyles = () => (
  <style>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #FFFFFF;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #E5E7EB;
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #F6A5C0;
    }
    /* Hide scrollbar for Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  `}</style>
);

// Layout for authenticated pages
function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <Sidebar />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/workspace/:id" element={<WorkspacePage />} />
          {/* Mock Routes for sidebar links */}
          <Route path="/files" element={<Dashboard />} />
          <Route path="/history" element={<Dashboard />} />
          <Route path="/billing" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
