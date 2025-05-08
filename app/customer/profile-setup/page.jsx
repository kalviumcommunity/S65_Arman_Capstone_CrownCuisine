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

export default function CustomerProfileSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    otp: "",
    location: "",
  });
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    if (step === 1 && !formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }
    if (step === 2) {
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = "Please enter your phone number";
      }
    }
    if (step === 3) {
      if (!formData.otp.trim()) {
        newErrors.otp = "Please enter the verification code";
      }
    }
    if (step === 4 && !formData.location.trim()) {
      newErrors.location = "Please enter your location";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (value) => {
    setFormData((prev) => ({ ...prev, otp: value }));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/customer/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push("/customer/dashboard");
      } else {
        const data = await response.json();
        setErrors({ submit: data.message || "Failed to create profile" });
      }
    } catch {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleNextClick = () => {
    if (loading) return;
    if (step === 1) {
      if (validateStep()) setStep(2);
    } else if (step === 2) {
      if (validateStep()) setStep(3);
    } else if (step === 3) {
      if (validateStep()) setStep(4);
    } else if (step === 4) {
      handleSubmit();
    }
  };

  const handleBackClick = () => {
    if (loading) return;
    if (step > 1) {
      setErrors({});
      setStep(step - 1);
    }
  };

  const progressValue = ((step - 1) / 3) * 100;

  return (
    <main className="relative z-1 min-h-screen flex flex-col justify-center items-center bg-stone-300 text-stone-950">
      <div className="w-full max-w-2xl p-8">
        {/* Progress Bar at the top */}
        <Progress value={progressValue} className="h-2 mb-10 w-1/2 mx-auto" />

        {/* Title and Description */}
        <div className="mb-10 text-center">
          <h1
            className={`${instrumentSerif.className} text-6xl font-medium mb-4`}
          >
            {TITLES[step - 1]}
          </h1>
          <p className="text-stone-700">{DESCRIPTIONS[step - 1]}</p>
        </div>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-3">
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-2 border-stone-400 bg-white focus:border-stone-900 h-12 w-72 mx-auto text-center"
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
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
                className="border-2 border-stone-400 bg-white focus:border-stone-900 h-12 w-72 mx-auto text-center"
              />
              {errors.phoneNumber && (
                <p className="text-red-600 text-sm">{errors.phoneNumber}</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={formData.otp}
                  onChange={handleOtpChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className="border-none bg-stone-100 h-12 w-12 text-xl"
                    />
                    <InputOTPSlot
                      index={1}
                      className="border-none bg-stone-100 h-12 w-12 text-xl"
                    />
                    <InputOTPSlot
                      index={2}
                      className="border-none bg-stone-100 h-12 w-12 text-xl"
                    />
                    <InputOTPSlot
                      index={3}
                      className="border-none bg-stone-100 h-12 w-12 text-xl"
                    />
                    <InputOTPSlot
                      index={4}
                      className="border-none bg-stone-100 h-12 w-12 text-xl"
                    />
                    <InputOTPSlot
                      index={5}
                      className="border-none bg-stone-100 h-12 w-12 text-xl"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {errors.otp && (
                <p className="text-red-600 text-sm text-center">{errors.otp}</p>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border-2 border-stone-400 bg-white focus:border-stone-900 h-12 w-72 mx-auto text-center"
              />
              {errors.location && (
                <p className="text-red-600 text-sm">{errors.location}</p>
              )}
            </div>
          )}

          {errors.submit && (
            <p className="text-red-600 text-sm mt-4">{errors.submit}</p>
          )}

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handleBackClick}
              disabled={loading || step === 1}
              type="button"
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 border-stone-400 bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors shadow-none disabled:bg-stone-200 disabled:text-stone-600`}
              aria-label="Back"
            >
              <ArrowLeft size={20} weight="bold" />
            </button>
            <button
              onClick={handleNextClick}
              disabled={loading}
              type="button"
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 border-stone-400 bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors shadow-none disabled:bg-stone-200 disabled:text-stone-600`}
              aria-label="Continue"
            >
              <ArrowRight size={20} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
