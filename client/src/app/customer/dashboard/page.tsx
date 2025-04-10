"use client";

import React from "react";
import { RestaurantCard } from "@/components/customer/restaurant-card";
import type { Restaurant } from "@/components/customer/restaurant-card";
import { CalendarDays, Heart, Search, Gift } from "lucide-react";

const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Haveli Eastwood",
    description:
      "Traditional Punjabi thali in a rustic village setting. Live folk music evenings.",
    imageUrl:
      "https://images.unsplash.com/photo-1562945431-ce2b63d5a7fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
    cuisine: "Punjabi",
    location: "GT Road",
  },
  {
    id: "2",
    name: "Bella Cucina",
    description:
      "Authentic Italian pasta and thin-crust pizzas. Cozy ambiance.",
    imageUrl:
      "https://images.unsplash.com/photo-1562945431-ce2b63d5a7fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.4,
    cuisine: "Italian",
    location: "Ranjit Avenue",
  },
  {
    id: "3",
    name: "Dragon House",
    description:
      "Pan-Asian cuisine featuring dim sum, noodles, and wok favorites.",
    imageUrl:
      "https://images.unsplash.com/photo-1562945431-ce2b63d5a7fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.2,
    cuisine: "Chinese/Thai",
    location: "Mall Road",
  },
  {
    id: "4",
    name: "Urban Grill",
    description:
      "Sizzlers, steaks, and continental dishes. Perfect for casual dining.",
    imageUrl:
      "https://images.unsplash.com/photo-1562945431-ce2b63d5a7fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.0,
    cuisine: "Continental",
    location: "Lawrence Road",
  },
];

export default function CustomerDashboardPage() {
  const currentDate = new Date().toLocaleDateString("en-IN", {
    dateStyle: "long",
  });

  return (
    <div className="min-h-screen bg-stone-200">
      <div className="relative overflow-hidden bg-stone-200">
        <div className="container relative z-10 mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black tracking-tight">
              Afternoon, <span className="italic">Arman</span>
            </h1>
            <p className="mt-6 text-lg text-black/80 font-serif max-w-2xl mx-auto">
              Discover top restaurants near you, from local favorites to global
              flavors. Whether you're craving comfort food or something new,
              there's a spot waiting.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-lg p-6 shadow-md mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button className="flex flex-col items-center justify-center bg-stone-100 hover:bg-stone-200 transition p-4 rounded-lg">
              <CalendarDays className="text-xl mb-2" />
              <span className="text-sm">My Reservations</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-stone-100 hover:bg-stone-200 transition p-4 rounded-lg">
              <Heart className="text-xl mb-2" />
              <span className="text-sm">Saved Places</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-stone-100 hover:bg-stone-200 transition p-4 rounded-lg">
              <Search className="text-xl mb-2" />
              <span className="text-sm">Search</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-stone-100 hover:bg-stone-200 transition p-4 rounded-lg">
              <Gift className="text-xl mb-2" />
              <span className="text-sm">Offers</span>
            </button>
          </div>
        </div>
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockRestaurants.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                priority={index < 4}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
