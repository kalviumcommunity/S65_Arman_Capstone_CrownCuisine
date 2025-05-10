"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import Inventory from "@/components/manager/inventory";
import Staff from "@/components/manager/employee";
import Menu from "@/components/manager/menu";
import TableReservation from "@/components/manager/reservation";
import {
  HouseSimple,
  CookingPot,
  CalendarCheck,
  ChartPieSlice,
  ChartBar,
  Package,
  Hamburger,
  GearSix,
  User,
  UserCheck,
  CaretDown,
  Question
} from "@phosphor-icons/react";
import { funnelSans, instrumentSerif } from "@/app/fonts";
import { Separator } from "@/components/ui/separator";

const tabGroups = [
  {
    heading: "General",
    tabs: [
      { id: "overview", label: "Overview", icon: HouseSimple },
      { id: "orders", label: "Your Orders", icon: CookingPot },
      {
        id: "reservations",
        label: "Table Reservations",
        icon: CalendarCheck,
      },
    ],
  },
  {
    heading: "Analytics",
    tabs: [
      { id: "sales", label: "Sales & Reports", icon: ChartPieSlice },
      { id: "analytics", label: "Restaurant Analytics", icon: ChartBar },
    ],
  },
  {
    heading: "Management",
    tabs: [
      { id: "inventory", label: "Inventory Overview", icon: Package },
      { id: "menu", label: "Menu Items", icon: Hamburger },
      { id: "staff", label: "Employee Schedule", icon: UserCheck },
    ],
  },
  {
    heading: "Account",
    tabs: [
      { id: "settings", label: "Settings", icon: GearSix },
      { id: "profile", label: "Your Account", icon: User },
      { id: "help", label: "Got Questions?", icon: Question },
    ],
  },
];

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);
  const resizeRef = useRef(null);

  const initialCollapsedState = tabGroups.reduce((acc, group) => {
    acc[group.heading] = true;
    return acc;
  }, {});
  const [collapsedGroups, setCollapsedGroups] = useState(
    initialCollapsedState,
  );

  const ActiveComponent = {
    overview: () => <div>Overview Dashboard</div>,
    orders: () => <div>Orders Management</div>,
    reservations: TableReservation,
    sales: () => <div>Sales & Reports</div>,
    analytics: () => <div>Analytics & Insights</div>,
    inventory: Inventory,
    staff: Staff,
    menu: Menu,
    settings: () => <div>Settings Component</div>,
    profile: () => <div>User Profile</div>,
  }[activeTab];

  useEffect(() => {
    const saved = localStorage.getItem("sidebarWidth");
    if (saved) setSidebarWidth(parseInt(saved, 10));
  }, []);

  const startResizing = () => setIsResizing(true);
  const stopResizing = () => setIsResizing(false);

  const resize = (e) => {
    if (!isResizing) return;
    const newW = e.clientX;
    if (newW > 180 && newW < 400) {
      setSidebarWidth(newW);
      localStorage.setItem("sidebarWidth", newW.toString());
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

  const toggleGroup = (groupHeading) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupHeading]: !prev[groupHeading],
    }));
  };

  return (
    <div
      className={`${funnelSans.className} flex h-screen overflow-hidden`}
      onMouseUp={stopResizing}
    >
      <aside
        ref={sidebarRef}
        className="bg-stone-800 text-stone-100 relative flex flex-col"
        style={{
          width: `${sidebarWidth}px`,
          minWidth: `${sidebarWidth}px`,
        }}
      >
        <div className="flex justify-center p-6">
          <h1
            className={`${instrumentSerif.className} text-2xl text-stone-100`}
          >
            Crown <em className="italic">Cuisine</em>
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto px-4">
          {tabGroups.map((group, idx) => (
            <Fragment key={group.heading}>
              <button
                onClick={() => toggleGroup(group.heading)}
                className="flex items-center justify-between w-full mt-4 mb-2 px-2 text-xs text-stone-400 uppercase hover:text-stone-300 transition-colors focus:outline-none cursor-pointer"
              >
                <span>{group.heading}</span>
                <CaretDown
                  size={12}
                  weight="bold"
                  className={`transition-transform duration-200 ${
                    collapsedGroups[group.heading]
                      ? "-rotate-90"
                      : "rotate-0"
                  }`}
                />
              </button>

              {!collapsedGroups[group.heading] && (
                <div className="pl-1">
                  {group.tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center w-full px-4 py-3 mb-1 rounded-full transition-colors cursor-pointer ${
                            isActive
                              ? "bg-stone-900 text-stone-100"
                              : "hover:bg-stone-900/50 text-stone-100"
                          }`}
                        title={tab.label}
                      >
                        <Icon size={16} className="mr-2 flex-shrink-0" />
                        <span className="text-xs truncate">
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {idx < tabGroups.length - 1 && (
                <Separator className="my-4 bg-stone-700" />
              )}
            </Fragment>
          ))}
        </nav>

        <div
          ref={resizeRef}
          className="absolute top-0 right-0 h-full w-1 cursor-ew-resize bg-stone-700 opacity-0 hover:opacity-100 transition-opacity"
          onMouseDown={startResizing}
        />
      </aside>

      <main className="flex-1 overflow-y-auto bg-stone-300">
        <div className="p-8">
          <div className="bg-stone-100 rounded-lg p-6">
            <ActiveComponent />
          </div>
        </div>
      </main>
    </div>
  );
}
