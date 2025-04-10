import type { Booking, MenuItem } from "./types";

export const mockBookingsData: Booking[] = [
  {
    id: "b1",
    customerName: "Rohan Sharma",
    date: "2025-04-10",
    time: "19:00",
    partySize: 2,
    status: "Confirmed",
    notes: "Birthday celebration",
  },
  {
    id: "b2",
    customerName: "Priya Kaur",
    date: "2025-04-10",
    time: "20:30",
    partySize: 4,
    status: "Confirmed",
    notes: "Window seat requested",
  },
  {
    id: "b3",
    customerName: "Amit Singh",
    date: "2025-04-11",
    time: "18:30",
    partySize: 3,
    status: "Confirmed",
  },
  {
    id: "b6",
    customerName: "Geeta Verma",
    date: "2025-04-11",
    time: "19:30",
    partySize: 2,
    status: "Confirmed",
  },
];

export const mockMenuItemsData: MenuItem[] = [
  {
    id: "m1",
    name: "Paneer Tikka Masala",
    price: 350,
    category: "Main Course",
    description: "Creamy tomato-based curry with grilled paneer.",
  },
  {
    id: "m2",
    name: "Dal Makhani",
    price: 280,
    category: "Main Course",
    description: "Classic black lentil curry simmered overnight.",
  },
  {
    id: "m3",
    name: "Garlic Naan",
    price: 70,
    category: "Breads",
    description: "Soft flatbread with garlic and butter.",
  },
  {
    id: "m4",
    name: "Vegetable Biryani",
    price: 320,
    category: "Rice",
    description: "Aromatic basmati rice cooked with mixed vegetables.",
  },
  {
    id: "m5",
    name: "Gulab Jamun (2 pcs)",
    price: 120,
    category: "Desserts",
    description: "Sweet milk solids dumplings in syrup.",
  },
];
