"use client";

import { instrumentSerif } from "@/app/fonts";
import {
  CalendarCheck,
  MagnifyingGlass,
  Plus,
  X,
  Check,
} from "@phosphor-icons/react";

const reservations = [
  {
    id: 1,
    guest: "James Smith",
    date: "2023-10-15",
    time: "18:30",
    guests: 4,
    table: "A5",
    status: "Confirmed",
    phone: "(555) 234-5678",
    notes: "Birthday celebration",
  },
  {
    id: 2,
    guest: "Maria Garcia",
    date: "2023-10-15",
    time: "19:00",
    guests: 2,
    table: "B3",
    status: "Confirmed",
    phone: "(555) 345-6789",
    notes: "Window seat requested",
  },
  {
    id: 3,
    guest: "Robert Johnson",
    date: "2023-10-15",
    time: "20:00",
    guests: 6,
    table: "C2",
    status: "Pending",
    phone: "(555) 456-7890",
    notes: "",
  },
  {
    id: 4,
    guest: "Jennifer Lee",
    date: "2023-10-16",
    time: "19:30",
    guests: 3,
    table: "A2",
    status: "Confirmed",
    phone: "(555) 567-8901",
    notes: "Allergic to nuts",
  },
  {
    id: 5,
    guest: "Thomas Wilson",
    date: "2023-10-16",
    time: "20:30",
    guests: 5,
    table: "D1",
    status: "Cancelled",
    phone: "(555) 678-9012",
    notes: "",
  },
];

export default function TableReservation() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`${instrumentSerif.className} text-2xl font-medium flex items-center gap-2`}
        >
          <CalendarCheck size={24} weight="fill" className="text-stone-700" />
          Table Reservations
        </h2>
        <div className="flex gap-4">
          <div className="relative">
            <MagnifyingGlass
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              placeholder="Search reservations..."
              className="pl-9 pr-4 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-stone-500"
            />
          </div>
          <button className="bg-stone-800 hover:bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus size={18} />
            Add Reservation
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <button className="bg-stone-700 text-white px-4 py-2 text-sm rounded-lg">
          Today
        </button>
        <button className="bg-stone-100 text-stone-700 px-4 py-2 text-sm rounded-lg">
          Tomorrow
        </button>
        <button className="bg-stone-100 text-stone-700 px-4 py-2 text-sm rounded-lg">
          This Week
        </button>
        <button className="bg-stone-100 text-stone-700 px-4 py-2 text-sm rounded-lg">
          All
        </button>
      </div>

      <div className="bg-stone-50 rounded-lg border border-stone-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-100">
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">
                Guest
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">
                Date & Time
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">
                Guests
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">
                Table
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="hover:bg-stone-50 border-b border-stone-200 last:border-b-0"
              >
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium">{reservation.guest}</p>
                    <p className="text-stone-500 text-xs">
                      {reservation.phone}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <p>
                    {new Date(reservation.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-stone-500 text-xs">{reservation.time}</p>
                </td>
                <td className="py-3 px-4">{reservation.guests}</td>
                <td className="py-3 px-4">{reservation.table}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      reservation.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : reservation.status === "Pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    {reservation.status === "Pending" && (
                      <>
                        <button className="p-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200">
                          <Check size={16} />
                        </button>
                        <button className="p-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200">
                          <X size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
