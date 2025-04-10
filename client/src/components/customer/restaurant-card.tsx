"use client";
import Image from "next/image";
import { MapPin, Star, Calendar, Menu } from "lucide-react";

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
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
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Restaurant Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={restaurant.imageUrl || "/placeholder.svg"}
          alt={`${restaurant.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
          <Star className="h-3 w-3 text-amber-500 mr-1 fill-amber-500" />
          <span className="text-xs font-medium">{restaurant.rating}</span>
        </div>
        <div className="absolute top-3 left-3 bg-stone-100 rounded-full px-2 py-1">
          <span className="text-xs font-medium">{restaurant.cuisine}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
          {restaurant.name}
        </h3>

        <p className="text-stone-600 text-sm mb-4 line-clamp-2 flex-1">
          {restaurant.description}
        </p>

        <div className="flex items-center text-stone-500 text-xs mb-4">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
          <span>{restaurant.location}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-auto">
          <button className="flex items-center justify-center py-2 px-3 text-xs font-medium rounded-full border border-stone-300 hover:bg-stone-100 transition-colors flex-1">
            <Menu className="h-3 w-3 mr-1" />
            Menu
          </button>
          <button className="flex items-center justify-center py-2 px-3 text-xs bg-stone-900 text-white font-medium rounded-full hover:bg-stone-800 transition-colors flex-1">
            <Calendar className="h-3 w-3 mr-1" />
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};
