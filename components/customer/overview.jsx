"use client";

import React from "react";
import {
  CalendarCheck,
  ForkKnife,
  HeartStraight,
  Star,
  Clock,
  MapPin,
  ArrowRight,
  Ticket,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";

const upcomingReservations = [
  {
    id: 1,
    restaurant: "Spice Garden",
    date: "Oct 28, 2023",
    time: "7:30 PM",
    guests: 2,
    address: "123 Culinary Ave, Foodville",
  },
  {
    id: 2,
    restaurant: "Pasta Paradise",
    date: "Nov 5, 2023",
    time: "8:00 PM",
    guests: 4,
    address: "456 Dining St, Foodville",
  },
];

const favoriteRestaurants = [
  {
    id: 1,
    name: "Curry Corner",
    cuisine: "Indian",
    lastVisited: "2 weeks ago",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Tandoori Terrace",
    cuisine: "Indian",
    lastVisited: "3 days ago",
    rating: 4.8,
  },
];

const activeOffers = [
  {
    id: 1,
    title: "20% Off Your Next Meal",
    restaurant: "Spice Garden",
    expires: "Nov 15, 2023",
    code: "SPICE20",
  },
  {
    id: 2,
    title: "Free Appetizer",
    restaurant: "Pasta Paradise",
    expires: "Dec 1, 2023",
    code: "FREEBITE",
  },
];

export default function Overview() {
  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <p className="text-sm text-amber-800">Upcoming Reservations</p>
            <div className="rounded-lg p-2 bg-white/80 text-amber-700">
              <CalendarCheck size={20} weight="fill" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mt-1">
            {upcomingReservations.length}
          </h3>
          <p className="text-sm text-amber-800 mt-2">
            Next - {upcomingReservations[0]?.restaurant} on{" "}
            {upcomingReservations[0]?.date}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <p className="text-sm text-blue-800">Favorite Restaurants</p>
            <div className="rounded-lg p-2 bg-white/80 text-blue-700">
              <HeartStraight size={20} weight="fill" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mt-1">
            {favoriteRestaurants.length}
          </h3>
          <p className="text-sm text-blue-800 mt-2">
            Most visited - {favoriteRestaurants[0]?.name}
          </p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-green-800">Active Offers</p>
            <div className="p-2 rounded-lg bg-white/80 text-green-700">
              <Ticket size={20} weight="fill" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mt-1">{activeOffers.length}</h3>
          <p className="text-sm text-green-800 mt-2">
            Expiring soon - {activeOffers[0]?.title}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Reservations */}
        <div className="bg-stone-100/80 rounded-lg border-none overflow-hidden">
          <div className="p-4 border-b border-stone-300 flex justify-between items-center">
            <h3 className="text-lg flex items-center">
              <CalendarCheck size={18} className="mr-2 text-stone-600" />
              Upcoming Reservations
            </h3>
            <a
              href="#"
              className="text-sm text-stone-600 hover:text-stone-900 flex items-center"
            >
              View All <ArrowRight size={14} className="ml-1" />
            </a>
          </div>
          <div className="p-4">
            {upcomingReservations.length > 0 ? (
              <div className="space-y-4">
                {upcomingReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="p-3 bg-stone-50 border-none rounded-lg transition-colors"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium text-stone-800">
                        {reservation.restaurant}
                      </h4>
                      <div className="flex items-center text-stone-600">
                        <Clock size={14} className="mr-1" />
                        <span className="text-sm">{reservation.time}</span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="text-sm text-stone-500">
                        <CalendarCheck size={14} className="inline mr-1" />
                        {reservation.date}
                      </div>
                      <div className="text-sm text-stone-500">
                        {reservation.guests}{" "}
                        {reservation.guests === 1 ? "Guest" : "Guests"}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-stone-500">
                      <MapPin size={14} className="mr-1" />
                      <span>{reservation.address}</span>
                    </div>
                    <div className="mt-3 flex justify-end space-x-2">
                      <button className="px-3 py-1 text-xs bg-stone-100 text-stone-700 rounded hover:bg-stone-200">
                        <PencilSimple size={14} className="mr-1" />
                      </button>
                      <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">
                        <TrashSimple size={14} className="mr-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-stone-500">No upcoming reservations.</p>
                <button className="mt-2 px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 text-sm">
                  Make a Reservation
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Favorite Restaurants */}
        <div className="bg-stone-100/80 rounded-lg border-none overflow-hidden">
          <div className="p-4 border-b border-stone-300 flex justify-between items-center">
            <h3 className="text-lg flex items-center">
              <HeartStraight size={18} className="mr-2 text-stone-600" />
              Favorite Restaurants
            </h3>
            <a
              href="#"
              className="text-sm text-stone-600 hover:text-stone-900 flex items-center"
            >
              View All <ArrowRight size={14} className="ml-1" />
            </a>
          </div>
          <div className="p-4">
            {favoriteRestaurants.length > 0 ? (
              <div className="space-y-4">
                {favoriteRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="p-3 bg-stone-50 border-none rounded-lg transition-colors"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium text-stone-800">
                        {restaurant.name}
                      </h4>
                      <div className="flex items-center text-stone-600">
                        <Star
                          size={14}
                          weight="fill"
                          className="text-amber-400 mr-1"
                        />
                        <span className="text-sm">{restaurant.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="text-sm text-stone-500">
                        <ForkKnife size={14} className="inline mr-1" />
                        {restaurant.cuisine}
                      </div>
                      <div className="text-sm text-stone-500">
                        Last visited: {restaurant.lastVisited}
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end space-x-2">
                      <button className="px-3 py-1 text-xs bg-stone-100 text-stone-700 rounded hover:bg-stone-200">
                        <PencilSimple size={14} className="mr-1" />
                      </button>
                      <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">
                        <TrashSimple size={14} className="mr-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-stone-500">No favorite restaurants yet.</p>
                <button className="mt-2 px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 text-sm">
                  Find Restaurants
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Special Offers */}
      <div className="mt-6 bg-stone-100/80 rounded-lg border-none overflow-hidden">
        <div className="p-4 border-b border-stone-300 flex justify-between items-center">
          <h3 className="text-lg flex items-center">
            <Ticket size={18} className="mr-2 text-stone-600" />
            Special Offers
          </h3>
          <a
            href="#"
            className="text-sm text-stone-600 hover:text-stone-900 flex items-center"
          >
            View All <ArrowRight size={14} className="ml-1" />
          </a>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeOffers.map((offer) => (
              <div
                key={offer.id}
                className="p-4 border border-amber-100 bg-amber-50 rounded-lg"
              >
                <div className="flex justify-between">
                  <h4 className="font-medium text-amber-800">{offer.title}</h4>
                  <p className="text-xs text-amber-600">
                    Expires: {offer.expires}
                  </p>
                </div>
                <p className="text-sm text-amber-700 mt-1">
                  At: {offer.restaurant}
                </p>
                <div className="mt-3 p-2 bg-amber-100 border border-dashed border-amber-400 rounded-full text-center">
                  <span className="text-amber-800 font-mono text-sm tracking-wider">
                    {offer.code}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
