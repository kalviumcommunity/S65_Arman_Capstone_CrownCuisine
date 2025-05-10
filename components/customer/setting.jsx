"use client";

import React, { useState } from "react";

export default function Settings() {
  // Dummy state for settings
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [darkMode, setDarkMode] = useState(false);

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
      <p className="text-gray-600 mt-2">Manage your preferences.</p>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Notification Preferences
        </h3>
        <div className="space-y-2">
          {Object.keys(notifications).map((key) => (
            <label
              key={key}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={() => handleNotificationChange(key)}
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="text-gray-700 text-sm capitalize">
                {key} Notifications
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Appearance</h3>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          />
          <span className="text-gray-700 text-sm">Enable Dark Mode</span>
        </label>
      </div>

      <button className="mt-8 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Save Settings
      </button>
    </div>
  );
}
