"use client";

import React from "react";
import { instrumentSerif } from "@/app/fonts";
import {
  HouseSimple,
  TrendUp,
  TrendDown,
  CurrencyDollar,
  Users,
  Clock,
  ShoppingBag,
  Star,
  CalendarCheck,
  Bell,
  Package,
  ArrowRight,
} from "@phosphor-icons/react";

// Stats data for the overview
const statsData = [
  {
    title: "Today's Revenue",
    value: "$2,845.65",
    change: "+12.5%",
    isPositive: true,
    icon: CurrencyDollar,
    color: "bg-green-50 text-green-700 border-green-200",
    iconColor: "text-green-600",
  },
  {
    title: "Customer Count",
    value: "156",
    change: "+8.2%",
    isPositive: true,
    icon: Users,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    title: "Avg. Order Value",
    value: "$36.50",
    change: "-2.1%",
    isPositive: false,
    icon: ShoppingBag,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    iconColor: "text-amber-600",
  },
  {
    title: "Avg. Service Time",
    value: "22 min",
    change: "-5.3%",
    isPositive: true,
    icon: Clock,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    iconColor: "text-purple-600",
  },
];

// Recent orders
const recentOrders = [
  {
    id: "#ORD-5432",
    customer: "David Mitchell",
    time: "7:32 PM",
    total: "$36.97",
    status: "In Progress",
  },
  {
    id: "#ORD-5431",
    customer: "Sarah Johnson",
    time: "7:25 PM",
    total: "$42.50",
    status: "Ready",
  },
  {
    id: "#ORD-5430",
    customer: "Michael Brown",
    time: "7:18 PM",
    total: "$47.85",
    status: "Completed",
  },
];

// Upcoming reservations
const upcomingReservations = [
  {
    id: 1,
    name: "Jessica Thompson",
    time: "8:00 PM",
    guests: 4,
    table: "A3",
  },
  {
    id: 2,
    name: "Robert Wilson",
    time: "8:30 PM",
    guests: 2,
    table: "B5",
  },
  {
    id: 3,
    name: "Amanda Garcia",
    time: "9:00 PM",
    guests: 6,
    table: "C1",
  },
];

// Low inventory alerts
const inventoryAlerts = [
  { id: 1, item: "Chicken Breast", quantity: "2.5 kg", status: "Critical" },
  { id: 2, item: "Basmati Rice", quantity: "5 kg", status: "Low" },
  { id: 3, item: "Fresh Coriander", quantity: "0.3 kg", status: "Critical" },
];

// Function to render status badge
const renderStatusBadge = (status) => {
  let classes = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ";
  
  switch (status) {
    case "In Progress":
      classes += "bg-amber-100 text-amber-800";
      break;
    case "Ready":
      classes += "bg-blue-100 text-blue-800";
      break;
    case "Completed":
      classes += "bg-green-100 text-green-800";
      break;
    case "Critical":
      classes += "bg-red-100 text-red-800";
      break;
    case "Low":
      classes += "bg-amber-100 text-amber-800";
      break;
    default:
      classes += "bg-gray-100 text-gray-800";
  }
  
  return <span className={classes}>{status}</span>;
};

export default function ManagerOverview() {
  return (
    <div>
      <h2 className={`${instrumentSerif.className} text-2xl font-medium flex items-center gap-2 mb-8`}>
        <HouseSimple size={24} weight="fill" className="text-stone-700" />
        Dashboard Overview
      </h2>
      
      {/* Stats Row */}
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
              <span className={stat.isPositive ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
                {stat.change}
              </span>
              <span className="text-stone-600 text-sm ml-1">vs yesterday</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex justify-between items-center">
            <h3 className="font-medium text-lg flex items-center">
              <ShoppingBag size={18} className="mr-2 text-stone-600" />
              Recent Orders
            </h3>
            <a href="#" className="text-sm text-stone-600 hover:text-stone-900 flex items-center">
              View All <ArrowRight size={14} className="ml-1" />
            </a>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center p-3 border border-stone-100 rounded-lg hover:bg-stone-50">
                  <div>
                    <div className="font-medium text-stone-800">{order.id}</div>
                    <div className="text-sm text-stone-500">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{order.total}</div>
                    <div className="text-sm text-stone-500">{order.time}</div>
                  </div>
                  <div>{renderStatusBadge(order.status)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Upcoming Reservations */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex justify-between items-center">
            <h3 className="font-medium text-lg flex items-center">
              <CalendarCheck size={18} className="mr-2 text-stone-600" />
              Upcoming Reservations
            </h3>
            <a href="#" className="text-sm text-stone-600 hover:text-stone-900 flex items-center">
              View All <ArrowRight size={14} className="ml-1" />
            </a>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {upcomingReservations.map((reservation) => (
                <div key={reservation.id} className="p-3 border border-stone-100 rounded-lg hover:bg-stone-50">
                  <div className="flex justify-between">
                    <div className="font-medium text-stone-800">{reservation.name}</div>
                    <div className="text-stone-600 font-medium">{reservation.time}</div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-stone-500">
                    <div>Table {reservation.table}</div>
                    <div>{reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Inventory Alerts & Notifications */}
        <div>
          {/* Inventory Alerts */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b border-stone-100 flex justify-between items-center">
              <h3 className="font-medium text-lg flex items-center">
                <Package size={18} className="mr-2 text-stone-600" />
                Inventory Alerts
              </h3>
              <a href="#" className="text-sm text-stone-600 hover:text-stone-900 flex items-center">
                View All <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {inventoryAlerts.map((alert) => (
                  <div key={alert.id} className="flex justify-between items-center p-3 border border-stone-100 rounded-lg hover:bg-stone-50">
                    <div>
                      <div className="font-medium text-stone-800">{alert.item}</div>
                      <div className="text-sm text-stone-500">{alert.quantity} remaining</div>
                    </div>
                    <div>{renderStatusBadge(alert.status)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-stone-100">
              <h3 className="font-medium text-lg flex items-center">
                <Bell size={18} className="mr-2 text-stone-600" />
                Notifications
              </h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between p-3 border border-stone-100 rounded-lg mb-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <div>
                    <div className="text-stone-800">New reservation added</div>
                    <div className="text-xs text-stone-500">10 minutes ago</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border border-stone-100 rounded-lg mb-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <div>
                    <div className="text-stone-800">Inventory alert: Low stock</div>
                    <div className="text-xs text-stone-500">25 minutes ago</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border border-stone-100 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <div>
                    <div className="text-stone-800">Daily summary report ready</div>
                    <div className="text-xs text-stone-500">1 hour ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex justify-between items-center">
          <h3 className="font-medium text-lg flex items-center">
            <Star size={18} className="mr-2 text-stone-600" />
            Latest Customer Reviews
          </h3>
          <a href="#" className="text-sm text-stone-600 hover:text-stone-900 flex items-center">
            View All <ArrowRight size={14} className="ml-1" />
          </a>
        </div>
        <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-4 border border-stone-100 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} weight={i < 5 ? "fill" : "regular"} className="text-amber-400" />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium">5.0</span>
            </div>
            <p className="text-stone-700 text-sm">"Amazing food and service! The butter chicken was the best I've ever had."</p>
            <p className="mt-2 text-stone-500 text-xs">John D. - 2 hours ago</p>
          </div>
          <div className="p-4 border border-stone-100 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} weight={i < 4 ? "fill" : "regular"} className="text-amber-400" />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium">4.0</span>
            </div>
            <p className="text-stone-700 text-sm">"Great food, but the wait time was a bit longer than expected. Will come again!"</p>
            <p className="mt-2 text-stone-500 text-xs">Maria L. - Yesterday</p>
          </div>
          <div className="p-4 border border-stone-100 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} weight={i < 5 ? "fill" : "regular"} className="text-amber-400" />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium">5.0</span>
            </div>
            <p className="text-stone-700 text-sm">"Exceptional flavors and presentation. The staff was very attentive and friendly."</p>
            <p className="mt-2 text-stone-500 text-xs">Robert W. - 2 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
