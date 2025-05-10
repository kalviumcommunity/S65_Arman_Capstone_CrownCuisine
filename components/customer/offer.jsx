"use client";

import React from "react";

// Dummy data for offers
const savedOffers = [
  {
    id: 1,
    title: "20% Off Your Next Meal",
    restaurant: "Restaurant Alpha",
    expiryDate: "2023-11-15",
    code: "ALPHA20",
  },
  {
    id: 2,
    title: "Free Appetizer with Entree",
    restaurant: "Restaurant Beta",
    expiryDate: "2023-12-01",
    code: "BETAAPP",
  },
  {
    id: 3,
    title: "$10 Off Orders Over $50",
    restaurant: "Restaurant Delta",
    expiryDate: "2023-11-30",
    code: "DELTA10",
  },
];

export default function Offers() {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Saved Offers & Coupons</h2>
      <p className="text-gray-600 mt-2">Your collected deals and discounts.</p>
      {savedOffers.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedOffers.map((offer) => (
            <div key={offer.id} className="p-4 border border-yellow-300 bg-yellow-50 rounded-lg shadow-sm">
              <h3 className="font-semibold text-yellow-800">{offer.title}</h3>
              <p className="text-sm text-yellow-700">For: {offer.restaurant}</p>
              <p className="text-xs text-yellow-600 mt-1">Expires: {offer.expiryDate}</p>
              <div className="mt-3 p-2 bg-yellow-100 border border-dashed border-yellow-400 rounded-md text-center">
                <span className="text-yellow-800 font-mono text-sm tracking-wider">{offer.code}</span>
              </div>
              <button className="mt-3 w-full px-3 py-1.5 text-xs bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                Use Offer
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">You have no saved offers at the moment.</p>
      )}
    </div>
  );
}
