"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Heart, Ticket } from "lucide-react";

const CustomerPreview = () => {
  const reservations = [
    {
      id: "res-1",
      restaurantName: "La Piazza",
      time: "7:30 PM",
      guests: 2,
    },
    {
      id: "res-2",
      restaurantName: "Sakura Sushi",
      time: "6:00 PM",
      guests: 4,
    },
    {
      id: "res-3",
      restaurantName: "Bistro Moderne",
      time: "8:00 PM",
      guests: 2,
    },
    {
      id: "res-4",
      restaurantName: "The Cozy Corner Cafe",
      time: "10:00 AM",
      guests: 1,
    },
  ];

  return (
    <Card className="w-full max-w-6xl mx-auto overflow-hidden bg-stone-200 border-none shadow-xl">
      <div className="bg-stone-200 py-10 text-stone-900 text-center">
        <h1 className="text-3xl font-serif mb-2">Afternoon, <i>Arman</i></h1>
        <p className="text-sm text-stone-800 font-serif">
          Discover and explore top restaurants, browse menus, reserve tables instantly, <br/>
          manage your reservations, and save special coupons for future visits.
        </p>
      </div>
      
      <div className="p-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {reservations.map((reservation) => (
              <Card key={reservation.id} className="mb-3 bg-stone-100 shadow-sm">
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-sm">{reservation.restaurantName}</h3>
                    <p className="text-xs text-stone-600">{reservation.time} - Guests: {reservation.guests}</p>
                  </div>
                  <Badge className="bg-green-50 text-green-700 border border-green-200 text-xs">
                    Confirmed
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card className="bg-stone-100 shadow-sm">
              <div className="p-3">
                <h2 className="text-base font-medium mb-1">Find Restaurants</h2>
                <p className="text-xs text-stone-600 mb-2">Search for restaurants by name, cuisine or location</p>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-stone-400" />
                  <Input 
                    type="text" 
                    placeholder="Search restaurants..." 
                    className="pl-7 bg-white border-stone-200 text-xs h-8"
                  />
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-stone-100 shadow-sm text-center p-4">
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-full p-2 mb-2">
                    <Heart className="h-4 w-4 text-stone-500" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">Your Favorites</h3>
                  <p className="text-xs text-stone-500">
                    View and manage your favorite restaurants and menus.
                  </p>
                </div>
              </Card>

              <Card className="bg-stone-100 shadow-sm text-center p-4">
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-full p-2 mb-2">
                    <Ticket className="h-4 w-4 text-stone-500" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">Your Coupons</h3>
                  <p className="text-xs text-stone-500">
                    Access rewards and offers for discounts on future orders.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomerPreview;
