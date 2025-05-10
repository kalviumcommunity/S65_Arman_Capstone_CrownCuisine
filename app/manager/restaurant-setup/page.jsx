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
import { registerManager, verifyOTP, sendOTP, updateUserProfile } from "@/app/api/auth";
import { createRestaurant } from "@/app/api/restaurant";
import { toast } from "sonner";

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
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleOtpChange = (value) => {
    setFormData((prev) => ({ ...prev, otp: value }));
    setError("");
  };

  const handleNextClick = async () => {
    setError("");
    
    // Validate current step
    if (step === 1 && !formData.name) {
      setError("Please enter your name");
      return;
    } else if (step === 2 && !formData.restaurantName) {
      setError("Please enter your restaurant name");
      return;
    } else if (step === 3 && !formData.phoneNumber) {
      setError("Please enter your phone number");
      return;
    } else if (step === 4 && !formData.otp) {
      setError("Please enter the verification code");
      return;
    } else if (step === 5 && !formData.cuisineSpecialty) {
      setError("Please enter your cuisine specialty");
      return;
    } else if (step === 6 && !formData.description) {
      setError("Please enter your restaurant description");
      return;
    } else if (step === 7 && !formData.location) {
      setError("Please enter your restaurant location");
      return;
    }

    try {
      setLoading(true);
      
      // Handle registration and OTP sending when moving from step 3 to 4
      if (step === 3) {
        // Check if OTP was already sent
        if (!otpSent) {
          try {
            // Register manager
            const data = await registerManager({
              name: formData.name,
              phoneNumber: formData.phoneNumber,
            });
            
            toast.success("OTP sent to your phone");
            setOtpSent(true);
          } catch (error) {
            if (error.response?.status === 400 && error.response?.data?.message === 'Manager already exists') {
              // If manager exists, just send the OTP
              await sendOTP(formData.phoneNumber);
              toast.success("OTP sent to your phone");
              setOtpSent(true);
            } else {
              // Handle other errors
              toast.error(error.response?.data?.message || "Error sending OTP");
              setStep(3); // Stay on phone number step
              setLoading(false);
              return;
            }
          }
        }
      }
      
      // Verify OTP when moving from step 4 to 5
      if (step === 4) {
        try {
          const result = await verifyOTP(formData.phoneNumber, formData.otp);
          if (!result.verified && !result.user) {
            toast.error("Invalid verification code");
            setLoading(false);
            return;
          }
          toast.success("Phone number verified");
        } catch (error) {
          toast.error(error.response?.data?.message || "Error verifying OTP");
          setLoading(false);
          return;
        }
      }
      
      // Complete registration when finishing step 7
      if (step === 7) {
        try {
          // Create restaurant
          const restaurantData = {
            name: formData.restaurantName,
            cuisineSpecialty: formData.cuisineSpecialty,
            description: formData.description,
            location: formData.location
          };
          
          await createRestaurant(restaurantData);
          toast.success("Restaurant created successfully");
          router.push("/manager/dashboard");
        } catch (error) {
          toast.error(error.response?.data?.message || "Error creating restaurant");
          setLoading(false);
          return;
        }
      }
      
      // Proceed to next step
      if (step < 7) {
        setStep(step + 1);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    setError("");
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
            
            {error && (
              <p className="text-red-500 mt-2 text-sm font-medium">{error}</p>
            )}
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
                  placeholder="Your full name"
                  disabled={loading}
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
                  placeholder="Restaurant name"
                  disabled={loading}
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
                  placeholder="+1234567890"
                  disabled={loading}
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
                    disabled={loading}
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
                <div className="text-center">
                  <button
                    onClick={async () => {
                      try {
                        setLoading(true);
                        await sendOTP(formData.phoneNumber);
                        toast.success("OTP sent again to your phone");
                      } catch (error) {
                        toast.error("Failed to resend OTP");
                      } finally {
                        setLoading(false);
                      }
                    }}
                    type="button"
                    className="text-sm text-stone-600 hover:text-stone-900"
                    disabled={loading}
                  >
                    Resend code
                  </button>
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
                  placeholder="Italian, Indian, etc."
                  disabled={loading}
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
                  placeholder="Tell us about your restaurant..."
                  disabled={loading}
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
                  placeholder="Full address"
                  disabled={loading}
                />
              </div>
            )}

            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handleBackClick}
                disabled={step === 1 || loading}
                type="button"
                className="w-12 h-12 flex items-center justify-center rounded-full border-none bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors shadow-none disabled:bg-stone-200 disabled:text-stone-600 cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft size={20} weight="bold" />
              </button>
              <button
                onClick={handleNextClick}
                disabled={loading}
                type="button"
                className="w-12 h-12 flex items-center justify-center rounded-full border-none bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors shadow-none disabled:bg-stone-200 disabled:text-stone-600 cursor-pointer"
                aria-label="Continue"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin" />
                ) : (
                  <ArrowRight size={20} weight="bold" />
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
