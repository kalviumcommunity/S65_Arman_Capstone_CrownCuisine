"use client";

import React, { useState } from "react";
import { instrumentSerif } from "@/app/fonts";
import { 
  MagnifyingGlass, 
  ForkKnife, 
  Star, 
  MapPin, 
  CaretDown, 
  SlidersHorizontal 
} from "@phosphor-icons/react";

// Dummy data for restaurants
const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.8,
    reviews: 124,
    distance: "0.8 mi",
    address: "123 Culinary Ave, Foodville",
    priceRange: "$$",
    image: "/placeholder-restaurant.jpg"
  },
  {
    id: 2,
    name: "Pasta Paradise",
    cuisine: "Italian",
    rating: 4.5,
    reviews: 89,
    distance: "1.2 mi",
    address: "456 Dining St, Foodville",
    priceRange: "$$$",
    image: "/placeholder-restaurant.jpg"
  },
  {
    id: 3,
    name: "Sushi Secret",
    cuisine: "Japanese",
    rating: 4.7,
    reviews: 103,
    distance: "0.5 mi",
    address: "789 Cuisine Blvd, Foodville",
    priceRange: "$$$",
    image: "/placeholder-restaurant.jpg"
  },
  {
    id: 4,
    name: "Taco Temple",
    cuisine: "Mexican",
    rating: 4.4,
    reviews: 78,
    distance: "1.5 mi",
    address: "321 Flavor Rd, Foodville",
    priceRange: "$",
    image: "/placeholder-restaurant.jpg"
  }
];

// Cuisine filter options
const cuisineOptions = ["All", "Indian", "Italian", "Japanese", "Mexican", "Thai", "Chinese"];

// Price range options
const priceOptions = ["Any", "$", "$$", "$$$", "$$$$"];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCuisine, setActiveCuisine] = useState("All");
  const [activePrice, setActivePrice] = useState("Any");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter restaurants based on selected filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = searchTerm === "" || 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCuisine = activeCuisine === "All" || restaurant.cuisine === activeCuisine;
    
    const matchesPrice = activePrice === "Any" || restaurant.priceRange.length === activePrice.length;
    
    return matchesSearch && matchesCuisine && matchesPrice;
  });

  return (
    <div>
      <h2 className={`${instrumentSerif.className} text-2xl font-medium flex items-center gap-2 mb-6`}>
        <MagnifyingGlass size={24} weight="fill" className="text-stone-700" />
        Find a Restaurant
      </h2>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <MagnifyingGlass size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search by restaurant name or cuisine..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
          />
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-600 hover:text-stone-800 px-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-stone-50 border border-stone-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-stone-700 mb-2">Cuisine Type</p>
              <div className="flex flex-wrap gap-2">
                {cuisineOptions.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => setActiveCuisine(cuisine)}
                    className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                      activeCuisine === cuisine
                        ? "bg-stone-800 text-white"
                        : "bg-white text-stone-700 border border-stone-300 hover:bg-stone-100"
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-stone-700 mb-2">Price Range</p>
              <div className="flex flex-wrap gap-2">
                {priceOptions.map((price) => (
                  <button
                    key={price}
                    onClick={() => setActivePrice(price)}
                    className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                      activePrice === price
                        ? "bg-stone-800 text-white"
                        : "bg-white text-stone-700 border border-stone-300 hover:bg-stone-100"
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Results */}
      <div className="space-y-4">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-stone-100">
              <div className="md:flex">
                <div className="md:flex-shrink-0 bg-stone-200 h-32 md:h-auto md:w-48">
                  {/* In a real app, you'd use an actual image here */}
                  <div className="w-full h-full flex items-center justify-center text-stone-500">
                    <ForkKnife size={32} />
                  </div>
                </div>
                <div className="p-4 md:flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-stone-800">{restaurant.name}</h3>
                      <p className="text-sm text-stone-600">{restaurant.cuisine} • {restaurant.priceRange}</p>
                    </div>
                    <div className="flex items-center bg-stone-100 px-2 py-1 rounded-lg">
                      <Star size={16} weight="fill" className="text-amber-500 mr-1" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                      <span className="text-xs text-stone-500 ml-1">({restaurant.reviews})</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-stone-500">
                    <MapPin size={14} className="mr-1" />
                    <span>{restaurant.address}</span>
                    <span className="mx-2">•</span>
                    <span>{restaurant.distance}</span>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="px-4 py-1.5 text-sm bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors">
                      Reserve a Table
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl p-8 text-center border border-stone-200">
            <MagnifyingGlass size={32} weight="light" className="mx-auto text-stone-400 mb-2" />
            <h3 className="text-lg font-medium text-stone-800 mb-1">No restaurants found</h3>
            <p className="text-stone-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
