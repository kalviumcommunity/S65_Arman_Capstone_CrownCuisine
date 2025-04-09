"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { AuthModal } from "@/components/auth/auth-modal";

const fadeInVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.3,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  const controls = useAnimation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  const openAuthModal = () => {
    setIsAuthOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthOpen(false);
  };

  return (
    <>
      <motion.div
        className="flex min-h-screen flex-col bg-stone-200 text-black"
        initial="initial"
        animate={controls}
        variants={fadeInVariants}
        style={{ willChange: "opacity, transform" }}
      >
        <main className="flex-grow">
          <section className="flex h-screen items-center justify-center bg-stone-200">
            <div className="container px-4 md:px-6 text-center">
              <motion.div
                className="mx-auto max-w-3xl space-y-6"
                variants={containerVariants}
                initial="initial"
                animate={controls}
              >
                <motion.h1
                  className="text-3xl font-serif tracking-tighter text-black sm:text-5xl md:text-6xl lg:text-7xl"
                  variants={fadeInVariants}
                  style={{ willChange: "opacity" }}
                >
                  Manage Your Restaurant!
                </motion.h1>
                <motion.p
                  className="mx-auto max-w-2xl text-lg font-serif text-black/80 md:text-xl"
                  variants={fadeInVariants}
                  style={{ willChange: "opacity, transform" }}
                >
                  Make running your restaurant simple! Our easy-to-use app lets
                  you manage menus, reservations, staff schedules, and
                  inventory, all in one place.
                </motion.p>
                <motion.div
                  className="pt-6 flex justify-center space-x-4"
                  variants={fadeInVariants}
                  style={{ willChange: "opacity, transform" }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-[200px] rounded-full bg-white py-6 text-black hover:bg-stone-200 cursor-pointer"
                    onClick={openAuthModal}
                  >
                    Get Started <ArrowRight/>
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-[200px] rounded-full bg-white py-6 text-black hover:bg-stone-200 cursor-pointer"
                  >
                    Learn More <ArrowRight/>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
      </motion.div>

      <AuthModal isOpen={isAuthOpen} onClose={closeAuthModal} />
    </>
  );
}
