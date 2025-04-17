"use client";

import React from "react";
import Link from "next/link";
import RestaurantList from "@/components/customer/restaurant-list";
import ReservationList from "@/components/customer/reservation";
import Actions from "@/components/customer/actions";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-stone-200">
      <div className="bg-stone-200 py-24 text-stone-900 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-serif mb-4">
            Afternoon, {" "}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/customer/profile">
                    <i className="hover:text-stone-600 transition-colors cursor-pointer">Arman</i>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h1>
          <p className="text-lg text-stone-800 font-serif">
            Discover and explore top restaurants, browse menus, reserve tables
            instantly, <br /> manage your reservations, and save special coupons
            for future visits.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="rounded-md bg-stone-300 p-4 shadow-none">
            <ReservationList />
          </div>

          <div className="rounded-md bg-stone-300 p-4 shadow-none">
            <Actions />
          </div>
        </div>

        <div className="rounded-md bg-stone-300 p-4 shadow-none">
          <RestaurantList />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
