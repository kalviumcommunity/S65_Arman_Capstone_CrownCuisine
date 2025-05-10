"use client";

import React from "react";
import { instrumentSerif } from "@/app/fonts";
import {
  ChartBar,
  TrendUp,
  TrendDown,
  Storefront,
  CurrencyDollar,
  Users,
  Clock,
} from "@phosphor-icons/react";

// This would be replaced with actual chart components in a real app
const LineChartPlaceholder = () => (
  <div className="w-full bg-stone-50 h-64 rounded-lg flex items-center justify-center">
    <div className="flex flex-col items-center gap-2">
      <ChartBar size={32} className="text-stone-400" />
      <p className="text-stone-500 text-sm">Line Chart Visualization</p>
      <p className="text-stone-400 text-xs">
        (Chart library would be integrated here)
      </p>
    </div>
  </div>
);

const BarChartPlaceholder = () => (
  <div className="w-full bg-stone-50 h-64 rounded-lg flex items-center justify-center">
    <div className="flex flex-col items-center gap-2">
      <ChartBar size={32} className="text-stone-400" />
      <p className="text-stone-500 text-sm">Bar Chart Visualization</p>
      <p className="text-stone-400 text-xs">
        (Chart library would be integrated here)
      </p>
    </div>
  </div>
);

const PieChartPlaceholder = () => (
  <div className="w-full bg-stone-50 h-64 rounded-lg flex items-center justify-center">
    <div className="flex flex-col items-center gap-2">
      <ChartBar size={32} className="text-stone-400" />
      <p className="text-stone-500 text-sm">Pie Chart Visualization</p>
      <p className="text-stone-400 text-xs">
        (Chart library would be integrated here)
      </p>
    </div>
  </div>
);

// Stats data
const statsData = [
  {
    title: "Total Revenue",
    value: "$12,345",
    change: "+8.2%",
    isPositive: true,
    icon: CurrencyDollar,
    color: "bg-green-50 text-green-700 border-green-200",
    iconColor: "text-green-600",
  },
  {
    title: "Customer Count",
    value: "356",
    change: "+12.5%",
    isPositive: true,
    icon: Users,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    title: "Average Order",
    value: "$34.78",
    change: "-2.1%",
    isPositive: false,
    icon: Storefront,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    iconColor: "text-amber-600",
  },
  {
    title: "Avg. Serving Time",
    value: "24 min",
    change: "-5.3%",
    isPositive: true,
    icon: Clock,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    iconColor: "text-purple-600",
  },
];

// Top selling items
const topSellingItems = [
  { id: 1, name: "Butter Chicken", quantity: 128, revenue: "$2,560" },
  { id: 2, name: "Lamb Biryani", quantity: 98, revenue: "$1,960" },
  { id: 3, name: "Garlic Naan", quantity: 250, revenue: "$1,250" },
  { id: 4, name: "Chicken Tikka", quantity: 87, revenue: "$1,218" },
  { id: 5, name: "Vegetable Samosas", quantity: 156, revenue: "$780" },
];

export default function Analytics() {
  return (
    <div>
      <h2
        className={`${instrumentSerif.className} text-2xl font-medium flex items-center gap-2 mb-8`}
      >
        <ChartBar size={24} weight="fill" className="text-stone-700" />
        Restaurant Analytics
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className={`border rounded-xl p-4 ${stat.color}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-2 rounded-lg ${stat.iconColor} bg-white/80`}>
                <stat.icon size={20} weight="fill" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              {stat.isPositive ? (
                <TrendUp size={16} className="text-green-600 mr-1" />
              ) : (
                <TrendDown size={16} className="text-red-600 mr-1" />
              )}
              <span
                className={
                  stat.isPositive
                    ? "text-green-600 text-sm"
                    : "text-red-600 text-sm"
                }
              >
                {stat.change}
              </span>
              <span className="text-stone-600 text-sm ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-stone-800 mb-4">
            Revenue Trend
          </h3>
          <LineChartPlaceholder />
        </div>

        {/* Customer Traffic */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-stone-800 mb-4">
            Customer Traffic
          </h3>
          <BarChartPlaceholder />
        </div>
      </div>

      {/* More Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Selling Items */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-stone-800 mb-4">
            Top Selling Items
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-stone-600">
                    Item
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-stone-600">
                    Quantity
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-stone-600">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {topSellingItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-stone-100 last:border-b-0"
                  >
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4 text-right">{item.quantity}</td>
                    <td className="py-3 px-4 text-right font-medium">
                      {item.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-stone-800 mb-4">
            Sales Breakdown
          </h3>
          <PieChartPlaceholder />
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-stone-800 mr-2"></div>
                <span className="text-sm">Dine-in</span>
              </div>
              <span className="text-sm font-medium">56%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-stone-500 mr-2"></div>
                <span className="text-sm">Takeout</span>
              </div>
              <span className="text-sm font-medium">32%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-stone-300 mr-2"></div>
                <span className="text-sm">Delivery</span>
              </div>
              <span className="text-sm font-medium">12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
