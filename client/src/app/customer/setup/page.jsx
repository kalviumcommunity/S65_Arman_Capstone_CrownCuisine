"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  AlertCircle,
} from "lucide-react";

export default function CustomerSetup({ initialData = {} }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    phoneNumber: initialData.phoneNumber || "",
    favoriteCuisine: initialData.favoriteCuisine || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [validationError, setValidationError] = useState(null);
  const totalSteps = 3;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError(null);
  };

  const handleSpecialityChange = (value) => {
    setFormData((prev) => ({ ...prev, favoriteCuisine: value }));
    setValidationError(null);
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== "";
      case 1:
        return /^\d{10}$/.test(formData.phoneNumber.trim());
      case 2:
        return formData.favoriteCuisine.trim() !== "";
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call delay
      setTimeout(() => {
        router.push("/customer/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error submitting customer data:", error);
      setValidationError("There was a problem saving your information");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cuisineOptions = [
    "Indian",
    "Chinese",
    "Italian",
    "French",
    "Mexican",
    "Thai",
    "Japanese",
  ];

  const getProgressPercentage = () => {
    return ((currentStep + 1) / totalSteps) * 100;
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 text-center">
            <h3 className="text-5xl text-stone-900 font-serif whitespace-nowrap mb-4">
              What should we call you?
            </h3>
            <p className="text-stone-800 font-serif mb-6">
            Please enter your full name as it will appear on your orders. <br/>Avoid using numbers or special characters.
            </p>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              className={`mx-auto max-w-xs text-center ${
                validationError ? "border-red-500" : ""
              }`}
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4 text-center">
            <h3 className="text-5xl text-stone-900 font-serif whitespace-nowrap mb-4">
              What's your phone number?
            </h3>
            <p className="text-stone-800 font-serif mb-6">
            We'll use this to keep you informed about your food orders, table <br/> reservations, and any new deals or special offers.
            </p>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`mx-auto max-w-xs text-center ${
                validationError ? "border-red-500" : ""
              }`}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 text-center">
            <h3 className="text-5xl text-stone-900 font-serif whitespace-nowrap mb-4">
              What's your favorite cuisine?
            </h3>
            <p className="text-stone-800 font-serif mb-6">
            This helps us understand your preferences better so we can suggest <br/> restaurants, dishes, and offers that match your taste.
            </p>
            <Select
              value={formData.favoriteCuisine}
              onValueChange={(value) =>
                handleInputChange({
                  target: { name: "favoriteCuisine", value },
                })
              }
            >
              <SelectTrigger
                id="favoriteCuisine"
                className={`mx-auto max-w-xs bg-stone-200 text-center justify-center ${
                  validationError ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select your favorite cuisine" />
              </SelectTrigger>
              <SelectContent>
                {cuisineOptions.map((cuisine) => (
                  <SelectItem key={cuisine} value={cuisine}>
                    {cuisine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center py-10 px-4">
      <div className="max-w-md mx-auto">
        <Card className="w-full bg-stone-200 border-0 shadow-none">
          <CardHeader className="text-center bg-transparent">
            {/* Progress bar */}
            <div className="w-full bg-stone-300 rounded-full h-2 mt-4">
              <div
                className="bg-stone-900 h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pt-6 pb-8 bg-transparent">
            <div className="min-h-[250px] flex flex-col items-center justify-center">
              {renderQuestion()}

              {validationError && (
                <div className="flex items-center gap-2 text-red-500 mt-4 text-sm">
                  <AlertCircle size={16} />
                  <span>{validationError}</span>
                </div>
              )}

              {currentStep === totalSteps - 1 && isSubmitting && (
                <div className="mt-4 text-center text-primary font-medium">
                  Saving your information...
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-center gap-4 px-8 pb-8 bg-transparent">
            <Button
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              disabled={currentStep === 0}
              className="rounded-full p-3 w-12 h-12 bg-white border-0 hover:bg-stone-200 cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 text-stone-900" />
              <span className="sr-only">Previous</span>
            </Button>

            <Button
              onClick={() => {
                if (isCurrentStepValid()) {
                  if (currentStep < totalSteps - 1) {
                    setCurrentStep((prev) => prev + 1);
                  } else {
                    handleSubmit();
                  }
                } else {
                  setValidationError("Please fill out this field before continuing");
                }
              }}
              disabled={isSubmitting}
              className="rounded-full p-3 w-12 h-12 bg-white border-0 hover:bg-stone-200 cursor-pointer"
            >
              {currentStep === totalSteps - 1 ? (
                <Check className="h-5 w-5 text-stone-900" />
              ) : (
                <ArrowRight className="h-5 w-5 text-stone-900" />
              )}
              <span className="sr-only">
                {currentStep === totalSteps - 1 ? "Complete" : "Next"}
              </span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
