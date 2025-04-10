"use client";
import { motion } from "framer-motion";

interface HeroSectionProps {
  userName: string;
}

export function HeroSection({ userName }: HeroSectionProps) {
  const timeOfDay = getTimeOfDay();

  return (
    <div className="relative overflow-hidden bg-stone-200 py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-stone-300"></div>
        <div className="absolute bottom-0 left-1/4 h-40 w-40 rounded-full bg-stone-300"></div>
        <div className="absolute right-1/3 top-1/2 h-24 w-24 rounded-full bg-stone-300"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black tracking-tight">
            {timeOfDay}, <span className="italic">{userName}</span>
          </h1>
          <p className="mt-6 text-lg text-black/80 font-serif max-w-2xl mx-auto">
            Discover top restaurants near you, from local favorites to global
            flavors. Whether you're craving comfort food or something new,
            there's a spot waiting.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}
