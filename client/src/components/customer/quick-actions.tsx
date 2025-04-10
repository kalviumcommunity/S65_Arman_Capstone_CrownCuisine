"use client";

import { CalendarDays, Heart, Search, Gift } from "lucide-react";

interface ActionButtonProps {
  icon: React.ReactNode;
}

const ActionButton = ({ icon }: ActionButtonProps) => (
  <button className="flex items-center justify-center bg-stone-100 hover:bg-stone-200 transition p-5 rounded-lg group">
    <div className="text-stone-700 group-hover:text-stone-900 transition-colors">
      {icon}
    </div>
  </button>
);

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-12 border border-stone-100">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        <ActionButton icon={<CalendarDays className="h-9 w-5" />} />
        <ActionButton icon={<Search className="h-9 w-5" />} />
        <ActionButton icon={<Heart className="h-9 w-5" />} />
      </div>
    </div>
  );
}
