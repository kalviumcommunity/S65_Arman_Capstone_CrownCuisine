"use client";

import { instrumentSerif } from "@/app/fonts";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WelcomeSetupModal from "@/components/welcome-setup";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <main className="relative z-1 min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <h1
            className={`${instrumentSerif.className} text-8xl mb-6 text-stone-900`}
          >
            <span className="block">Serve Better.</span>
            <span className="block">
              Manage <em className="italic">Smarter.</em>
            </span>
          </h1>
          <p className="max-w-lg mx-auto text-md mb-6 text-stone-800">
            Manage orders, reservations, staff, and inventory all in one place.
            Get real-time insights to boost efficiency and deliver great
            service.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              className="border-none rounded-full bg-stone-100 hover:bg-stone-200 hover:text-stone-800 cursor-pointer !px-6 !py-6"
              onClick={() => setIsModalOpen(true)}
            >
              Get Started <ArrowRight weight="bold" size={16} />
            </Button>
            <Button
              variant="outline"
              className="border-none rounded-full bg-stone-100 hover:bg-stone-200 hover:text-stone-800 cursor-pointer !px-6 !py-6"
              onClick={() => router.push("/about")}
            >
              Learn More <ArrowRight weight="bold" size={16} />
            </Button>
          </div>
        </motion.div>
      </div>
      <WelcomeSetupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
