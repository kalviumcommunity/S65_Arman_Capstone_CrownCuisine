"use client";

import React, { useState } from "react";
import { instrumentSerif } from "@/app/fonts";
import {
  CookingPot,
  MagnifyingGlass,
  SlidersHorizontal,
  ForkKnife,
  Clock,
  CheckCircle,
  XCircle,
  CaretDown,
} from "@phosphor-icons/react";

// Dummy data for orders
const orders = [
  {
    id: "#ORD-5432",
    customer: "David Mitchell",
    items: [
      { name: "Butter Chicken", quantity: 1 },
      { name: "Garlic Naan", quantity: 2 },
    ],
    table: "A4",
    time: "7:32 PM",
    status: "In Progress",
    total: "$36.97",
    payment: "Card",
  },
  {
    id: "#ORD-5431",
    customer: "Sarah Johnson",
    items: [
      { name: "Vegetable Biryani", quantity: 1 },
      { name: "Masala Dosa", quantity: 1 },
      { name: "Mango Lassi", quantity: 2 },
    ],
    table: "B2",
    time: "7:25 PM",
    status: "Ready",
    total: "$42.50",
    payment: "Card",
  },
  {
    id: "#ORD-5430",
    customer: "Michael Brown",
    items: [
      { name: "Chicken Tikka", quantity: 1 },
      { name: "Lamb Korma", quantity: 1 },
      { name: "Plain Naan", quantity: 2 },
    ],
    table: "C3",
    time: "7:18 PM",
    status: "Completed",
    total: "$47.85",
    payment: "Cash",
  },
  {
    id: "#ORD-5429",
    customer: "Emily Wilson",
    items: [
      { name: "Paneer Tikka", quantity: 1 },
      { name: "Dal Makhani", quantity: 1 },
      { name: "Rice", quantity: 1 },
    ],
    table: "D1",
    time: "7:05 PM",
    status: "Completed",
    total: "$35.40",
    payment: "Card",
  },
  {
    id: "#ORD-5428",
    customer: "Robert Garcia",
    items: [
      { name: "Tandoori Chicken", quantity: 1 },
      { name: "Chicken Biryani", quantity: 1 },
    ],
    table: "A2",
    time: "6:55 PM",
    status: "Completed",
    total: "$42.95",
    payment: "Card",
  },
];

// Order status options
const statusOptions = ["All", "In Progress", "Ready", "Completed", "Cancelled"];

export default function OrderManagement() {
  const [activeStatus, setActiveStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Filter orders based on selected status
  const filteredOrders =
    activeStatus === "All"
      ? orders
      : orders.filter((order) => order.status === activeStatus);

  return (
    <div>
      <h2
        className={`${instrumentSerif.className} text-2xl font-medium flex items-center gap-2 mb-8`}
      >
        <CookingPot size={24} weight="fill" className="text-stone-700" />
        Order Management
      </h2>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeStatus === status
                  ? "bg-stone-800 text-white"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-9 pr-4 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-stone-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 flex items-center gap-1"
          >
            <SlidersHorizontal size={16} />
            <span className="text-sm">Filters</span>
            <CaretDown
              size={12}
              className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Expanded Filters Panel */}
      {showFilters && (
        <div className="bg-stone-50 p-4 rounded-lg mb-6 border border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Payment Method
              </label>
              <select className="w-full p-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500">
                <option>All</option>
                <option>Card</option>
                <option>Cash</option>
                <option>UPI</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Date Range
              </label>
              <select className="w-full p-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500">
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 days</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Table
              </label>
              <select className="w-full p-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500">
                <option>All Tables</option>
                <option>A Section</option>
                <option>B Section</option>
                <option>C Section</option>
                <option>D Section</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Order Amount
              </label>
              <select className="w-full p-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500">
                <option>Any</option>
                <option>Under $25</option>
                <option>$25 - $50</option>
                <option>$50 - $100</option>
                <option>Over $100</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="px-4 py-1.5 text-sm bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Orders List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-stone-600">
                  Order ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-stone-600">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-stone-600">
                  Items
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-stone-600">
                  Table
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-stone-600">
                  Time
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-stone-600">
                  Total
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-stone-600">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-stone-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-stone-100 last:border-b-0 hover:bg-stone-50"
                >
                  <td className="py-4 px-4 font-medium text-stone-800">
                    {order.id}
                  </td>
                  <td className="py-4 px-4">{order.customer}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <ForkKnife
                            size={12}
                            className="text-stone-400 mr-1"
                          />
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">{order.table}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Clock size={14} className="text-stone-500 mr-1" />
                      <span>{order.time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium">{order.total}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                      ${
                        order.status === "In Progress"
                          ? "bg-amber-100 text-amber-800"
                          : order.status === "Ready"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      {order.status === "In Progress" && (
                        <button
                          className="p-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
                          title="Mark as Ready"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      {(order.status === "In Progress" ||
                        order.status === "Ready") && (
                        <button
                          className="p-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200"
                          title="Cancel Order"
                        >
                          <XCircle size={18} />
                        </button>
                      )}
                      {order.status === "Ready" && (
                        <button
                          className="p-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200"
                          title="Mark as Completed"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <h3 className="text-sm font-medium text-stone-500">Today's Orders</h3>
          <p className="text-2xl font-semibold mt-1">42</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <h3 className="text-sm font-medium text-stone-500">In Progress</h3>
          <p className="text-2xl font-semibold mt-1">8</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <h3 className="text-sm font-medium text-stone-500">Completed</h3>
          <p className="text-2xl font-semibold mt-1">34</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <h3 className="text-sm font-medium text-stone-500">Total Revenue</h3>
          <p className="text-2xl font-semibold mt-1">$1,245.85</p>
        </div>
      </div>
    </div>
  );
}
