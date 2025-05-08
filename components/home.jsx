"use client";

import { instrumentSerif } from "@/app/fonts";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative z-1 min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className={`${instrumentSerif.className} text-8xl font-medium text-stone-900`}
          >
            <span className="block">Serve Better.</span>
            <span className="block">
              Manage <em className="italic">Smarter.</em>
            </span>
          </h1>

          <p className="max-w-lg mx-auto text-md mt-6 mb-8 text-stone-800">
            Manage orders, reservations, staff, and inventory all in one place.
            Get real-time insights to boost efficiency and deliver great
            service.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/welcome-setup">
              <Button
                variant="outline"
                className="border-none rounded-full bg-stone-100 hover:bg-stone-200 hover:text-stone-900 cursor-pointer !px-6 !py-6"
              >
                Get Started <ArrowRight weight="bold" size={16} />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-none rounded-full bg-stone-100 hover:bg-stone-200 hover:text-stone-900 cursor-pointer !px-6 !py-6"
            >
              Learn More <ArrowRight weight="bold" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
