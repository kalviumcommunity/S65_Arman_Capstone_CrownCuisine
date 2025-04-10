export type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";

export interface Booking {
  id: string;
  customerName: string;
  date: string | Date;
  time: string;
  partySize: number;
  status: BookingStatus;
  notes?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  description?: string;
}
