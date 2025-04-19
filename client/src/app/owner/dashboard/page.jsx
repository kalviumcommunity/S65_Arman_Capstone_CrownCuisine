"use client";

import React from "react";
import Link from "next/link";
import Menu from "@/components/owner/menu";
import Reservation from "@/components/owner/reservation";
import Inventory from "@/components/owner/inventory";
import Staff from "@/components/owner/staff";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  {
    id: "menu-1",
    name: "Margherita Pizza",
    category: "Main Course",
    price: "$14.99",
    status: "available",
  },
  {
    id: "menu-2",
    name: "Caesar Salad",
    category: "Appetizer",
    price: "$9.99",
    status: "available",
  },
  {
    id: "menu-3",
    name: "Tiramisu",
    category: "Dessert",
    price: "$8.99",
    status: "available",
  },
  {
    id: "menu-4",
    name: "Seasonal Soup",
    category: "Appetizer",
    price: "$7.99",
    status: "out of stock",
  },
  {
    id: "menu-5",
    name: "Tiramisu",
    category: "Dessert",
    price: "$8.99",
    status: "available",
  },
  {
    id: "menu-6",
    name: "Seasonal Soup",
    category: "Appetizer",
    price: "$7.99",
    status: "out of stock",
  },
];

const tableReservations = [
  {
    id: "res-1",
    customerName: "John Smith",
    date: "Apr 18, 2025",
    time: "7:30 PM",
    guests: 2,
    status: "pending",
    tableNumber: "A12",
  },
  {
    id: "res-2",
    customerName: "Emily Johnson",
    date: "Apr 18, 2025",
    time: "8:00 PM",
    guests: 4,
    status: "approved",
    tableNumber: "B8",
  },
  {
    id: "res-3",
    customerName: "Michael Brown",
    date: "Apr 19, 2025",
    time: "6:30 PM",
    guests: 6,
    status: "pending",
    tableNumber: "C5",
  },
  {
    id: "res-4",
    customerName: "Emily Johnson",
    date: "Apr 18, 2025",
    time: "8:00 PM",
    guests: 4,
    status: "approved",
    tableNumber: "B8",
  },
  {
    id: "res-5",
    customerName: "Michael Brown",
    date: "Apr 19, 2025",
    time: "6:30 PM",
    guests: 6,
    status: "pending",
    tableNumber: "C5",
  },
  {
    id: "res-6",
    customerName: "John Smith",
    date: "Apr 18, 2025",
    time: "7:30 PM",
    guests: 2,
    status: "pending",
    tableNumber: "A12",
  },
];

const OwnerDashboard = () => (
  <div className="min-h-screen bg-stone-200">
    <div className="bg-stone-200 py-24 text-stone-900 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-serif mb-4">
          Afternoon,{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/owner/restaurant">
                  <i className="hover:text-stone-600 transition-colors cursor-pointer">
                    Bistro Moderna
                  </i>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Customize Restaurant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h1>
        <p className="text-lg text-stone-800 font-serif">
          Manage your restaurant's menu, handle table reservations, and access
          your business analytics <br /> all in one centralized dashboard
          designed for restaurant owners.
        </p>
      </div>
    </div>

    <div className="container mx-auto px-4 py-6">
      {/* Inventory at the top */}
      <div className="mb-10">
        <Inventory />
      </div>

      {/* Menu and Reservation in the middle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Menu menuItems={menuItems} />
        <Reservation tableReservations={tableReservations} />
      </div>

      {/* Staff at the end */}
      <div className="mb-6">
        <Staff />
      </div>
    </div>
  </div>
);

export default OwnerDashboard;