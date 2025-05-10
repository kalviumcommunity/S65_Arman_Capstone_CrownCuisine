"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";

const staffMembers = [
  {
    id: 1,
    name: "Rohan Kapoor",
    position: "Tandoor Chef",
    email: "rohan@crowncuisine.com",
    phone: "(+91) 98765 43210",
    status: "Active",
  },
  {
    id: 2,
    name: "Deepika Sharma",
    position: "Curry Chef",
    email: "deepika@crowncuisine.com",
    phone: "(+91) 91234 56789",
    status: "Active",
  },
  {
    id: 3,
    name: "Arjun Patel",
    position: "Sweets Specialist",
    email: "arjun@crowncuisine.com",
    phone: "(+91) 99887 76655",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Ananya Rao",
    position: "Waitress",
    email: "ananya@crowncuisine.com",
    phone: "(+91) 87654 32109",
    status: "Active",
  },
  {
    id: 5,
    name: "Siddharth Menon",
    position: "Manager",
    email: "siddharth@crowncuisine.com",
    phone: "(+91) 94567 89012",
    status: "Active",
  },
];

export default function Staff() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="relative">
            <MagnifyingGlass
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              placeholder="Search employee..."
              className="pl-9 pr-4 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-stone-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staffMembers.map((staff) => (
          <div
            key={staff.id}
            className="bg-stone-50 rounded-lg border border-stone-200 p-4 flex items-start gap-4"
          >
            <div className="bg-stone-200 rounded-full w-12 h-12 flex items-center justify-center text-stone-600 font-medium">
              {staff.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-stone-900">{staff.name}</h3>
                  <p className="text-stone-600 text-sm">{staff.position}</p>
                </div>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    staff.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {staff.status}
                </span>
              </div>
              <div className="mt-2 text-sm">
                <p className="text-stone-500">{staff.email}</p>
                <p className="text-stone-500">{staff.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
