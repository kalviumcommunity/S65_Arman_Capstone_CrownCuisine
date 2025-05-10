"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import Overview from "@/components/customer/overview";
import Search from "@/components/customer/search";
import Reservations from "@/components/customer/reservation";
import Favorites from "@/components/customer/favourite";
import Offers from "@/components/customer/offer";
import Profile from "@/components/customer/account";
import Settings from "@/components/customer/setting";
import Questions from "@/components/customer/questions";
import {
  MagnifyingGlass,
  CalendarPlus,
  ClockCounterClockwise,
  Heart,
  Star,
  Ticket,
  User,
  GearSix,
  Question,
  CaretDown,
  HouseSimple,
} from "@phosphor-icons/react";
import { funnelSans, instrumentSerif } from "@/app/fonts";
import { Separator } from "@/components/ui/separator";

const tabGroups = [
  {
    heading: "Explore",
    tabs: [
      { id: "overview", label: "Overview", icon: HouseSimple },
      { id: "search", label: "Search Restaurants", icon: MagnifyingGlass },
      { id: "popular", label: "Popular Ones", icon: Star },
    ],
  },
  {
    heading: "Reservations",
    tabs: [
      { id: "reservation", label: "Your Reservations", icon: CalendarPlus },
      { id: "previous", label: "Previous Ones", icon: ClockCounterClockwise },
    ],
  },
  {
    heading: "Favorites",
    tabs: [
      { id: "restaurants", label: "Restaurants", icon: Heart },
      { id: "menus", label: "Favourite Menus", icon: Star },
    ],
  },
  {
    heading: "Offers",
    tabs: [
      { id: "offers", label: "Saved Offers", icon: Ticket },
    ],
  },
  {
    heading: "Account",
    tabs: [
      { id: "settings", label: "Settings", icon: GearSix },
      { id: "profile", label: "Your Account", icon: User },
      { id: "questions", label: "Got Questions?", icon: Question },
    ],
  },
];

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);

  const initialCollapsed = tabGroups.reduce((acc, grp) => ((acc[grp.heading] = false), acc), {});
  const [collapsedGroups, setCollapsedGroups] = useState(initialCollapsed);

  const ActiveComponent = {
    overview: Overview,
    search: Search,
    popular: Search,
    reservation: Reservations,
    previous: Reservations,
    restaurants: Favorites,
    menus: Favorites,
    offers: Offers,
    profile: Profile,
    settings: Settings,
    questions: Questions,
  }[activeTab];

  useEffect(() => {
    const saved = localStorage.getItem("customerSidebarWidth");
    if (saved) setSidebarWidth(Number(saved));
  }, []);

  const startResizing = () => setIsResizing(true);
  const stopResizing = () => setIsResizing(false);

  const resize = (e) => {
    if (!isResizing) return;
    const newW = e.clientX;
    if (newW > 180 && newW < 400) {
      setSidebarWidth(newW);
      localStorage.setItem("customerSidebarWidth", newW.toString());
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

  const toggleGroup = (heading) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [heading]: !prev[heading],
    }));
  };

  return (
    <div
      className={`${funnelSans.className} flex h-screen overflow-hidden`}
      onMouseUp={stopResizing}
    >
      <aside
        ref={sidebarRef}
        className="bg-stone-800 text-stone-100 flex flex-col relative"
        style={{ width: sidebarWidth, minWidth: sidebarWidth }}
      >
        <div className="p-6 flex justify-center">
          <h1 className={`${instrumentSerif.className} text-2xl`}>
            Crown <em className="italic">Cuisine</em>
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto px-4">
          {tabGroups.map((group, idx) => (
            <Fragment key={group.heading}>
              <button
                onClick={() => toggleGroup(group.heading)}
                className="w-full flex items-center justify-between mt-4 mb-2 px-2 text-xs text-stone-400 uppercase hover:text-stone-300 transition-colors cursor-pointer"
              >
                <span>{group.heading}</span>
                <CaretDown
                  size={12}
                  weight="bold"
                  className={`transition-transform duration-200 ${
                    collapsedGroups[group.heading] ? "-rotate-90" : "rotate-0"
                  }`}
                />
              </button>

              {!collapsedGroups[group.heading] && (
                <div>
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
                        <span className="text-xs truncate">{tab.label}</span>
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
          className="absolute top-0 right-0 h-full w-1 cursor-ew-resize bg-stone-700 opacity-0 hover:opacity-100 transition-opacity"
          onMouseDown={startResizing}
        />
      </aside>

      <main className="flex-1 overflow-y-auto bg-stone-800">
        <div className="p-3">
          <div className="bg-stone-300 rounded-lg p-6">
            <ActiveComponent />
          </div>
        </div>
      </main>
    </div>
  );
}
