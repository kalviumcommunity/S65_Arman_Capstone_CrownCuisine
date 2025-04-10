"use client";

import React from "react";
import { HeroSection } from "@/components/owner/hero-section";
import { CoreManagementSection } from "@/components/owner/core-management-section";
import { AdditionalToolsSection } from "@/components/owner/additional-tools-section";
import {
  mockBookingsData,
  mockMenuItemsData,
} from "@/components/owner/mock-data";

export default function OwnerDashboardPage() {
  const [bookings, setBookings] = React.useState(mockBookingsData);
  const [menuItems, setMenuItems] = React.useState(mockMenuItemsData);

  const handleToggleBookingStatus = (
    bookingId: string,
    newStatus: "Pending" | "Confirmed" | "Cancelled" | "Completed"
  ) => {
    console.log(
      `ACTION: Toggle status for booking ${bookingId} to ${newStatus}`
    );
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const handleAddNewMenuItem = () => {
    console.log(
      "ACTION: Trigger Add New Menu Item (e.g., open modal/navigate)"
    );
    const newItem = {
      id: `m${Date.now()}`,
      name: "New Item",
      price: 0,
      category: "Uncategorized",
      description: "",
    };
    setMenuItems((prev) => [...prev, newItem]);
    console.log("ACTION: Trigger Edit Menu Item for ID:", newItem.id);
  };

  const handleEditMenuItem = (itemId: string) => {
    console.log(`ACTION: Trigger Edit Menu Item for ID: ${itemId}`);
  };

  const handleDeleteMenuItem = (itemId: string, itemName: string) => {
    console.log(
      `ACTION: PERFORMING DELETE for Menu Item ID: ${itemId}, Name: ${itemName}`
    );
    setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <div className="min-h-screen bg-stone-200">
      <HeroSection userName="Arman" />

      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <CoreManagementSection
          bookings={bookings}
          menuItems={menuItems}
          onToggleBookingStatus={handleToggleBookingStatus}
          onAddMenuItem={handleAddNewMenuItem}
          onEditMenuItem={handleEditMenuItem}
          onDeleteMenuItem={handleDeleteMenuItem}
        />

        <AdditionalToolsSection />
      </div>
    </div>
  );
}
