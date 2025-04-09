"use client";

import React from "react";
import Image from "next/image";
import { RestaurantCard } from "@/components/restaurant-card";
import type { Restaurant } from "@/components/restaurant-card";

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Updated header to match exact structure of other pages */}
      <div className="relative overflow-hidden bg-black w-full">
        <div className="container relative z-10 mx-auto px-4 pb-16 pt-20 text-center md:pb-24 md:pt-28 lg:pt-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Customer Dashboard
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
            Explore the best local restaurants, hidden gems, and culinary
            experiences right here in Amritsar, Punjab.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8 max-w-screen-xl">
        {" "}
        {/* Added max-w-screen-lg for centering and padding */}
        <div className="mb-6 pb-4 text-center">
          {" "}
          {/* Center the heading and description */}
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Available Restaurants
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Showing {mockRestaurants.length}{" "}
            {mockRestaurants.length === 1 ? "result" : "results"} as of{" "}
            {currentDate}.
          </p>
        </div>
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockRestaurants.map((restaurant, index) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              priority={index < 4}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
