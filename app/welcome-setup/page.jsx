"use client";

import { useRouter } from "next/navigation";
import { Hamburger, Crown, User } from "@phosphor-icons/react";
import { instrumentSerif } from "@/app/fonts";
import React from "react";

export default function WelcomeSetup() {
  const router = useRouter();

  const roles = [
    {
      id: "customer",
      title: "Customer",
      location: "Restaurant Customer",
      description:
        "Find restaurants, view menus, book tables, order food, and enjoy a simple dining experience.",
      icon: <Hamburger size={24} className="text-stone-900" />,
      route: "/customer/profile-setup",
    },
    {
      id: "manager",
      title: "Manager",
      location: "Restaurant Owner",
      description:
        "Manage staff, check inventory, update menus, and keep restaurant operations smooth.",
      icon: <Crown size={24} className="text-stone-900" />,
      route: "/manager/restaurant-setup",
    },
    {
      id: "employee",
      title: "Employee",
      location: "Restaurant Employee",
      description:
        "See work schedule, take orders, assist customers, and coordinate with team and kitchen staff.",
      icon: <User size={24} className="text-stone-900" />,
      route: "/dashboard/employee",
    },
  ];

  const handleRoleSelect = (role) => {
    if (role.id === "employee") return; // Prevent navigation for employee
    router.push(role.route);
  };

  return (
    <main className="relative z-1 min-h-screen flex flex-col justify-center items-center bg-stone-300">
      <div className="flex flex-col items-center justify-center h-full w-full p-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1
            className={`${instrumentSerif.className} text-6xl font-medium mb-6 text-stone-900`}
          >
            Ready to <em className="italic">Dive</em> In?
          </h1>
          <p className="max-w-lg mx-auto text-md mt-4 mb-8 text-stone-800">
            Select your role to get started. This helps us understand how you'll
            use the platform and set things up for you.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl justify-center">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`w-full md:w-72 rounded-lg overflow-hidden shadow-none ${role.id === "employee" ? "bg-stone-200" : "bg-stone-100 hover:bg-stone-200"} flex flex-col cursor-pointer`}
              onClick={() => handleRoleSelect(role)}
            >
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-stone-300 rounded-full">
                    {React.cloneElement(role.icon, { size: 22 })}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-stone-800">
                      {role.title}
                    </h2>
                    <p className="text-xs text-stone-500">{role.location}</p>
                  </div>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-2">
                  {role.description}
                </p>
                {role.id === "employee" && (
                  <p className="text-xs text-stone-500 italic">Coming soon</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
