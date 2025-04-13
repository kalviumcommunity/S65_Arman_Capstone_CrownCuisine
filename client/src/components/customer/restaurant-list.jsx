"use client";

import React from "react";
import RestaurantCard from "./restaurant-card";

const RestaurantList = ({ restaurants }) => {
  const defaultRestaurants = [
    {
      id: "rest-1",
      name: "La Piazza",
      image: "/placeholder-restaurant-1.jpg",
      cuisine: "Italian",
      rating: 4.7,
      distance: "1.2 km away",
      openingHours: "9:00 AM - 10:00 PM",
    },
    {
      id: "rest-2",
      name: "Sakura Sushi",
      image: "/placeholder-restaurant-2.jpg",
      cuisine: "Japanese",
      rating: 4.5,
      distance: "0.8 km away",
      openingHours: "11:00 AM - 9:30 PM",
    },
    {
      id: "rest-3",
      name: "Spice Garden",
      image: "/placeholder-restaurant-3.jpg",
      cuisine: "Indian",
      rating: 4.3,
      distance: "2.0 km away",
      openingHours: "10:00 AM - 11:00 PM",
    },
    {
      id: "rest-4",
      name: "Burger Joint",
      image: "/placeholder-restaurant-4.jpg",
      cuisine: "American",
      rating: 4.2,
      distance: "1.5 km away",
      openingHours: "11:30 AM - 10:00 PM",
    },
  ];

  const restaurantList = restaurants || defaultRestaurants;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-stone-800">Restaurants Near You</h2>
        <div className="text-sm text-stone-500">Showing {restaurantList.length} restaurants</div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {restaurantList.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList; 