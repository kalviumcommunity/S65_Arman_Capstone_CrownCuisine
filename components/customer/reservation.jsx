"use client";

import React from "react";

// Dummy data for reservations
const currentReservations = [
  {
    id: 1,
    restaurant: "Restaurant Alpha",
    date: "2023-10-28",
    time: "7:00 PM",
    partySize: 2,
  },
  {
    id: 2,
    restaurant: "Restaurant Beta",
    date: "2023-11-05",
    time: "8:30 PM",
    partySize: 4,
  },
];

const previousReservations = [
  {
    id: 3,
    restaurant: "Restaurant Gamma",
    date: "2023-09-15",
    time: "6:00 PM",
    partySize: 3,
    status: "Completed",
  },
];

export default function Reservations() {
  // In a real app, you'd likely filter these based on the active sub-tab (e.g., 'reservation' vs 'previous')
  // For this example, we'll display both sections

  return (
    <div className="p-4 bg-white shadow-md rounded-lg space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Your Upcoming Reservations
        </h2>
        {currentReservations.length > 0 ? (
          <div className="space-y-3">
            {currentReservations.map((res) => (
              <div
                key={res.id}
                className="p-3 border border-gray-200 rounded-md bg-blue-50"
              >
                <h3 className="font-medium text-blue-700">{res.restaurant}</h3>
                <p className="text-sm text-blue-600">
                  Date: {res.date} at {res.time}
                </p>
                <p className="text-sm text-blue-600">
                  Party Size: {res.partySize}
                </p>
                <div className="mt-2 space-x-2">
                  <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                    Modify
                  </button>
                  <button className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming reservations.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Previous Reservations
        </h2>
        {previousReservations.length > 0 ? (
          <div className="space-y-3">
            {previousReservations.map((res) => (
              <div
                key={res.id}
                className="p-3 border border-gray-200 rounded-md bg-gray-50"
              >
                <h3 className="font-medium text-gray-700">{res.restaurant}</h3>
                <p className="text-sm text-gray-600">
                  Date: {res.date} at {res.time}
                </p>
                <p className="text-sm text-gray-600">
                  Party Size: {res.partySize}
                </p>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span className="font-semibold text-green-600">
                    {res.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No previous reservations.</p>
        )}
      </div>
    </div>
  );
}
