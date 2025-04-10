"use client";
import { HeroSection } from "@/components/customer/hero-section";
import { QuickActions } from "@/components/customer/quick-actions";
import { RestaurantGrid } from "@/components/customer/restaurant-grid";
import type { Restaurant } from "@/components/customer/restaurant-card";

const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Haveli Eastwood",
    description:
      "Traditional Punjabi thali in a rustic village setting. Live folk music evenings.",
    imageUrl:
      "https://images.unsplash.com/photo-1562945431-ce2b63d5a7fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
    cuisine: "Punjabi",
    location: "GT Road",
  },
  {
    id: "2",
    name: "Bella Cucina",
    description:
      "Authentic Italian pasta and thin-crust pizzas. Cozy ambiance.",
    imageUrl:
      "https://images.unsplash.com/photo-1562945431-ce2b63d5a7fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.4,
    cuisine: "Italian",
    location: "Ranjit Avenue",
  },
  {
    id: "3",
    name: "Dragon House",
    description:
      "Pan-Asian cuisine featuring dim sum, noodles, and wok favorites.",
    imageUrl:
      "https://images.unsplash.com/photo-1562945431-ce2b63d5a7fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.2,
    cuisine: "Chinese/Thai",
    location: "Mall Road",
  },
  {
    id: "4",
    name: "Urban Grill",
    description:
      "Sizzlers, steaks, and continental dishes. Perfect for casual dining.",
    imageUrl:
      "https://images.unsplash.com/photo-1562945431-ce2b63d5a7fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.0,
    cuisine: "Continental",
    location: "Lawrence Road",
  },
];

export default function CustomerDashboardPage() {
  return (
    <div className="min-h-screen bg-stone-200">
      <HeroSection userName="Arman" />

      <div className="container mx-auto px-6 py-8">
        <QuickActions />
        <RestaurantGrid restaurants={mockRestaurants} />
      </div>
    </div>
  );
}
