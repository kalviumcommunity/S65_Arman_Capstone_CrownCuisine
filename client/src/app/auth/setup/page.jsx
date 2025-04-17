"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Crown, User, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function RoleSelectionPage() {
  const router = useRouter();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleRoleSelect = (role) => {
    if (role === "owner") {
      router.push("/owner/setup");
    } else if (role === "customer") {
      router.push("/customer/setup");
    } else if (role === "staff") {
      router.push("/staff/setup");
    }
  };

  const roleData = {
    owner: {
      icon: <Crown className="h-8 w-8 mb-3 text-stone-900" strokeWidth={1.5} />,
      title: "Owner",
      description:
        "Manage restaurant, track inventory, update the menu, and handle staff.",
    },
    customer: {
      icon: <User className="h-8 w-8 mb-3 text-stone-900" strokeWidth={1.5} />,
      title: "Customer",
      description:
        "Browse the menu, order food, reserve a table, and make special requests.",
    },
    staff: {
      icon: <Users className="h-8 w-8 mb-3 text-stone-900" strokeWidth={1.5} />,
      title: "Employee",
      description:
        "Manage orders, serve customers, handle billing, and operate reception.",
    },
  };

  const optionBtnClasses = (role) =>
    `flex flex-col items-center justify-center rounded-lg w-64 h-64 p-6 transition-colors ${
      role === "staff"
        ? "bg-stone-200 text-stone-400 cursor-not-allowed opacity-60"
        : "bg-stone-200 hover:bg-stone-300 active:bg-stone-300 cursor-pointer"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isPageLoaded ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.1, 0.3, 1.0] }}
      className="min-h-screen bg-stone-200 flex flex-col items-center justify-center px-4"
    >
      <Card className="w-full max-w-4xl bg-stone-200 border-0 shadow-none">
        <CardHeader className="text-center mb-4 bg-transparent">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isPageLoaded ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.1, 0.3, 1.0] }}
          >
            <h1 className="text-stone-900 text-5xl font-serif whitespace-nowrap mb-4">
              Who are you?
            </h1>
            <p className="text-stone-800 font-serif">
              Select your role to continue: Owner to manage the restaurant,
              menu, and staff; <br /> Customer to browse and order food; or
              Staff to assist with orders and daily operations.
            </p>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isPageLoaded ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.1, 0.3, 1.0] }}
            className="flex justify-center gap-8 flex-wrap"
          >
            {Object.entries(roleData).map(([role, data]) => (
              <motion.div
                key={role}
                initial={{ opacity: 0 }}
                animate={{ opacity: isPageLoaded ? 1 : 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.2, 0.1, 0.3, 1.0],
                }}
                className={optionBtnClasses(role)}
                onClick={
                  role === "staff" ? undefined : () => handleRoleSelect(role)
                }
                tabIndex={role === "staff" ? -1 : 0}
                role="button"
                aria-disabled={role === "staff"}
                onKeyDown={(e) => {
                  if (
                    role !== "staff" &&
                    (e.key === "Enter" || e.key === " ")
                  ) {
                    handleRoleSelect(role);
                  }
                }}
              >
                {data.icon}
                <p className="font-semibold text-stone-900 text-lg mb-2">
                  {data.title}
                </p>
                <p className="text-stone-800 text-center">{data.description}</p>
                {role === "staff" && (
                  <span className="mt-4 text-xs text-stone-500 italic">
                    Coming soon
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
        {/* CardFooter and Continue button removed */}
      </Card>
    </motion.div>
  );
}
