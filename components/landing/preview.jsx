"use client";

import React, { useState, useRef, useEffect } from "react";
import { Package, User, Hamburger, CalendarCheck, GearSix, MagnifyingGlass } from "@phosphor-icons/react";
import { instrumentSerif } from "@/app/fonts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample data from components/manager/Staff.jsx
const staffMembers = [
  { 
    id: 1, 
    name: "Rohan Kapoor", 
    position: "Tandoor Chef", 
    email: "rohan@crowncuisine.com", 
    phone: "(+91) 98765 43210", 
    status: "Active" 
  },
  { 
    id: 2, 
    name: "Deepika Sharma", 
    position: "Curry Chef", 
    email: "deepika@crowncuisine.com", 
    phone: "(+91) 91234 56789", 
    status: "Active" 
  },
  { 
    id: 3, 
    name: "Arjun Patel", 
    position: "Sweets Specialist", 
    email: "arjun@crowncuisine.com", 
    phone: "(+91) 99887 76655", 
    status: "On Leave" 
  },
];

// Simplified components for preview
const StaffComponent = () => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-4">
        <div className="relative">
          <MagnifyingGlass size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search employee..." 
            className="pl-9 pr-4 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-stone-500"
          />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {staffMembers.map((staff) => (
        <div key={staff.id} className="bg-stone-50 rounded-lg border border-stone-200 p-4 flex items-start gap-4">
          <div className="bg-stone-200 rounded-full w-12 h-12 flex items-center justify-center text-stone-600 font-medium">
            {staff.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-stone-900">{staff.name}</h3>
                <p className="text-stone-600 text-sm">{staff.position}</p>
              </div>
              <span 
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  staff.status === "Active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {staff.status}
              </span>
            </div>
            <div className="mt-2 text-sm">
              <p className="text-stone-500">{staff.email}</p>
              <p className="text-stone-500">{staff.phone}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PlaceholderComponent = ({ name }) => (
  <div className="flex items-center justify-center h-64">
    <p className="text-stone-500">{name} Component Placeholder</p>
  </div>
);

const tabs = [
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "staff", label: "Staff", icon: User },
  { id: "menu", label: "Menu", icon: Hamburger },
  { id: "reservations", label: "Table Reservations", icon: CalendarCheck },
  { id: "settings", label: "Settings", icon: GearSix },
];

const Preview = () => {
  const [activeTab, setActiveTab] = useState("staff");
  const [sidebarWidth, setSidebarWidth] = useState(180);
  const containerRef = useRef(null);

  const ActiveComponent = {
    inventory: () => <PlaceholderComponent name="Inventory" />,
    staff: StaffComponent,
    menu: () => <PlaceholderComponent name="Menu" />,
    reservations: () => <PlaceholderComponent name="Table Reservations" />,
    settings: () => <PlaceholderComponent name="Settings" />,
  }[activeTab];

  return (
    <div className="w-full" ref={containerRef}>
      {/* 16:9 aspect ratio container */}
      <div className="w-full relative" style={{ paddingBottom: "56.25%" }}>
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-stone-300 shadow-lg">
          <div className="flex h-full w-full">
            {/* Sidebar */}
            <aside className="bg-stone-800 text-stone-100 relative flex flex-col"
              style={{ width: `${sidebarWidth}px`, minWidth: `${sidebarWidth}px` }}>
              <div className="flex justify-center p-6">
                <h1 className={`${instrumentSerif.className} text-lg mt-2 mb-2 text-stone-100 text-center`}>
                  Crown <em className="italic">Cuisine</em>
                </h1>
              </div>

              <nav className="flex flex-col w-full items-center">
                <TooltipProvider>
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const buttonWidth = sidebarWidth - 32; // Full width minus padding
                    
                    return (
                      <Tooltip key={tab.id}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center justify-center mb-4 bg-stone-900 transition-all cursor-pointer ${
                              isActive
                                ? "bg-stone-950 text-stone-100"
                                : "text-stone-100 hover:bg-stone-900/50"
                            } rounded-lg`}
                            style={{ width: `${buttonWidth}px`, height: '70px' }}
                          >
                            <Icon size={20} weight="regular" />
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
            </aside>

            {/* Main content area */}
            <main className="flex-1 overflow-y-auto bg-stone-400">
              <div className="p-6">
                <div className="bg-stone-100 rounded-xl shadow-sm p-6">
                  <ActiveComponent />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
