import React from "react";

const RestaurantCard = ({ restaurant }) => {
  const {
    name = "Bistro Moderna",
    image = "/api/placeholder/600/400",
    cuisine = "Contemporary Fusion",
    rating = 4.8,
    openingHours = "11:00 AM - 11:00 PM",
    id = "restaurant-1",
  } = restaurant || {};

  return (
    <div className="relative w-full max-w-md rounded-md overflow-hidden cursor-pointer border-4 border-transparent hover:border-stone-400 transition-colors duration-300">
      <div className="relative z-10 h-96 overflow-hidden rounded-sm shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent opacity-80 z-10 rounded-md"></div>

        <img
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover rounded-md"
        />

        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{name}</h3>
          <p className="text-stone-200 text-sm mb-3">{cuisine}</p>

          <div className="flex justify-between items-center text-xs text-stone-300">
            <span>{openingHours}</span>
            <span>★ {rating}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-stone-800 p-4">
        <div className="flex justify-between">
          <button className="px-4 py-2 bg-transparent border border-stone-400 text-stone-200 rounded-full text-sm hover:bg-stone-700 transition-colors">
            View Menu
          </button>
          <button className="px-4 py-2 bg-stone-200 text-stone-800 rounded-full text-sm hover:bg-white transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
