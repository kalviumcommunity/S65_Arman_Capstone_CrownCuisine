import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ReservationCard = ({ reservation }) => {
  const {
    id = "res-123",
    restaurantName = "Restaurant Name",
    status = "pending",
    time = "12:00 PM",
    guests = 2,
  } = reservation || {};

  const [showButtons, setShowButtons] = useState(false);

  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-200";
      case "pending":
      default:
        return "bg-amber-100 text-amber-800 border border-amber-200";
    }
  };

  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "Confirmed";
      case "rejected":
        return "Rejected";
      case "pending":
      default:
        return "Pending";
    }
  };

  return (
    <Card
      className="overflow-hidden border-none shadow-none transition-shadow bg-stone-200 px-4"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center flex-grow">
          <div className="flex flex-col">
            <h3 className="font-medium text-sm text-stone-900 truncate">
              {restaurantName}
            </h3>
            <div className="text-xs text-stone-800">
              {time} - Guests: {guests}
            </div>
          </div>
        </div>

        <Badge
          className={`${getStatusClasses(
            status
          )} mx-2 px-2 py-0.5 text-xs flex-shrink-0`}
        >
          {getStatusText(status)}
        </Badge>

        <div className={`flex gap-3 flex-shrink-0 ${showButtons ? "" : "hidden"}`}>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-6 px-1.5"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-6 px-1.5 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Modify
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ReservationList = ({ reservations }) => {
  const defaultReservations = [
    {
      id: "res-1",
      restaurantName: "La Piazza",
      date: "Oct 15, 2023",
      time: "7:30 PM",
      guests: 2,
      status: "approved",
      tableNumber: "A12",
    },
    {
      id: "res-2",
      restaurantName: "Sakura Sushi",
      date: "Oct 18, 2023",
      time: "6:00 PM",
      guests: 4,
      status: "approved",
      tableNumber: "B8",
    },
    {
      id: "res-3",
      restaurantName: "Bistro Moderne",
      date: "Oct 22, 2023",
      time: "8:00 PM",
      guests: 2,
      status: "approved",
      tableNumber: "C5",
    },
    {
      id: "res-4",
      restaurantName: "The Cozy Corner Cafe",
      date: "Oct 25, 2023",
      time: "10:00 AM",
      guests: 1,
      status: "approved",
      tableNumber: "T1",
    },
  ];

  const reservationList = reservations || defaultReservations;

  return (
    <div className="space-y-4">
      {reservationList.length === 0 ? (
        <Card className="p-6 text-center text-gray-500 flex items-center justify-center">
          <div>
            <p>You don't have any reservations yet.</p>
            <Button className="mt-4">Find Restaurants</Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {reservationList.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationList;
