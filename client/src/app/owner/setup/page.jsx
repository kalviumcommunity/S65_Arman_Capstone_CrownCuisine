"use client";

import { useState, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";

export default function RestaurantSetup({ initialData = {} }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    location: initialData.location || "",
    speciality: initialData.speciality || "",
    description: initialData.description || "",
    logo: initialData.logo || null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [validationError, setValidationError] = useState(null);
  const totalSteps = 5;
  const [previewLogo, setPreviewLogo] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const isCurrentStepValid = () => {
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

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isSubmitting && !isAnimating) {
      if (isCurrentStepValid()) {
        if (currentStep < totalSteps - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          handleSubmit();
        }
      } else {
        setValidationError("Please fill out this field before continuing");
      }
    }
  };

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError(null);
  };

  const handleSpecialityChange = (value) => {
    setFormData((prev) => ({ ...prev, speciality: value }));
    setValidationError(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result);
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

  const cuisineOptions = ["Indian", "Chinese", "French", "Italian", "American"];

  const getProgressPercentage = () => {
    return ((currentStep + 1) / totalSteps) * 100;
  };

  const renderQuestion = () => {
    return (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.1, 0.3, 1.0] }}
      >
        {(() => {
          switch (currentStep) {
            case 0:
              return (
                <div className="space-y-4 text-center">
                  <h3 className="text-5xl text-stone-900 font-serif whitespace-nowrap mb-4">
                    What's the name of your restaurant?
                  </h3>
                  <p className="text-stone-800 font-serif mb-6">
                    Please enter your restaurant&apos;s official name as
                    customers will see it. <br /> Use only letters, numbers, and
                    spaces, no special characters.
                  </p>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your restaurant name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
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
                    Where is your restaurant located?
                  </h3>
                  <p className="text-stone-800 font-serif mb-6">
                    Please enter your restaurant&apos;s complete address,
                    including street and city. <br /> This helps customers
                    easily find your location.
                  </p>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Enter your restaurant address"
                    value={formData.location}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
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
                    What cuisine does your restaurant specialize in?
                  </h3>
                  <p className="text-stone-800 font-serif mb-6">
                    Select your restaurant&apos;s primary cuisine type from the
                    list. <br /> Choose the one that best represents your menu.
                  </p>
                  <Select
                    value={formData.speciality}
                    onValueChange={handleSpecialityChange}
                  >
                    <SelectTrigger
                      id="speciality"
                      className={`mx-auto max-w-xs bg-stone-200 text-center justify-center ${
                        validationError ? "border-red-500" : ""
                      }`}
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
                  <h3 className="text-5xl text-stone-900 font-serif whitespace-nowrap mb-4">
                    Tell us about your restaurant
                  </h3>
                  <p className="text-stone-800 font-serif mb-6">
                    Describe your restaurant&apos;s atmosphere, unique dishes,
                    and what sets it apart. <br /> This helps customers
                    understand the experience you offer.
                  </p>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Share details about your restaurant, menu highlights, ambiance, etc."
                    value={formData.description}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    rows={5}
                    className={`mx-auto max-w-sm text-center ${
                      validationError ? "border-red-500" : ""
                    }`}
                    style={{ resize: "none" }}
                  />
                </div>
              );
            case 4:
              return (
                <div className="space-y-4 text-center">
                  <h3 className="text-5xl text-stone-900 font-serif whitespace-nowrap mb-4">
                    Upload your restaurant&apos;s logo
                  </h3>
                  <p className="text-stone-800 font-serif mb-6">
                    Upload a high-quality logo that represents your
                    restaurant&apos;s brand. <br /> A clear and recognizable
                    logo builds trust with customers. <br /> For best results,
                    use a square image.
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
        })()}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isPageLoaded ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.1, 0.3, 1.0] }}
      className="min-h-screen bg-stone-200 flex items-center justify-center py-10 px-4"
    >
      <div className="max-w-md mx-auto">
        <Card className="w-full bg-stone-200 border-0 shadow-none">
          <CardHeader className="text-center bg-transparent">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isPageLoaded ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.1, 0.3, 1.0] }}
            >
              <div className="w-full bg-stone-300 rounded-full h-2 mt-4">
                <div
                  className="bg-stone-900 h-2 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </motion.div>
          </CardHeader>

          <CardContent className="px-8 pt-6 pb-8 bg-transparent">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isPageLoaded ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.1, 0.3, 1.0] }}
              className="min-h-[250px] flex flex-col items-center justify-center"
            >
              <AnimatePresence mode="wait">{renderQuestion()}</AnimatePresence>

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
            </motion.div>
          </CardContent>

          <CardFooter className="flex justify-center gap-4 px-8 pb-8 bg-transparent">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isPageLoaded ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.1, 0.3, 1.0] }}
              className="flex justify-center gap-4"
            >
              <Button
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="rounded-full p-3 w-12 h-12 bg-white border-0 hover:bg-stone-200 cursor-pointer"
              >
                <ArrowLeft className="h-5 w-5 text-stone-900" />
                <span className="sr-only">Previous</span>
              </Button>

              <Button
                onClick={handleNextStep}
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
            </motion.div>
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  );
}
