"use client";

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Hamburger, Crown, User } from "@phosphor-icons/react";
import { instrumentSerif } from "@/app/fonts";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeSetupModal({ isOpen, onClose }) {
  const router = useRouter();
  const modalRef = useRef(null);

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
    if (role.id === "employee") return;
    router.push(role.route);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            className="bg-stone-300 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-24"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h1
                  className={`${instrumentSerif.className} text-5xl md:text-6xl mb-6 text-stone-900`}
                >
                  Ready to <em className="italic">Dive</em> In?
                </h1>
                <p className="max-w-lg mx-auto text-md mt-4 mb-8 text-stone-800">
                  Select your role to get started. This helps us understand how
                  you'll use the platform and set things up for you.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl justify-center">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className="w-full md:w-72 rounded-lg overflow-hidden shadow-none bg-stone-100 hover:bg-stone-200 flex flex-col cursor-pointer"
                    onClick={() => handleRoleSelect(role)}
                  >
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-stone-300 rounded-full">
                          {React.cloneElement(role.icon, { size: 22 })}
                        </div>
                        <div>
                          <h2 className="font-medium text-lg text-stone-800">
                            {role.title}
                          </h2>
                          <p className="text-xs text-stone-500">
                            {role.location}
                          </p>
                        </div>
                      </div>
                      <p className="text-stone-600 text-sm leading-relaxed mb-2">
                        {role.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
