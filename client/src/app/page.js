"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AuthModal from "@/components/auth/auth-card";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-stone-200">
      <div className="flex-grow">
        <main className="h-full">
          <section className="flex h-full items-center justify-center bg-stone-200">
            <div className="container px-4 md:px-6 text-center">
              <div className="mx-auto max-w-3xl space-y-6">
                <h1 className="text-4xl font-serif tracking-tighter text-stone-900 sm:text-5xl md:text-6xl lg:text-7xl">
                  Manage Your Restaurant!
                </h1>
                <p className="mx-auto max-w-2xl text-lg font-serif text-stone-800 md:text-xl">
                  Make running your restaurant simple! Our easy-to-use app lets
                  you manage menus, reservations, staff schedules, and inventory,
                  all in one place.
                </p>
                <div className="pt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    onClick={() => setIsAuthModalOpen(true)}
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-[200px] rounded-full bg-white py-3 md:py-6 text-stone-900 hover:bg-stone-200 cursor-pointer shadow-none"
                  >
                    Get Started <ArrowRight className="h-5 w-5" />
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-[200px] rounded-full bg-white py-3 md:py-6 text-stone-900 hover:bg-stone-200 cursor-pointer shadow-none"
                  >
                    <Link href="/features">
                      Learn More <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* Display the Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
