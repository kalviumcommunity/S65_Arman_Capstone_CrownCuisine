"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, User, Users } from "lucide-react";

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (!selectedRole) return;
    if (selectedRole === "owner") {
      router.push("/owner/setup");
    } else if (selectedRole === "customer") {
      router.push("/customer/setup");
    } else if (selectedRole === "staff") {
      router.push("/staff/setup");
    }
  };

  const roleData = {
    owner: {
      icon: <Crown className="h-8 w-8 mb-3" strokeWidth={1.5} />,
      title: "Owner",
      description: "Manage restaurant, track inventory, update the menu, and handle staff."
    },
    customer: {
      icon: <User className="h-8 w-8 mb-3" strokeWidth={1.5} />,
      title: "Customer",
      description: "Browse the menu, order food, reserve a table, and make special requests."
    },
    staff: {
      icon: <Users className="h-8 w-8 mb-3" strokeWidth={1.5} />,
      title: "Employee",
      description: "Manage orders, serve customers, handle billing, and operate reception."
    }
  };

  const optionBtnClasses = (role) =>
    `flex flex-col items-center justify-center rounded-lg w-64 h-64 p-6 cursor-pointer transition-colors ${
      selectedRole === role
        ? "bg-stone-300"
        : "bg-stone-200 hover:bg-stone-300"
    }`;

  return (
    <div className="min-h-screen bg-stone-200 flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-4xl bg-stone-200 border-0 shadow-none">
        <CardHeader className="text-center mb-4 bg-transparent">
          <h1 className="text-stone-900 text-5xl font-serif whitespace-nowrap mb-4">Who are you?</h1>
          <p className="text-stone-700 font-serif">
            Select your role to continue: Owner to manage the restaurant, menu, and staff; <br/> Customer to browse and order food; or Staff to assist with orders and daily operations.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="flex justify-center gap-8 flex-wrap">
            {Object.entries(roleData).map(([role, data]) => (
              <div
                key={role}
                className={optionBtnClasses(role)}
                onClick={() => handleRoleSelect(role)}
              >
                {data.icon}
                <p className="font-semibold text-lg mb-2">{data.title}</p>
                <p className="text-stone-600 text-center">{data.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-6 bg-transparent">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="rounded-full p-3 w-12 h-12 bg-white border-0 hover:bg-stone-200 cursor-pointer flex items-center justify-center"
          >
            <ArrowRight className="h-5 w-5 text-black" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}