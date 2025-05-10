"use client";

import React from "react";

// Dummy data for favorites
const favoriteRestaurants = [
  {
    id: 1,
    name: "Restaurant Delta",
    cuisine: "Indian",
    lastVisited: "2023-10-01",
  },
  {
    id: 2,
    name: "Restaurant Epsilon",
    cuisine: "Thai",
    lastVisited: "2023-08-20",
  },
];

const favoriteMenus = [
  {
    id: 1,
    itemName: "Pad Thai",
    restaurantName: "Restaurant Epsilon",
    price: "$12.99",
  },
  {
    id: 2,
    itemName: "Butter Chicken",
    restaurantName: "Restaurant Delta",
    price: "$15.50",
  },
];

export default function Favorites() {
  // In a real app, you'd filter based on the active sub-tab (e.g., 'restaurants' vs 'menus')
  // For this example, we'll display both sections

  return (
    <div className="p-4 bg-white shadow-md rounded-lg space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Favorite Restaurants</h2>
        {favoriteRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteRestaurants.map((fav) => (
              <div key={fav.id} className="p-3 border border-gray-200 rounded-md hover:shadow-lg transition-shadow">
                <h3 className="font-medium text-gray-700">{fav.name}</h3>
                <p className="text-sm text-gray-500">Cuisine: {fav.cuisine}</p>
                <p className="text-sm text-gray-500">Last Visited: {fav.lastVisited}</p>
                <button className="mt-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No favorite restaurants yet.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Favorite Menu Items</h2>
        {favoriteMenus.length > 0 ? (
          <div className="space-y-3">
            {favoriteMenus.map((item) => (
              <div key={item.id} className="p-3 border border-gray-200 rounded-md">
                <h3 className="font-medium text-gray-700">{item.itemName}</h3>
                <p className="text-sm text-gray-500">From: {item.restaurantName}</p>
                <p className="text-sm text-gray-500">Price: {item.price}</p>
                <button className="mt-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No favorite menu items yet.</p>
        )}
      </div>
    </div>
  );
}
