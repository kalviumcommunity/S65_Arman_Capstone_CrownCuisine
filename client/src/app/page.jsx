"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AuthModal from "@/components/auth/auth-card";
import { motion } from "framer-motion";
import Navbar from "@/components/navigation/navbar"; // Import the Navbar

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.1, 0.3, 1.0],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.2, 0.1, 0.3, 1.0] },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isPageLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: [0.2, 0.1, 0.3, 1.0] }}
      className="flex h-screen flex-col bg-stone-200"
    >
      {/* Navbar */}
      <Navbar onGetStarted={() => setIsAuthModalOpen(true)} />

      {/* Spacer to prevent content from being hidden behind navbar */}
      <div className="h-16" />

      <div className="flex-grow">
        <main className="h-full">
          <section className="flex h-full items-center justify-center bg-stone-200">
            <div className="container px-4 md:px-6 text-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isPageLoaded ? "visible" : "hidden"}
                className="mx-auto max-w-3xl space-y-6"
              >
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl font-serif tracking-tighter text-stone-900 sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  Manage Your Restaurant!
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="mx-auto max-w-2xl text-lg font-serif text-stone-800 md:text-xl"
                >
                  Make running your restaurant simple! Our easy-to-use app lets
                  you manage menus, reservations, staff schedules, and
                  inventory, all in one place.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="pt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                >
                  <Button
                    onClick={() => setIsAuthModalOpen(true)}
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-[200px] rounded-full bg-white py-3 md:py-6 text-stone-900 hover:bg-stone-200 cursor-pointer shadow-none"
                  >
                    Get Started <ArrowRight className="h-5 w-5" />
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-[200px] rounded-full bg-white py-3 md:py-6 text-stone-900 hover:bg-stone-200 cursor-pointer shadow-none"
                  >
                    <Link href="/features">
                      Learn More <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </motion.div>
  );
}
