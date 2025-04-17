"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ExternalLink } from "lucide-react";

const stone300 = "#d6d3d1";

const RestaurantList = ({ restaurants }) => {
  const defaultRestaurants = [
    {
      id: "r1",
      name: "La Piazza",
      cuisine: "Italian",
      location: "Downtown",
      status: "open",
      rating: 4.7,
    },
    {
      id: "r2",
      name: "Sakura Sushi",
      cuisine: "Japanese",
      location: "Uptown",
      status: "closed",
      rating: 4.5,
    },
    {
      id: "r3",
      name: "Bistro Moderne",
      cuisine: "French",
      location: "Midtown",
      status: "open",
      rating: 4.8,
    },
    {
      id: "r4",
      name: "The Cozy Corner Cafe",
      cuisine: "Cafe",
      location: "Old Town",
      status: "open",
      rating: 4.3,
    },
    {
      id: "r5",
      name: "Spice Route",
      cuisine: "Indian",
      location: "Market Street",
      status: "closed",
      rating: 4.6,
    },
    {
      id: "r6",
      name: "El Rancho",
      cuisine: "Mexican",
      location: "West End",
      status: "open",
      rating: 4.4,
    },
  ];

  const restaurantList = restaurants || defaultRestaurants;

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-grow" style={{ minHeight: "500px" }}>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto h-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", maxHeight: "500px" }}
        >
          {restaurantList.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="bg-stone-100 border-none shadow-none overflow-hidden h-[200px] flex flex-col justify-between rounded-md"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-stone-900">
                    {restaurant.name}
                  </h3>
                  <div className="text-stone-900 font-medium">
                    {restaurant.rating} ★
                  </div>
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  {restaurant.cuisine} • {restaurant.location}
                </div>
              </div>
              <div className="p-4 border-t border-stone-200 flex items-center justify-between">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    restaurant.status === "open"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {restaurant.status === "open" ? "Open" : "Closed"}
                </span>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Gradient overlay - positioned relative to the scrollable container */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "80px",
            background: `linear-gradient(to bottom, transparent, ${stone300})`,
            zIndex: 1,
          }}
        />
      </div>

      <div className="mt-5 pt-4 border-stone-400 flex justify-end gap-3">
        <Button className="bg-stone-100 hover:bg-stone-300 text-stone-900 cursor-pointer">
          Add Restaurant <PlusCircle className="ml-1 h-4 w-4" />
        </Button>
        <Button className="bg-stone-100 hover:bg-stone-300 text-stone-900 cursor-pointer">
          View All Restaurants <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RestaurantList;
