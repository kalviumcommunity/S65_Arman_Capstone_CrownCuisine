'use client'

import { useState } from 'react'
import { Home, ShoppingBag, Menu, Calendar, Users, BarChart } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Navigation() {
  const [activeTab, setActiveTab] = useState('dashboard')
  
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={22} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={22} /> },
    { id: 'menu', label: 'Menu', icon: <Menu size={22} /> },
    { id: 'reservations', label: 'Reservations', icon: <Calendar size={22} /> },
    { id: 'staff', label: 'Staff', icon: <Users size={22} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart size={22} /> }
  ]
  
  return (
    <nav className="fixed top-8 right-8 z-10">
      <TooltipProvider>
        <div className="flex gap-4">
          {tabs.map(tab => (
            <Tooltip key={tab.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-2.5 rounded-full transition-all ${
                    activeTab === tab.id 
                      ? 'text-gray-800' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{tab.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </nav>
  )
}
