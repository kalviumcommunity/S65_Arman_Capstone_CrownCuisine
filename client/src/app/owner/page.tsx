"use client";

import { useState, ChangeEvent } from "react";
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
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  AlertCircle,
  Upload,
} from "lucide-react";

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

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
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
      case 0:
        return formData.name.trim() !== "";
      case 1:
        return formData.location.trim() !== "";
      case 2:
        return formData.speciality.trim() !== "";
      case 3:
        return formData.description.trim() !== "";
      case 4:
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
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
            <h3 className="text-5xl font-serif whitespace-nowrap mb-4">
              What's the name of your restaurant?
            </h3>
            <p className="text-stone-600 font-serif mb-6">
              Please enter your restaurant&aphos;s official name as customers
              will see it. <br /> Use only letters, numbers, and spaces, no
              special characters.
            </p>
            <Input
              id="name"
              name="name"
              placeholder="Enter your restaurant name"
              value={formData.name}
              onChange={handleInputChange}
              className={`mx-auto max-w-xs text-center ${validationError ? "border-red-500" : ""}`}
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4 text-center">
            <h3 className="text-5xl font-serif whitespace-nowrap mb-4">
              Where is your restaurant located?
            </h3>
            <p className="text-stone-600 font-serif mb-6">
              Please enter your restaurant&apos;s complete address, including
              street and city. <br /> This helps customers easily find your
              location.
            </p>
            <Input
              id="location"
              name="location"
              placeholder="Enter your restaurant address"
              value={formData.location}
              onChange={handleInputChange}
              className={`mx-auto max-w-xs text-center ${validationError ? "border-red-500" : ""}`}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 text-center">
            <h3 className="text-5xl font-serif whitespace-nowrap mb-4">
              What cuisine does your restaurant specialize in?
            </h3>
            <p className="text-stone-600 font-serif mb-6">
              Select your restaurant&apos;s primary cuisine type from the list.{" "}
              <br /> Choose the one that best represents your menu.
            </p>
            <Select
              value={formData.speciality}
              onValueChange={handleSpecialityChange}
            >
              <SelectTrigger
                id="speciality"
                className={`mx-auto max-w-xs bg-stone-200 text-center justify-center ${validationError ? "border-red-500" : ""}`}
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
          <div className="space-y-4 text-center">
            <h3 className="text-5xl font-serif whitespace-nowrap mb-4">
              Tell us about your restaurant
            </h3>
            <p className="text-stone-600 font-serif mb-6">
              Describe your restaurant&apos;s atmosphere, unique dishes, and
              what sets it apart. <br /> This helps customers understand the
              experience you offer.
            </p>
            <Textarea
              id="description"
              name="description"
              placeholder="Share details about your restaurant, menu highlights, ambiance, etc."
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className={`mx-auto max-w-sm text-center ${validationError ? "border-red-500" : ""}`}
              style={{ resize: "none" }}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 text-center">
            <h3 className="text-5xl font-serif whitespace-nowrap mb-4">
              Upload your restaurant's logo
            </h3>
            <p className="text-stone-600 font-serif mb-6">
              Upload a high-quality logo that represents your restaurant&apos;s
              brand. <br /> A clear and recognizable logo builds trust with
              customers. <br /> For best results, use a square image.
            </p>
            <div className="flex flex-col items-center gap-4">
              {previewLogo ? (
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary mx-auto group cursor-pointer">
                  <img
                    src={previewLogo}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                  />
                  <label
                    htmlFor="logo"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Upload className="h-8 w-8 text-white" />
                    <Input
                      id="logo"
                      name="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="logo"
                  className="relative flex items-center justify-center w-32 h-32 rounded-full bg-stone-400 mx-auto mb-4 cursor-pointer hover:bg-stone-500 transition-colors"
                >
                  <Upload className="h-8 w-8 text-white" />
                  <Input
                    id="logo"
                    name="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
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
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
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
                  Saving your restaurant information...
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-center gap-4 px-8 pb-8 bg-transparent">
            <Button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="rounded-full p-3 w-12 h-12 bg-white border-0 hover:bg-stone-200 cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 text-black" />
              <span className="sr-only">Previous</span>
            </Button>

            <Button
              onClick={handleNextStep}
              disabled={isSubmitting}
              className="rounded-full p-3 w-12 h-12 bg-white border-0 hover:bg-stone-200 cursor-pointer"
            >
              {currentStep === totalSteps - 1 ? (
                <Check className="h-5 w-5 text-black" />
              ) : (
                <ArrowRight className="h-5 w-5 text-black" />
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
