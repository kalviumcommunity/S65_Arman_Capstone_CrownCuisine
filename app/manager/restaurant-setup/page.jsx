"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { instrumentSerif } from "@/app/fonts";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import { Progress } from "@/components/ui/progress";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

const TITLES = [
  "What should we call you?",
  "What is your Restaurant's Name?",
  "What is your phone number?",
  "Can you verify your number?",
  "What is your Restaurant's Specialty?",
  "Tell us about your Restaurant",
  "Where is your Restaurant located?",
];

const DESCRIPTIONS = [
  "Please enter your full name and avoid including any numbers or special characters to ensure it's clear and easy to read.",
  "Enter the official name of your restaurant as you want it to appear to customers.",
  "Please enter your phone number and avoid including any letters or special characters to ensure it's clear and easy to read.",
  "Please verify your phone number by entering the OTP sent to your device. This helps ensure your number is accurate and valid.",
  "Select the primary cuisine type your restaurant specializes in to help customers find you.",
  "Share a brief description of your restaurant, including your unique offerings, atmosphere, and what makes you special.",
  "Please enter your restaurant's full address to help customers find you easily.",
];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export default function RestaurantSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    restaurantName: "",
    phoneNumber: "",
    otp: "",
    cuisineSpecialty: "",
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (value) => {
    setFormData((prev) => ({ ...prev, otp: value }));
  };

  const handleNextClick = () => {
    if (step < 7) {
      setStep(step + 1);
    } else {
      localStorage.setItem("restaurantProfile", JSON.stringify(formData));
      router.push("/manager/dashboard");
    }
  };

  const handleBackClick = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progressValue = ((step - 1) / 6) * 100;

  return (
    <motion.main
      className="relative z-1 min-h-screen flex flex-col justify-center items-center bg-stone-300 text-stone-950"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-3xl p-8">
        <Progress value={progressValue} className="h-3 mb-10 w-1/2 mx-auto" />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-10 text-center"
          >
            <h1
              className={`${instrumentSerif.className} text-6xl font-medium mb-4`}
            >
              {TITLES[step - 1]}
            </h1>
            <p className="text-stone-700">{DESCRIPTIONS[step - 1]}</p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`step-content-${step}`}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            {step === 1 && (
              <div className="space-y-3">
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-none bg-stone-100 focus:border-stone-900 h-12 w-72 mx-auto text-center"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <Input
                  id="restaurantName"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  className="border-none bg-stone-100 focus:border-stone-900 h-12 w-72 mx-auto text-center"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  type="tel"
                  className="border-none bg-stone-100 focus:border-stone-900 h-12 w-72 mx-auto text-center"
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={formData.otp}
                    onChange={handleOtpChange}
                  >
                    <InputOTPGroup>
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="border-none bg-stone-100 h-12 w-12 text-xl"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-3">
                <Input
                  id="cuisineSpecialty"
                  name="cuisineSpecialty"
                  value={formData.cuisineSpecialty}
                  onChange={handleChange}
                  className="border-none bg-stone-100 focus:border-stone-900 h-12 w-72 mx-auto text-center"
                />
              </div>
            )}

            {step === 6 && (
              <div className="space-y-3">
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border-none bg-stone-100 focus:border-stone-900 min-h-32 w-full max-w-md mx-auto"
                />
              </div>
            )}

            {step === 7 && (
              <div className="space-y-3">
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border-none bg-stone-100 focus:border-stone-900 h-12 w-72 mx-auto text-center"
                />
              </div>
            )}

            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handleBackClick}
                disabled={step === 1}
                type="button"
                className="w-12 h-12 flex items-center justify-center rounded-full border-none bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors shadow-none disabled:bg-stone-200 disabled:text-stone-600 cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft size={20} weight="bold" />
              </button>
              <button
                onClick={handleNextClick}
                type="button"
                className="w-12 h-12 flex items-center justify-center rounded-full border-none bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors shadow-none disabled:bg-stone-200 disabled:text-stone-600 cursor-pointer"
                aria-label="Continue"
              >
                <ArrowRight size={20} weight="bold" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
