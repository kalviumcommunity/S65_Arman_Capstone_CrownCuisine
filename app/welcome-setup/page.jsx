"use client";

import { useRouter } from "next/navigation";
import { Hamburger, Crown, UserCheck } from "@phosphor-icons/react";
import { instrumentSerif } from "@/app/fonts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function WelcomeSetup() {
  const router = useRouter();

  const roles = [
    {
      id: "customer",
      title: "Customer",
      description:
        "Find restaurants, view menus, book tables, order food, and enjoy a simple dining experience.",
      icon: <Hamburger size={32} className="text-stone-900" />,
      route: "/customer/profile-setup",
    },
    {
      id: "manager",
      title: "Manager",
      description:
        "Manage staff, check inventory, update menus, and keep restaurant operations smooth.",
      icon: <Crown size={32} className="text-stone-900" />,
      route: "/manager/restaurant-setup",
    },
    {
      id: "employee",
      title: "Employee",
      description:
        "See work schedule, take orders, assist customers, and coordinate with team and kitchen staff.",
      icon: <UserCheck size={32} className="text-stone-900" />,
      route: "/dashboard/employee",
    },
  ];

  /**
   * Handles the selection of a role.
   * Navigates the user to the route associated with the selected role.
   * @param {object} role - The selected role object.
   */
  const handleRoleSelect = (role) => {
    router.push(role.route);
  };

  return (
    <main className="relative z-1 min-h-screen flex flex-col justify-center items-center bg-stone-300 text-stone-950">
      <div className="flex flex-col items-center justify-center h-full w-full p-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1
            className={`${instrumentSerif.className} text-6xl font-medium mb-6`}
          >
            Ready to <em className="italic">Dive</em> In?
          </h1>
          <p className="max-w-lg mx-auto text-md mt-6 mb-8 text-stone-800">
            Select your role to get started. This helps us understand how you'll
            use the platform and set things up for you. Don't worry, you can
            always update your role later if needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          {roles.map((role) => (
            <Card
              key={role.id}
              onClick={() => handleRoleSelect(role)}
              className="
                cursor-pointer flex flex-col items-center text-center
                border-2 border-stone-900 bg-stone-100 hover:bg-stone-200
                rounded-md p-8 min-h-[240px]
              "
              tabIndex={0}
              role="button"
              aria-label={`Select role: ${role.title}`}
            >
              <CardHeader className="flex flex-col items-center justify-center flex-grow">
                <div className="mb-2">{role.icon}</div>
                <CardTitle className="text-lg font-medium text-stone-900">
                  {role.title}
                </CardTitle>
              </CardHeader>
              <CardDescription className="text-stone-700 text-sm leading-relaxed w-full">
                {role.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
