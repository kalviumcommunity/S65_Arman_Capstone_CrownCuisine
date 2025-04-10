"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { AuthModal } from "@/components/auth/auth-modal";
import Link from "next/link";

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
      duration: 0.5,
      staggerChildren: 0.2,
      ease: "easeOut",
    },
  },
};

const CTACard = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const openAuth = () => setIsAuthModalOpen(true);
  const closeAuth = () => setIsAuthModalOpen(false);

  return (
    <>
      <motion.div
        className="w-full overflow-hidden rounded-xl my-12"
        variants={fadeInVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="bg-stone-700 p-8 md:p-12 relative">
          <div className="flex flex-col items-center text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
              Boost Your Restaurant!
            </h2>
            <p className="text-stone-300 text-lg font-serif mb-8 max-w-2xl">
              Get clear control of your restaurant. Our simple app puts
              everything you need in one place, making management easy and your
              workday smoother.
            </p>
            <Button
              size="lg"
              className="w-auto md:w-[220px] bg-white text-stone-800 hover:bg-stone-100 rounded-full font-medium px-6 py-3 md:px-8 md:py-6"
              onClick={openAuth}
            >
              Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuth} />
    </>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-200 py-6 text-black/80 mb-12 font-mono">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center text-sm">
        <span>
          © {currentYear} Crown Cuisine /{" "}
          <a
            href="https://github.com/vereoman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:opacity-80"
          >
            @vereoman
          </a>
          .
        </span>
      </div>
    </footer>
  );
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
      <div className="flex min-h-screen flex-col bg-stone-200 text-black">
        <motion.div
          className="flex-grow"
          initial="initial"
          animate={controls}
          variants={fadeInVariants}
          style={{ willChange: "opacity" }}
        >
          <main>
            <section className="flex h-[calc(100vh-80px)] items-center justify-center bg-stone-200">
              <div className="container px-4 md:px-6 text-center">
                <motion.div
                  className="mx-auto max-w-3xl space-y-6"
                  variants={containerVariants}
                  initial="initial"
                  animate={controls}
                >
                  <motion.h1
                    className="text-4xl font-serif tracking-tighter text-black sm:text-5xl md:text-6xl lg:text-7xl"
                    variants={fadeInVariants}
                    style={{ willChange: "opacity" }}
                  >
                    Manage Your Restaurant!
                  </motion.h1>
                  <motion.p
                    className="mx-auto max-w-2xl text-lg font-serif text-black/80 md:text-xl"
                    variants={fadeInVariants}
                    style={{ willChange: "opacity" }}
                  >
                    Make running your restaurant simple! Our easy-to-use app
                    lets you manage menus, reservations, staff schedules, and
                    inventory, all in one place.
                  </motion.p>
                  <motion.div
                    className="pt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                    variants={fadeInVariants}
                    style={{ willChange: "opacity" }}
                  >
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full sm:w-[200px] rounded-full bg-white py-3 md:py-6 text-black hover:bg-stone-100"
                      onClick={openAuthModal}
                    >
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="w-full sm:w-[200px] rounded-full bg-white py-3 md:py-6 text-black hover:bg-stone-100"
                    >
                      <Link href="/features">
                        Learn More <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            <section className="container px-4 md:px-6 mx-auto">
              <CTACard />
            </section>
          </main>
        </motion.div>
        <Footer />
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={closeAuthModal} />
    </>
  );
}
