"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpenText } from "lucide-react";
import type { MenuItem } from "./types";
import { MenuItemCard } from "./menu-item-card";

interface MenuManagementCardProps {
  menuItems: MenuItem[];
  onAddMenuItem: () => void;
  onEditMenuItem: (itemId: string) => void;
  onDeleteMenuItem: (itemId: string, itemName: string) => void;
}

export function MenuManagementCard({
  menuItems,
  onAddMenuItem,
  onEditMenuItem,
  onDeleteMenuItem,
}: MenuManagementCardProps) {
  return (
    <Card className="h-full flex flex-col border border-stone-300 bg-stone-300 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium text-black">
            Menu Management
          </CardTitle>
          <CardDescription className="text-stone-600">
            Preview, add, edit, or delete menu items.
          </CardDescription>
        </div>
        <BookOpenText className="h-5 w-5 text-stone-500" />
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <div className="space-y-3 p-6 pt-2 h-full">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onEdit={onEditMenuItem}
                onDelete={onDeleteMenuItem}
              />
            ))
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-center text-stone-500 px-6">
                No menu items found.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
