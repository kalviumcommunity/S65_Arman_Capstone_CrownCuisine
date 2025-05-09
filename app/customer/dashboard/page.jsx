"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { instrumentSerif } from "@/app/fonts";
import { motion } from "framer-motion";
import {
  UserCircle,
  Phone,
  MapPin,
  Ticket,
  Heart,
} from "@phosphor-icons/react";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const InfoItem = ({ label, value, icon, isBlock = false }) => (
  <div
    className={`flex ${
      isBlock ? "flex-col items-start" : "flex-col sm:flex-row sm:items-center"
    } gap-1 sm:gap-2 py-2 border-b border-stone-200 last:border-b-0`}
  >
    <dt className="text-sm font-semibold text-stone-700 w-full sm:w-48 flex items-center gap-2 shrink-0">
      {icon}
      {label}:
    </dt>
    <dd className="text-md text-stone-800 break-words">
      {value || "Not provided"}
    </dd>
  </div>
);

export default function CustomerDashboard() {
  const router = useRouter();
  const [customerProfile, setCustomerProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const storedProfile = localStorage.getItem("customerProfile");
        if (storedProfile) {
          setCustomerProfile(JSON.parse(storedProfile));
        } else {
          console.warn("Customer profile not found.");
        }
      } catch (error) {
        console.error("Failed to load customer profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex justify-center items-center bg-stone-300 text-stone-950">
  //       <p className={`${instrumentSerif.className} text-2xl`}>
  //         Loading Dashboard...
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <motion.main
      className="relative z-1 min-h-screen flex flex-col items-center bg-stone-300 text-stone-950 p-4 md:p-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-3xl bg-stone-100 shadow-xl rounded-lg p-6 md:p-10">
        <header className="mb-8 text-center border-b border-stone-300 pb-6">
          <h1
            className={`${instrumentSerif.className} text-4xl md:text-5xl font-medium text-stone-900`}
          >
            Welcome, {customerProfile?.name || "Customer"}!
          </h1>
          <p className="text-stone-700 mt-2">
            Manage your profile and dining experiences.
          </p>
        </header>

        {customerProfile ? (
          <div className="space-y-8">
            <section>
              <h2
                className={`${instrumentSerif.className} text-2xl font-medium text-stone-800 mb-4 flex items-center gap-2`}
              >
                <UserCircle
                  size={28}
                  weight="fill"
                  className="text-stone-700"
                />
                Your Profile
              </h2>
              <div className="bg-stone-50 p-4 rounded-md shadow-sm">
                <InfoItem label="Full Name" value={customerProfile.name} />
                <InfoItem
                  label="Phone Number"
                  value={customerProfile.phoneNumber}
                  icon={<Phone size={20} className="text-stone-600" />}
                />
                <InfoItem
                  label="Your Location"
                  value={customerProfile.location}
                  icon={<MapPin size={20} className="text-stone-600" />}
                />
              </div>
            </section>

            <section>
              <h2
                className={`${instrumentSerif.className} text-2xl font-medium text-stone-800 mb-4 flex items-center gap-2`}
              >
                <Ticket size={28} weight="fill" className="text-stone-700" />
                My Reservations
              </h2>
              <div className="bg-stone-50 p-6 rounded-md shadow-sm text-center">
                <p className="text-stone-600 mb-3">
                  You have no upcoming reservations.
                </p>
                <button className="bg-stone-700 hover:bg-stone-800 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                  Find a Restaurant
                </button>
              </div>
            </section>

            <section>
              <h2
                className={`${instrumentSerif.className} text-2xl font-medium text-stone-800 mb-4 flex items-center gap-2`}
              >
                <Heart size={28} weight="fill" className="text-stone-700" />
                Favorite Restaurants
              </h2>
              <div className="bg-stone-50 p-6 rounded-md shadow-sm text-center">
                <p className="text-stone-600">
                  You haven't favorited any restaurants yet.
                </p>
              </div>
            </section>

            <section className="mt-10 text-center">
              <button
                onClick={() => router.push("/customer/profile-setup")} // Or an edit page
                className="bg-stone-800 hover:bg-stone-900 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Edit Your Profile
              </button>
            </section>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-stone-700 text-lg mb-4">
              Could not load your profile data.
            </p>
            <button
              onClick={() => router.push("/customer/profile-setup")}
              className="bg-stone-800 hover:bg-stone-900 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Complete Your Profile
            </button>
          </div>
        )}
      </div>
    </motion.main>
  );
}
