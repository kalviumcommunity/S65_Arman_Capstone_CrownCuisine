"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, ExternalLink } from "lucide-react";

const stone300 = "#d6d3d1";

const Menu = ({ menuItems }) => (
  <div
    className="rounded-md bg-stone-300 p-4 shadow-none h-[600px] flex flex-col"
    style={{ position: "relative" }}
  >
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow overflow-y-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {menuItems.map((item) => (
        <Card
          key={item.id}
          className="rounded-md bg-stone-100 border-none shadow-none overflow-hidden transition-shadow h-[200px] flex flex-col justify-between"
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-stone-900">{item.name}</h3>
              <div className="text-stone-900 font-medium">{item.price}</div>
            </div>
            <div className="text-xs text-stone-500 mt-1">{item.category}</div>
          </div>
          <div className="p-4 border-t border-stone-200 flex items-center justify-between">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                item.status === "available"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {item.status === "available" ? "Available" : "Out of Stock"}
            </span>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              Edit
            </Button>
          </div>
        </Card>
      ))}
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
      <Button className="bg-stone-100 hover:bg-stone-300 text-stone-900 cursor-pointer">
        Add Menu Items <PlusCircle className="ml-1 h-4 w-4" />
      </Button>
      <Button className="bg-stone-100 hover:bg-stone-300 text-stone-900 cursor-pointer">
        View All Menu Items <ExternalLink className="ml-1 h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default Menu;