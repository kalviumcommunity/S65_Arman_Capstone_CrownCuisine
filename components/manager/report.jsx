"use client";

import React, { useState } from "react";
import { instrumentSerif } from "@/app/fonts";
import {
  ChartPieSlice,
  CalendarBlank,
  CaretDown,
  Download,
  FileCsv,
  FilePdf,
  Printer,
  MagnifyingGlass,
} from "@phosphor-icons/react";

// Dummy data for reports
const reportsList = [
  {
    id: 1,
    title: "Monthly Sales Summary",
    period: "October 2023",
    category: "Sales",
    generatedOn: "Nov 1, 2023",
    size: "245 KB",
  },
  {
    id: 2,
    title: "Inventory Valuation",
    period: "Q3 2023",
    category: "Inventory",
    generatedOn: "Oct 15, 2023",
    size: "182 KB",
  },
  {
    id: 3,
    title: "Staff Payroll",
    period: "September 2023",
    category: "HR",
    generatedOn: "Oct 5, 2023",
    size: "310 KB",
  },
  {
    id: 4,
    title: "Popular Menu Items",
    period: "Last 90 days",
    category: "Menu",
    generatedOn: "Oct 12, 2023",
    size: "156 KB",
  },
  {
    id: 5,
    title: "Quarterly Financial Report",
    period: "Q3 2023",
    category: "Finance",
    generatedOn: "Oct 10, 2023",
    size: "425 KB",
  },
  {
    id: 6,
    title: "Customer Satisfaction",
    period: "September 2023",
    category: "Feedback",
    generatedOn: "Oct 3, 2023",
    size: "198 KB",
  },
];

// Filters
const categories = [
  "All",
  "Sales",
  "Inventory",
  "HR",
  "Menu",
  "Finance",
  "Feedback",
];
const timePeriods = [
  "Last 30 days",
  "Last 90 days",
  "Last 6 months",
  "Last year",
  "Custom",
];

export default function Report() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePeriod, setActivePeriod] = useState("Last 30 days");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Filter reports based on selected category
  const filteredReports =
    activeCategory === "All"
      ? reportsList
      : reportsList.filter((report) => report.category === activeCategory);

  return (
    <div>
      <h2
        className={`${instrumentSerif.className} text-2xl font-medium flex items-center gap-2 mb-8`}
      >
        <ChartPieSlice size={24} weight="fill" className="text-stone-700" />
        Sales & Reports
      </h2>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeCategory === category
                  ? "bg-stone-800 text-white"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200"
            >
              <CalendarBlank size={16} />
              <span>{activePeriod}</span>
              <CaretDown
                size={12}
                className={`transition-transform ${isCalendarOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isCalendarOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg z-10 py-1 border border-stone-200">
                {timePeriods.map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setActivePeriod(period);
                      setIsCalendarOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      activePeriod === period
                        ? "bg-stone-100 text-stone-800"
                        : "text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-9 pr-4 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-stone-500"
            />
          </div>
        </div>
      </div>

      {/* Generate Report Button */}
      <div className="mb-8">
        <button className="bg-stone-800 hover:bg-stone-700 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
          <ChartPieSlice size={16} />
          Generate New Report
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full min-w-full">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600">
                Report Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600">
                Period
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600">
                Category
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-stone-600">
                Generated
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-stone-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr
                key={report.id}
                className="border-b border-stone-100 last:border-b-0 hover:bg-stone-50"
              >
                <td className="py-4 px-4">
                  <div className="font-medium text-stone-800">
                    {report.title}
                  </div>
                  <div className="text-xs text-stone-500">{report.size}</div>
                </td>
                <td className="py-4 px-4 text-stone-700">{report.period}</td>
                <td className="py-4 px-4">
                  <span className="inline-block px-2 py-1 bg-stone-100 text-stone-700 rounded-full text-xs">
                    {report.category}
                  </span>
                </td>
                <td className="py-4 px-4 text-stone-700">
                  {report.generatedOn}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="p-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200"
                      title="Download PDF"
                    >
                      <FilePdf size={16} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200"
                      title="Download CSV"
                    >
                      <FileCsv size={16} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200"
                      title="Print Report"
                    >
                      <Printer size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Reports Section */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-stone-800 mb-4">
          Quick Reports
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 hover:shadow-md transition-shadow">
            <h4 className="text-stone-800 font-medium mb-2">Today's Sales</h4>
            <p className="text-stone-500 text-sm mb-3">
              Quick overview of today's transactions
            </p>
            <button className="flex items-center gap-1 text-sm text-stone-700 hover:text-stone-900">
              <Download size={14} />
              <span>Download</span>
            </button>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 hover:shadow-md transition-shadow">
            <h4 className="text-stone-800 font-medium mb-2">Weekly Summary</h4>
            <p className="text-stone-500 text-sm mb-3">
              Week-to-date performance metrics
            </p>
            <button className="flex items-center gap-1 text-sm text-stone-700 hover:text-stone-900">
              <Download size={14} />
              <span>Download</span>
            </button>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 hover:shadow-md transition-shadow">
            <h4 className="text-stone-800 font-medium mb-2">
              Inventory Status
            </h4>
            <p className="text-stone-500 text-sm mb-3">
              Current inventory levels and alerts
            </p>
            <button className="flex items-center gap-1 text-sm text-stone-700 hover:text-stone-900">
              <Download size={14} />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
