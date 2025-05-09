"use client";

import { useState, useRef, useEffect } from "react";
import Inventory from "@/components/manager/Inventory";
import Staff from "@/components/manager/Staff";
import Menu from "@/components/manager/Menu";
import TableReservation from "@/components/manager/TableReservation";
import { Package, User, Hamburger, CalendarCheck, GearSix } from "@phosphor-icons/react";
import { funnelSans, instrumentSerif } from "@/app/fonts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const tabs = [
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "staff", label: "Staff", icon: User },
  { id: "menu", label: "Menu", icon: Hamburger },
  { id: "reservations", label: "Table Reservations", icon: CalendarCheck },
  { id: "settings", label: "Settings", icon: GearSix },
];

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState("inventory");
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);
  const resizeRef = useRef(null);

  const ActiveComponent = {
    inventory: Inventory,
    staff: Staff,
    menu: Menu,
    reservations: TableReservation,
    settings: () => <div>Settings Component</div>,
  }[activeTab];

  // Load saved sidebar width on initial render
  useEffect(() => {
    const savedWidth = localStorage.getItem("sidebarWidth");
    if (savedWidth) {
      setSidebarWidth(parseInt(savedWidth, 10));
    }
  }, []);

  const startResizing = (mouseDownEvent) => {
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resize = (mouseMoveEvent) => {
    if (isResizing) {
      const newWidth = mouseMoveEvent.clientX;
      if (newWidth > 180 && newWidth < 400) {
        setSidebarWidth(newWidth);
        localStorage.setItem("sidebarWidth", newWidth.toString());
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  return (
    <div
      className={`flex h-screen overflow-hidden ${funnelSans.className}`}
      onMouseMove={resize}
      onMouseUp={stopResizing}
    >
      <aside
        ref={sidebarRef}
        className="bg-stone-800 text-stone-100 relative flex flex-col"
        style={{ width: `${sidebarWidth}px`, minWidth: `${sidebarWidth}px` }}
      >
        <div className="flex justify-center p-8">
          <h1
            className={`${instrumentSerif.className} text-2xl mb-4 mt-4 text-stone-100 text-center`}
          >
            Crown <em className="italic">Cuisine</em>
          </h1>
        </div>

        <nav className="flex flex-col w-full items-center">
          <TooltipProvider>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const buttonWidth = sidebarWidth - 48; // Full width minus padding
              
              return (
                <Tooltip key={tab.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-center mb-6 bg-stone-900 transition-all cursor-pointer ${
                        isActive
                          ? "bg-stone-950 text-stone-100"
                          : "text-stone-100 hover:bg-stone-900/50"
                      } rounded-lg`}
                      style={{ width: `${buttonWidth}px`, height: '100px' }}
                    >
                      <Icon size={24} weight="regular" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{tab.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>

        <div
          ref={resizeRef}
          className="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-stone-700 opacity-0 hover:opacity-100"
          onMouseDown={startResizing}
        />
      </aside>

      <main className="flex-1 overflow-y-auto bg-stone-300">
        <div className="p-12">
          <div className="bg-stone-100 rounded-xl shadow-sm p-6">
            <ActiveComponent />
          </div>
        </div>
      </main>
    </div>
  );
}
