"use client";
import { motion } from "framer-motion";
import {
  RestaurantCard,
  type Restaurant,
} from "@/components/customer/restaurant-card";

interface RestaurantGridProps {
  restaurants: Restaurant[];
}

export function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif font-medium text-stone-800">
          Recommended Restaurants
        </h2>
        <button className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {restaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <RestaurantCard restaurant={restaurant} priority={index < 4} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
