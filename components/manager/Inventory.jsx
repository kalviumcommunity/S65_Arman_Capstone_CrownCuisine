"use client";

import { instrumentSerif } from "@/app/fonts";
import { Package, Plus, MagnifyingGlass } from "@phosphor-icons/react";

const inventoryItems = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Produce",
    quantity: 25,
    unit: "kg",
    status: "In Stock",
  },
  {
    id: 2,
    name: "Chicken Breast",
    category: "Meat",
    quantity: 15,
    unit: "kg",
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Olive Oil",
    category: "Pantry",
    quantity: 10,
    unit: "liters",
    status: "In Stock",
  },
  {
    id: 4,
    name: "Basmati Rice",
    category: "Grains",
    quantity: 20,
    unit: "kg",
    status: "In Stock",
  },
  {
    id: 5,
    name: "Parmesan Cheese",
    category: "Dairy",
    quantity: 5,
    unit: "kg",
    status: "Low Stock",
  },
  {
    id: 6,
    name: "Black Pepper",
    category: "Spices",
    quantity: 3,
    unit: "kg",
    status: "In Stock",
  },
];

export default function Inventory() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`${instrumentSerif.className} text-2xl font-medium flex items-center gap-2`}
        >
          <Package size={24} weight="fill" className="text-stone-700" />
          Inventory Management
        </h2>
        <div className="flex gap-4">
          <div className="relative">
            <MagnifyingGlass
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              placeholder="Search inventory..."
              className="pl-9 pr-4 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-stone-500"
            />
          </div>
          <button className="bg-stone-800 hover:bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus size={18} />
            Add Item
          </button>
        </div>
      </div>

      <div className="bg-stone-50 rounded-lg border border-stone-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-100">
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">
                Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">
                Category
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">
                Quantity
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600 border-b border-stone-200">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-stone-50 border-b border-stone-200 last:border-b-0"
              >
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4 text-stone-600">{item.category}</td>
                <td className="py-3 px-4">
                  {item.quantity} {item.unit}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
