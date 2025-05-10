"use client";

import React, { useState } from "react";
import { instrumentSerif } from "@/app/fonts";
import {
  GearSix,
  Bell,
  LockKey,
  Eye,
  Clock,
  Globe,
  Sun,
  Moon,
} from "@phosphor-icons/react";

export default function ManagerSettings() {
  // Dummy state for settings
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    reservations: true,
    orders: true,
    inventory: false,
  });

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("english");
  const [timeFormat, setTimeFormat] = useState("24h");

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div>
      <h2
        className={`${instrumentSerif.className} text-2xl font-medium flex items-center gap-2 mb-8`}
      >
        <GearSix size={24} weight="fill" className="text-stone-700" />
        Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notification Settings Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell size={22} className="text-stone-700" />
            <h3 className="text-lg font-medium text-stone-800">
              Notification Preferences
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-stone-700 mb-2">
                Notification Channels
              </p>
              <div className="space-y-2">
                {Object.keys(notifications)
                  .slice(0, 3)
                  .map((key) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications[key]}
                          onChange={() => handleNotificationChange(key)}
                          className="sr-only"
                        />
                        <div
                          className={`w-10 h-6 transition rounded-full ${notifications[key] ? "bg-stone-800" : "bg-stone-300"}`}
                        ></div>
                        <div
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${notifications[key] ? "translate-x-4" : ""}`}
                        ></div>
                      </div>
                      <span className="text-stone-700 text-sm capitalize">
                        {key} Notifications
                      </span>
                    </label>
                  ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-stone-700 mb-2">
                Alert Types
              </p>
              <div className="space-y-2">
                {Object.keys(notifications)
                  .slice(3, 6)
                  .map((key) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications[key]}
                          onChange={() => handleNotificationChange(key)}
                          className="sr-only"
                        />
                        <div
                          className={`w-10 h-6 transition rounded-full ${notifications[key] ? "bg-stone-800" : "bg-stone-300"}`}
                        ></div>
                        <div
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${notifications[key] ? "translate-x-4" : ""}`}
                        ></div>
                      </div>
                      <span className="text-stone-700 text-sm capitalize">
                        {key} Alerts
                      </span>
                    </label>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <LockKey size={22} className="text-stone-700" />
            <h3 className="text-lg font-medium text-stone-800">Security</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-stone-700 mb-2">
                Password
              </p>
              <button className="text-stone-100 bg-stone-800 hover:bg-stone-700 transition-colors px-4 py-2 rounded-lg text-sm">
                Change Password
              </button>
            </div>

            <div>
              <p className="text-sm font-medium text-stone-700 mb-2">
                Two-Factor Authentication
              </p>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative flex items-center">
                  <input type="checkbox" checked={true} className="sr-only" />
                  <div
                    className={`w-10 h-6 transition rounded-full bg-stone-800`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4`}
                  ></div>
                </div>
                <span className="text-stone-700 text-sm">Enabled</span>
              </label>
            </div>

            <div>
              <p className="text-sm font-medium text-stone-700 mb-2">
                Session Management
              </p>
              <button className="text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                <Eye size={16} />
                View Active Sessions
              </button>
            </div>
          </div>
        </div>

        {/* Display Settings Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe size={22} className="text-stone-700" />
            <h3 className="text-lg font-medium text-stone-800">
              Display & Language
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-stone-700 mb-2">
                Appearance
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDarkMode(false)}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border ${!darkMode ? "border-stone-800 bg-stone-50" : "border-stone-300"}`}
                >
                  <Sun size={18} className="text-stone-700" />
                  <span className="text-sm">Light</span>
                </button>
                <button
                  onClick={() => setDarkMode(true)}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border ${darkMode ? "border-stone-800 bg-stone-50" : "border-stone-300"}`}
                >
                  <Moon size={18} className="text-stone-700" />
                  <span className="text-sm">Dark</span>
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-stone-700 mb-2">
                Language
              </p>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-stone-500 focus:border-stone-500"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>
          </div>
        </div>

        {/* Time Settings Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock size={22} className="text-stone-700" />
            <h3 className="text-lg font-medium text-stone-800">Time & Date</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-stone-700 mb-2">
                Time Format
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTimeFormat("12h")}
                  className={`flex-1 p-3 rounded-lg border text-center text-sm ${timeFormat === "12h" ? "border-stone-800 bg-stone-50" : "border-stone-300"}`}
                >
                  12-hour (AM/PM)
                </button>
                <button
                  onClick={() => setTimeFormat("24h")}
                  className={`flex-1 p-3 rounded-lg border text-center text-sm ${timeFormat === "24h" ? "border-stone-800 bg-stone-50" : "border-stone-300"}`}
                >
                  24-hour
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-stone-700 mb-2">
                Time Zone
              </p>
              <select className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-stone-500 focus:border-stone-500">
                <option value="est">(GMT-5:00) Eastern Standard Time</option>
                <option value="cst">(GMT-6:00) Central Standard Time</option>
                <option value="mst">(GMT-7:00) Mountain Standard Time</option>
                <option value="pst">(GMT-8:00) Pacific Standard Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}
