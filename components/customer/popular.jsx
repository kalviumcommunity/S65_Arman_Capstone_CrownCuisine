"use client";

import React from "react";

// Dummy data for popular restaurants
const popularRestaurants = [
  { id: 1, name: "Restaurant A", cuisine: "Italian", rating: 4.5 },
  { id: 2, name: "Restaurant B", cuisine: "Mexican", rating: 4.2 },
  { id: 3, name: "Restaurant C", cuisine: "Japanese", rating: 4.8 },
];

export default function Popular() {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Popular Restaurants</h2>
      <p className="text-gray-600 mt-2">Discover highly-rated restaurants near you.</p>
      <div className="mt-4 space-y-3">
        {popularRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="p-3 border border-gray-200 rounded-md hover:shadow-lg transition-shadow">
            <h3 className="font-medium text-gray-700">{restaurant.name}</h3>
            <p className="text-sm text-gray-500">Cuisine: {restaurant.cuisine}</p>
            <p className="text-sm text-gray-500">Rating: {restaurant.rating} / 5</p>
          </div>
        ))}
      </div>
    </div>
  );
}
