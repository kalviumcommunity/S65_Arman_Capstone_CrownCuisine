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
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    otp: "",
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
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Temporarily just save to localStorage and redirect
      localStorage.setItem("customerProfile", JSON.stringify(formData));
      router.push("/customer/dashboard");
    }
  };

  const handleBackClick = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progressValue = ((step - 1) / 3) * 100;

  return (
    <main className="relative z-1 min-h-screen flex flex-col justify-center items-center bg-stone-300 text-stone-950">
      <div className="w-full max-w-3xl p-8">
        <Progress value={progressValue} className="h-3 mb-10 w-1/2 mx-auto" />

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
                className="border-none bg-stone-100 focus:border-stone-900 h-12 w-72 mx-auto text-center"
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

          {step === 4 && (
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
        </div>
      </div>
    </main>
  );
}
