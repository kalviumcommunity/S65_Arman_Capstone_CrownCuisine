"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { instrumentSerif } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check } from "@phosphor-icons/react";

export default function CustomerProfileSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    otp: "",
    location: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1 && !formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }
    
    if (step === 2 && !formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Please enter your phone number";
    } else if (step === 2 && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    
    if (step === 3 && !formData.otp.trim()) {
      newErrors.otp = "Please enter the verification code";
    } else if (step === 3 && !/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = "Please enter a valid 6-digit verification code";
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

  const handleSendOTP = async () => {
    if (!validateStep()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: formData.phoneNumber })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setOtpSent(true);
        setCountdown(30); // 30 seconds cooldown
      } else {
        setErrors({ phoneNumber: data.message || "Failed to send OTP" });
      }
    } catch (error) {
      setErrors({ phoneNumber: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!validateStep()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber: formData.phoneNumber,
          otp: formData.otp
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        nextStep();
      } else {
        setErrors({ otp: data.message || "Invalid verification code" });
      }
    } catch (error) {
      setErrors({ otp: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/customer/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Successfully created profile, redirect to dashboard
        router.push('/customer/dashboard');
      } else {
        const data = await response.json();
        setErrors({ submit: data.message || "Failed to create profile" });
      }
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleNextClick = () => {
    if (step === 2) {
      handleSendOTP();
    } else if (step === 3) {
      handleVerifyOTP();
    } else if (step === 4) {
      handleSubmit();
    } else {
      nextStep();
    }
  };

  return (
    <main className="relative z-1 min-h-screen flex flex-col justify-center items-center bg-stone-300 text-stone-950">
      <div className="w-full max-w-md p-8">
        <div className="mb-10 text-center">
          <h1 className={`${instrumentSerif.className} text-4xl font-medium mb-4`}>
            {step === 1 && "What's your name?"}
            {step === 2 && "Your phone number?"}
            {step === 3 && "Verify your number"}
            {step === 4 && "Where are you located?"}
          </h1>
          <p className="text-stone-700">
            {step === 1 && "We'll use this to personalize your experience"}
            {step === 2 && "We'll send a verification code to this number"}
            {step === 3 && "Enter the 6-digit code we sent to your phone"}
            {step === 4 && "This helps us recommend restaurants near you"}
          </p>
        </div>

        <div className="flex gap-4 justify-between items-center mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className={`h-2 rounded-full flex-1 transition-colors ${
                i === step ? 'bg-stone-900' : 
                i < step ? 'bg-stone-700' : 'bg-stone-400'
              }`}
            />
          ))}
        </div>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-3">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="border-2 border-stone-400 bg-white focus:border-stone-900 h-12"
              />
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="1234567890"
                type="tel"
                className="border-2 border-stone-400 bg-white focus:border-stone-900 h-12"
              />
              {errors.phoneNumber && <p className="text-red-600 text-sm">{errors.phoneNumber}</p>}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="123456"
                className="border-2 border-stone-400 bg-white focus:border-stone-900 h-12 text-center text-xl tracking-widest"
                maxLength={6}
              />
              {errors.otp && <p className="text-red-600 text-sm">{errors.otp}</p>}
              
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-stone-600">
                  {countdown > 0 
                    ? `Resend code in ${countdown}s` 
                    : "Didn't receive a code?"}
                </p>
                <button
                  onClick={handleSendOTP}
                  disabled={countdown > 0 || loading}
                  className="text-sm text-stone-900 font-semibold disabled:text-stone-500"
                >
                  {countdown > 0 ? "Please wait" : "Resend Code"}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <Label htmlFor="location">Your Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="New York, NY"
                className="border-2 border-stone-400 bg-white focus:border-stone-900 h-12"
              />
              {errors.location && <p className="text-red-600 text-sm">{errors.location}</p>}
            </div>
          )}

          {errors.submit && (
            <p className="text-red-600 text-sm mt-4">{errors.submit}</p>
          )}

          <Button
            onClick={handleNextClick}
            disabled={loading}
            className="w-full h-12 mt-6 border-2 border-stone-900 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-md flex items-center justify-center gap-2"
          >
            {loading ? (
              "Processing..."
            ) : step === 4 ? (
              <>Finish <Check weight="bold" /></>
            ) : (
              <>Continue <ArrowRight weight="bold" /></>
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
