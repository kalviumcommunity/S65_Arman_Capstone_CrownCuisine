"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Heart, Ticket } from "lucide-react";

const Actions = () => {
  return (
    <div className="h-full flex flex-col">
      <Card className="border-none shadow-none bg-stone-100 mb-4 rounded-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-stone-900">
            Find Restaurants
          </CardTitle>
          <CardDescription className="text-stone-500">
            Search for restaurants by name, cuisine or location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-400" />
              <Input
                type="text"
                placeholder="Search restaurants..."
                className="border-stone-200 pl-9 focus-visible:ring-stone-500 shadow-none rounded-md"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 flex-grow">
        <Card className="group border-none shadow-none bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer overflow-hidden h-full flex flex-col rounded-md">
          <div className="flex flex-col items-center justify-center p-4 text-center flex-grow">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-md">
              <Heart className="h-7 w-7 text-stone-600" />
            </div>
            <h3 className="font-semibold text-stone-800 text-lg mb-2">
              Your Favorites
            </h3>
            <p className="text-stone-500 text-sm">
              View and manage your favorite <br /> restaurants and menus.
            </p>
          </div>
        </Card>

        <Card className="group border-none shadow-none bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer overflow-hidden h-full flex flex-col rounded-md">
          <div className="flex flex-col items-center justify-center p-4 text-center flex-grow">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-md">
              <Ticket className="h-7 w-7 text-stone-600" />
            </div>
            <h3 className="font-semibold text-stone-800 text-lg mb-2">
              Your Coupons
            </h3>
            <p className="text-stone-500 text-sm">
              Access rewards and offers for <br /> discounts on future orders.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Actions;
