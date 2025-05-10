"use client";

import React, { useState } from "react";

// Dummy FAQ data
const faqs = [
  {
    id: 1,
    question: "How do I make a reservation?",
    answer: "You can make a reservation through the 'Your Reservations' tab by selecting a restaurant, date, and time.",
  },
  {
    id: 2,
    question: "Can I cancel a reservation?",
    answer: "Yes, you can cancel a reservation up to 24 hours before the scheduled time. Go to 'Your Reservations' and select the reservation to cancel.",
  },
  {
    id: 3,
    question: "How do I update my profile?",
    answer: "You can update your profile information in the 'Your Account' tab.",
  },
];

export default function Questions() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Got Questions? (FAQ)</h2>
      <p className="text-gray-600 mt-2">Find answers to common questions below.</p>
      <div className="mt-4 space-y-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="border border-gray-200 rounded-md">
            <button
              onClick={() => toggleFaq(faq.id)}
              className="w-full flex justify-between items-center p-3 text-left font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              <span>{faq.question}</span>
              <span>{openFaq === faq.id ? "-" : "+"}</span>
            </button>
            {openFaq === faq.id && (
              <div className="p-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
