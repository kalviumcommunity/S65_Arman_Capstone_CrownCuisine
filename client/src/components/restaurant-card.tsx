import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react"; // Removed Star, MenuIcon, CalendarDays

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: number; // Keep type definition, just don't display it
  cuisine: string;
  location: string;
};

type RestaurantCardProps = {
  restaurant: Restaurant;
  priority?: boolean;
};

export const RestaurantCard = ({
  restaurant,
  priority = false,
}: RestaurantCardProps) => {
  return (
    // Added 'group' for hover effects on children
    <div className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 relative">
      <div className="p-6">
        {/* Top section with image on left */}
        <div className="flex items-start space-x-4 mb-4">
          {/* Slightly larger restaurant image/logo */}
          <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden">
            {" "}
            {/* Increased size from h-16 w-16 */}
            <Image
              src={restaurant.imageUrl}
              alt={`${restaurant.name}`}
              fill
              sizes="80px" // Adjusted sizes prop accordingly
              style={{ objectFit: "cover" }}
              className="bg-stone-100"
              priority={priority}
            />
          </div>

          {/* Name and cuisine */}
          <div className="flex-1">
            {/* Removed rating div wrapper */}
            <h3 className="font-serif text-xl font-medium text-gray-900">
              {restaurant.name}
            </h3>
            {/* Removed rating display entirely */}
            <span className="text-xs bg-stone-100 px-2 py-1 rounded-full inline-block mt-1">
              {restaurant.cuisine}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm">{restaurant.description}</p>

        {/* Location with icon */}
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{restaurant.location}</span>
        </div>

        {/* Buttons Container - Appears on Hover */}
        <div
          className="
            flex space-x-2 pt-2 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 ease-in-out 
            pointer-events-none group-hover:pointer-events-auto" // Handles visibility and interaction
        >
          {/* Smaller buttons without icons */}
          <button className="py-1 px-3 text-xs font-medium rounded-full border border-black hover:bg-stone-100 transition-colors">
            View Menu
          </button>
          <button className="py-1 px-3 text-xs bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
            Reserve Table
          </button>
        </div>
      </div>
    </div>
  );
};
