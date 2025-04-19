"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, PlusCircle, ChevronRight, RefreshCcw } from "lucide-react";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";

const stone300 = "#d6d3d1";

const inventoryItems = [
  {
    id: "inv-1",
    name: "Fresh Tomatoes",
    category: "Produce",
    quantity: 12.5,
    unit: "kg",
    status: "normal",
    threshold: 10,
  },
  {
    id: "inv-2",
    name: "Olive Oil",
    category: "Pantry",
    quantity: 3.2,
    unit: "L",
    status: "low",
    threshold: 5,
  },
  {
    id: "inv-3",
    name: "Mozzarella",
    category: "Dairy",
    quantity: 4.8,
    unit: "kg",
    status: "low",
    threshold: 5,
  },
  {
    id: "inv-4",
    name: "Flour",
    category: "Pantry",
    quantity: 15.7,
    unit: "kg",
    status: "normal",
    threshold: 10,
  },
  {
    id: "inv-5",
    name: "Fresh Basil",
    category: "Herbs",
    quantity: 0.8,
    unit: "kg",
    status: "critical",
    threshold: 1,
  },
  {
    id: "inv-6",
    name: "Chicken Breast",
    category: "Meat",
    quantity: 7.2,
    unit: "kg",
    status: "normal",
    threshold: 5,
  }
];

const Inventory = () => {
  // Add state for tracking last update time and loading state
  const [lastUpdated, setLastUpdated] = useState('5m ago');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Function to refresh inventory data
  const refreshInventory = () => {
    setIsRefreshing(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // In a real app, you would fetch the latest inventory data here
      const now = new Date();
      setLastUpdated('just now');
      setIsRefreshing(false);
      
      // Reset the "just now" text after 30 seconds
      setTimeout(() => {
        setLastUpdated('30s ago');
      }, 30000);
    }, 800); // Simulating API delay
  };
  
  // Filter out low-stock items
  const lowStockItems = inventoryItems.filter(
    (item) => item.status === "low" || item.status === "critical"
  );
  
  return (
    <div 
      className="rounded-md bg-stone-300 p-4 shadow-none h-[600px] flex flex-col"
      style={{ position: "relative" }}
    >
      <div
        className="flex-grow overflow-y-auto space-y-6" 
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Low-stock alerts section as accordion */}
        {lowStockItems.length > 0 && (
          <Card className="overflow-hidden border-none shadow-none bg-amber-50 rounded-md border-l-4 border-amber-500 mb-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="low-stock-alert" className="border-none">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-amber-800">Low Stock Alert</h3>
                      <p className="text-xs text-amber-700">{lowStockItems.length} items below reorder threshold</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 pt-0">
                  <div className="pl-8">
                    <div className="space-y-1 mb-3">
                      {lowStockItems.map(item => (
                        <div key={item.id} className="text-sm text-amber-700 flex justify-between">
                          <span>{item.name}</span>
                          <span className="font-medium">{item.quantity} {item.unit} (Reorder at {item.threshold} {item.unit})</span>
                        </div>
                      ))}
                    </div>
                    <Button className="bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 h-8 px-3 py-1 text-xs">
                      Generate Purchase Order
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        )}
  
        {/* Inventory cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {inventoryItems.map((item) => (
            <Card
              key={item.id}
              className="rounded-md bg-stone-100 border-none shadow-none overflow-hidden transition-shadow flex flex-col justify-between"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-stone-900">{item.name}</h3>
                  <div className="text-stone-900 font-medium">
                    {item.quantity} {item.unit}
                  </div>
                </div>
                <div className="text-xs text-stone-500 mt-1">{item.category}</div>
                <div className="text-xs text-stone-600 mt-2">
                  Restock threshold: {item.threshold} {item.unit}
                </div>
              </div>
              <div className="p-4 border-t border-stone-200 flex items-center justify-between">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.status === "normal"
                      ? "bg-green-100 text-green-800"
                      : item.status === "low"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.status === "normal"
                    ? "Normal"
                    : item.status === "low"
                    ? "Low"
                    : "Critical"}
                </span>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  Update
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div
        style={{
          position: "absolute",
          bottom: "76px",
          left: 0,
          right: 0,
          height: "80px",
          background: `linear-gradient(to bottom, transparent, ${stone300})`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div className="mt-5 pt-4 border-stone-400 flex justify-end gap-3">
        <Button 
          onClick={refreshInventory}
          disabled={isRefreshing}
          variant="ghost" 
          size="sm"
          className="flex items-center text-sm text-stone-700 hover:bg-stone-200 px-3 py-2 rounded-md h-auto cursor-pointer"
        >
          <RefreshCcw className={`h-3.5 w-3.5 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} /> 
          Updated {lastUpdated}
        </Button>
        <div className="flex gap-3">
          <Button className="bg-stone-100 hover:bg-stone-300 text-stone-900 cursor-pointer">
            Add Ingredients <PlusCircle className="ml-1 h-4 w-4" />
          </Button>
          <Button className="bg-stone-100 hover:bg-stone-300 text-stone-900 cursor-pointer">
            Inventory Management <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
