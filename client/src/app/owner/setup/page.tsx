"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check, AlertCircle } from "lucide-react";

interface RestaurantFormData {
  name: string;
  location: string;
  speciality: string;
  description: string;
  logo: File | null;
}

export default function RestaurantSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState<RestaurantFormData>({
    name: "",
    location: "",
    speciality: "",
    description: "",
    logo: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const totalSteps = 5;
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError(null);
  };

  const handleSpecialityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, speciality: value }));
    setValidationError(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    // Validate current step before proceeding
    if (!isCurrentStepValid()) {
      setValidationError("Please fill out this field before continuing");
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setValidationError(null);
    } else {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setValidationError(null);
    }
  };

  const isCurrentStepValid = (): boolean => {
    switch (currentStep) {
      case 0: // Restaurant name
        return formData.name.trim() !== "";
      case 1: // Location
        return formData.location.trim() !== "";
      case 2: // Speciality
        return formData.speciality.trim() !== "";
      case 3: // Description
        return formData.description.trim() !== "";
      case 4: // Logo
        return true; // Logo is optional
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Create FormData object to handle file upload
      const data = new FormData();
      data.append("name", formData.name);
      data.append("location", formData.location);
      data.append("speciality", formData.speciality);
      data.append("description", formData.description);
      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      // TODO: Replace with your actual API endpoint
      // const response = await fetch("/api/restaurant/setup", {
      //   method: "POST",
      //   body: data,
      // });

      // if (response.ok) {
      //   router.push("/owner/dashboard");
      // }

      // For now just redirect
      console.log("Restaurant data:", formData);

      // Show success message (could be replaced with proper notification)
      setTimeout(() => {
        router.push("/owner/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error submitting restaurant data:", error);
      setValidationError(
        "There was a problem saving your restaurant information"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const cuisineOptions = [
    "Italian",
    "Chinese",
    "Japanese",
    "Indian",
    "Mexican",
    "American",
    "Other",
  ];

  const getProgressPercentage = () => {
    return ((currentStep + 1) / totalSteps) * 100;
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-center">
              What's the name of your restaurant?
            </h3>
            <Input
              id="name"
              name="name"
              placeholder="Enter your restaurant name"
              value={formData.name}
              onChange={handleInputChange}
              className={validationError ? "border-red-500" : ""}
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-center">
              Where is your restaurant located?
            </h3>
            <Input
              id="location"
              name="location"
              placeholder="Enter your restaurant address"
              value={formData.location}
              onChange={handleInputChange}
              className={validationError ? "border-red-500" : ""}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-center">
              What cuisine does your restaurant specialize in?
            </h3>
            <Select
              value={formData.speciality}
              onValueChange={handleSpecialityChange}
            >
              <SelectTrigger
                id="speciality"
                className={validationError ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select your cuisine speciality" />
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
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-center">
              Tell us about your restaurant
            </h3>
            <Textarea
              id="description"
              name="description"
              placeholder="Share details about your restaurant, menu highlights, ambiance, etc."
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className={validationError ? "border-red-500" : ""}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-center">
              Upload your restaurant's logo
            </h3>
            <div className="flex flex-col items-center gap-4">
              {previewLogo ? (
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
                  <img
                    src={previewLogo}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-32 h-32 rounded-full bg-muted">
                  <p className="text-sm text-muted-foreground">Logo Preview</p>
                </div>
              )}
              <Input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="max-w-xs cursor-pointer"
              />
              <p className="text-sm text-muted-foreground text-center">
                Upload a square image for best results
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-md mx-auto py-10 px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Restaurant Setup
          </CardTitle>
          <CardDescription className="text-center">
            Tell customers about your restaurant
          </CardDescription>

          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-2 mt-4">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <div className="text-xs text-muted-foreground text-right mt-1">
            Step {currentStep + 1} of {totalSteps}
          </div>
        </CardHeader>

        <CardContent className="px-8 pt-6 pb-8">
          <div className="min-h-[220px] flex flex-col items-center justify-center">
            {renderQuestion()}

            {validationError && (
              <div className="flex items-center gap-2 text-red-500 mt-2 text-sm">
                <AlertCircle size={16} />
                <span>{validationError}</span>
              </div>
            )}

            {currentStep === totalSteps - 1 && isSubmitting && (
              <div className="mt-4 text-center text-primary font-medium">
                Saving your restaurant information...
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between px-8 pb-8">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button onClick={handleNextStep} disabled={isSubmitting}>
            {currentStep === totalSteps - 1 ? (
              <>
                Complete
                <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
