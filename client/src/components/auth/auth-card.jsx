"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const AuthModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setError(null);
    setStep("password");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim() || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/auth/setup");
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Failed to authenticate. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      setError(null);
      setStep("email");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.1, 0.3, 1.0] }}
            className="fixed inset-0 bg-black/20 backdrop-blur-md z-40"
            onClick={onClose}
          />
          <div className="fixed bottom-4 left-4 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.1, 0.3, 1.0] }}
              className="bg-stone-200 rounded-lg shadow-sm p-12 w-[420px]"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <h2 className="text-lg text-stone-900 font-semibold lg:text-2xl whitespace-nowrap">
                  Sign in or create an account
                </h2>
                <p className="text-sm text-stone-800 mt-3">
                  Enter your email to get started and access <br /> all the
                  features of our platform
                </p>
              </div>

              {step === "email" ? (
                <form onSubmit={handleEmailSubmit} className="w-full">
                  <div className="relative w-full">
                    <input
                      type="email"
                      placeholder="crown@cuisine.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 bg-white rounded-full text-stone-900 pr-14 focus:outline-none focus:ring-2 focus:ring-stone-300"
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 p-0 flex items-center justify-center cursor-pointer bg-stone-400 hover:bg-stone-500"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-white" />
                      ) : (
                        <ArrowRight className="h-5 w-5 text-white" />
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="w-full">
                  <div className="relative w-full">
                    <input
                      type="password"
                      placeholder="crown@cuisine"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-6 py-4 bg-white rounded-full text-stone-900 pr-14 focus:outline-none focus:ring-2 focus:ring-stone-300"
                      disabled={isLoading}
                      autoFocus
                    />
                    <Button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 p-0 flex items-center justify-center cursor-pointer bg-stone-400 hover:bg-stone-500"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-white" />
                      ) : (
                        <ArrowRight className="h-5 w-5 text-white" />
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
