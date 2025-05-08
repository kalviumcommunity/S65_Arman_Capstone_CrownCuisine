"use client";

import { useState } from "react";
import {
  HouseSimple,
  User,
  Crown,
  UserCheck,
  HeartStraight,
} from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { chivoMono } from "@/app/fonts";

export default function Navigation() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    {
      id: "hello",
      label: "Hello",
      icon: <HouseSimple size={22} />,
    },
    {
      id: "customers",
      label: "Customers",
      icon: <User size={22} />,
    },
    {
      id: "managers",
      label: "Managers",
      icon: <Crown size={22} />,
    },
    {
      id: "employees",
      label: "Employees",
      icon: <UserCheck size={22} />,
    },
    {
      id: "donations",
      label: "Donations",
      icon: <HeartStraight size={22} />,
    },
  ];

  return (
    <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-10">
      <TooltipProvider>
        <div className="flex flex-col gap-4 items-center">
          {tabs.map((tab) => (
            <Tooltip key={tab.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-2.5 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "text-stone-700"
                      : "text-stone-900 hover:text-stone-700"
                  }`}
                >
                  {tab.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className={`${chivoMono.className} bg-stone-100 text-stone-900 border-2 border-stone-900 rounded-full px-4 py-2`}
              >
                <p>{tab.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </nav>
  );
}
