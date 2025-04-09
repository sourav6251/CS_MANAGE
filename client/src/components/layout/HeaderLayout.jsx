import React from "react";
import Header from "../common/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sliedbar";

export const HeaderLayout = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
  {/* Header - Fixed height */}
  <Header />

  {/* Main section: Sidebar + Main Content */}
  <div className="flex flex-1 overflow-hidden">
    {/* Sidebar - Fixed width */}
    <Sidebar />

    {/* Main Content - Scrollable if tall */}
    <main className="flex-1 overflow-y-auto p-4">
      <Outlet />
    </main>
  </div>
</div>

    );
};