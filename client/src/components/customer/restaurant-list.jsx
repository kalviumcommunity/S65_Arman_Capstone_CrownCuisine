"use client";

import React, { useState, useEffect } from "react";
import RestaurantCard from "./restaurant-card";

const RestaurantList = ({ restaurants }) => {
  const defaultRestaurants = [
    {
      id: "rest-1",
      name: "La Piazza",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cuisine: "Italian",
      rating: 4.7,
      distance: "1.2 km away",
      openingHours: "9:00 AM - 10:00 PM",
    },
    {
      id: "rest-2",
      name: "Sakura Sushi",
      image:
        "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cuisine: "Japanese",
      rating: 4.5,
      distance: "0.8 km away",
      openingHours: "11:00 AM - 9:30 PM",
    },
    {
      id: "rest-3",
      name: "Spice Garden",
      image:
        "https://images.unsplash.com/photo-1606728035253-49e8a23146de?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cuisine: "Indian",
      rating: 4.3,
      distance: "2.0 km away",
      openingHours: "10:00 AM - 11:00 PM",
    },
    {
      id: "rest-4",
      name: "Burger Joint",
      image:
        "https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=1890&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cuisine: "American",
      rating: 4.2,
      distance: "1.5 km away",
      openingHours: "11:30 AM - 10:00 PM",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  // Store the restaurants in a ref to avoid dependency issues
  const restaurantsRef = React.useRef(restaurants || defaultRestaurants);

  // Filter restaurants based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredRestaurants(restaurantsRef.current);
    } else {
      const filtered = restaurantsRef.current.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  }, [searchQuery]); // Only depend on searchQuery

  // Update ref when restaurants prop changes
  useEffect(() => {
    restaurantsRef.current = restaurants || defaultRestaurants;
    setFilteredRestaurants(restaurantsRef.current);
  }, [restaurants]);

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or cuisine..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      {filteredRestaurants.length === 0 && (
        <p className="text-center text-gray-500">No restaurants found matching your search.</p>
      )}
    </div>
  );
};

export default RestaurantList;
