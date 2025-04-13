"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaTwitter } from "react-icons/fa";

export const AuthModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Use Better Auth to sign in with Google
      await authClient.signIn.social({
        provider: "google",
      });

      router.push("/dashboard");
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Failed to authenticate with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      setError(null);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-md z-40"
            onClick={onClose}
          />
          <div className="fixed bottom-4 left-4 z-50">
            <div className="bg-stone-200 rounded-lg shadow-xl p-12 w-[420px]">
              <div className="flex flex-col items-center text-center mb-6">
                <h2 className="text-lg text-stone-900 font-semibold lg:text-2xl whitespace-nowrap">
                  Sign in or create an account
                </h2>
                <p className="text-sm text-stone-800 mt-3">
                  Want full access now? Sign in with Google or <br /> Twitter to
                  save your data and enjoy <br /> all the features!
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleGoogleAuth}
                  className="w-1/2 bg-white text-stone-900 hover:bg-stone-200 rounded-full flex items-center justify-center py-6 cursor-pointer shadow-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <FaGoogle size={30} />
                  )}
                </Button>

                <Button
                  onClick={() => {
                    /* Twitter auth logic here */
                  }}
                  className="w-1/2 bg-white text-stone-900 hover:bg-stone-200 rounded-full flex items-center justify-center py-6 cursor-pointer shadow-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <FaTwitter size={30} />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AuthModal;
