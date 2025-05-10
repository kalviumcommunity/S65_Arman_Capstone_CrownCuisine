"use client";

import React, { useState } from "react";
import { instrumentSerif } from "@/app/fonts";
import { User, CameraPlus, PencilSimple } from "@phosphor-icons/react";

export default function ManagerProfile() {
  // Dummy state for manager profile data
  const [profileData, setProfileData] = useState({
    name: "Amelia Richardson",
    email: "amelia.richardson@crowncuisine.com",
    phone: "(+1) 555-234-5678",
    role: "Restaurant Manager",
    joinDate: "May 15, 2020",
    address: "123 Culinary Street, Gourmet City, GC 12345",
    bio: "Restaurant management professional with over 8 years of experience in fine dining establishments. Specialized in team leadership and customer satisfaction.",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to a backend
    console.log("Profile data saved:", profileData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-stone-800 h-32 relative">
        <div className="absolute left-8 bottom-0 transform translate-y-1/2 flex items-end">
          <div className="bg-stone-100 rounded-full w-24 h-24 border-4 border-white flex items-center justify-center shadow-md">
            <User size={40} weight="fill" className="text-stone-500" />
          </div>
          <button className="bg-stone-700 rounded-full p-2 absolute bottom-0 right-0 text-white hover:bg-stone-600 transition-colors">
            <CameraPlus size={16} />
          </button>
        </div>
      </div>

      <div className="pt-16 pb-8 px-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2
              className={`${instrumentSerif.className} text-2xl font-medium text-stone-800`}
            >
              {profileData.name}
            </h2>
            <p className="text-stone-500">{profileData.role}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-sm bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 flex items-center gap-2 transition-colors"
          >
            <PencilSimple size={16} />
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-stone-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-stone-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-stone-700 mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500"
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-stone-700 mb-1"
                >
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  value={profileData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-stone-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={profileData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500"
                />
              </div>
              <div>
                <label
                  htmlFor="joinDate"
                  className="block text-sm font-medium text-stone-700 mb-1"
                >
                  Join Date
                </label>
                <input
                  type="text"
                  name="joinDate"
                  id="joinDate"
                  value={profileData.joinDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-stone-700 mb-1"
              >
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                rows="4"
                value={profileData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <h3 className="text-sm font-medium text-stone-500 mb-1">Email</h3>
              <p className="text-stone-900">{profileData.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-stone-500 mb-1">Phone</h3>
              <p className="text-stone-900">{profileData.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-stone-500 mb-1">
                Address
              </h3>
              <p className="text-stone-900">{profileData.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-stone-500 mb-1">
                Start Date
              </h3>
              <p className="text-stone-900">{profileData.joinDate}</p>
            </div>
            <div className="col-span-2">
              <h3 className="text-sm font-medium text-stone-500 mb-1">Bio</h3>
              <p className="text-stone-900">{profileData.bio}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
