"use client";

import { useState, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { registerCustomer, verifyOTP, sendOTP, updateUserProfile } from "@/app/api/auth";
import { toast } from "sonner";

const TITLES = [
  "What should we call you?",
  "What is your phone number?",
  "Can you verify your number?",
  "Where are you located?",
];

const DESCRIPTIONS = [
  "Please enter your full name and avoid including any numbers or special characters to ensure it's clear and easy to read.",
  "Please enter your phone number and avoid including any letters or special characters to ensure it's clear and easy to read.",
  "Please verify your phone number by entering the OTP sent to your device. This helps ensure your number is accurate and valid.",
  "Please enter your address so we can recommend the best restaurants near you for a great experience.",
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

export default function CustomerProfileSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    otp: "",
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
    } else if (step === 2 && !formData.phoneNumber) {
      setError("Please enter your phone number");
      return;
    } else if (step === 3 && !formData.otp) {
      setError("Please enter the verification code");
      return;
    } else if (step === 4 && !formData.location) {
      setError("Please enter your location");
      return;
    }

    try {
      setLoading(true);
      
      // Handle OTP sending when moving from step 2 to 3
      if (step === 2) {
        // Check if OTP was already sent
        if (!otpSent) {
          try {
            // Register customer
            const data = await registerCustomer({
              name: formData.name,
              phoneNumber: formData.phoneNumber,
            });
            
            toast.success("OTP sent to your phone");
            setOtpSent(true);
          } catch (error) {
            if (error.response?.status === 400 && error.response?.data?.message === 'Customer already exists') {
              // If customer exists, just send the OTP
              await sendOTP(formData.phoneNumber);
              toast.success("OTP sent to your phone");
              setOtpSent(true);
            } else {
              // Handle other errors
              toast.error(error.response?.data?.message || "Error sending OTP");
              setStep(2); // Stay on phone number step
              setLoading(false);
              return;
            }
          }
        }
      }
      
      // Verify OTP when moving from step 3 to 4
      if (step === 3) {
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
      
      // Complete registration when finishing step 4
      if (step === 4) {
        try {
          // Update profile with location
          await updateUserProfile({ location: formData.location });
          router.push("/customer/dashboard");
        } catch (error) {
          toast.error(error.response?.data?.message || "Error updating profile");
          setLoading(false);
          return;
        }
      }
      
      // Proceed to next step
      if (step < 4) {
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

  const progressValue = ((step - 1) / 3) * 100;

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

            {step === 3 && (
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

            {step === 4 && (
              <div className="space-y-3">
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border-none bg-stone-100 focus:border-stone-900 h-12 w-72 mx-auto text-center"
                  placeholder="Your address"
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
