"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Edit, Trash2, Utensils } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { MenuItem } from "./types";

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (itemId: string) => void;
  onDelete: (itemId: string, itemName: string) => void;
}

export function MenuItemCard({ item, onEdit, onDelete }: MenuItemCardProps) {
  return (
    <Card className="shadow-sm transition-all hover:shadow-md border border-stone-100 bg-stone-100 overflow-hidden">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-x-4 gap-y-3">
        <div className="flex-grow space-y-1.5 min-w-0">
          <p
            className="font-semibold text-base text-black truncate"
            title={item.name}
          >
            {item.name}
          </p>
          <div className="flex items-center gap-x-3 gap-y-1 flex-wrap text-sm text-stone-600">
            <span className="flex items-center gap-1 whitespace-nowrap">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-3.5 w-3.5 rounded object-cover"
                />
              ) : (
                <Utensils className="h-3.5 w-3.5" />
              )}
              {item.category}
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              ₹{item.price.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 pt-1 sm:pt-0 self-start sm:self-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-stone-700 hover:bg-stone-100"
            onClick={() => onEdit(item.id)}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit {item.name}</span>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete {item.name}</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-stone-300 border-stone-300">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-black">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-stone-600">
                  This action cannot be undone. This will permanently delete the
                  menu item "<span className="font-semibold">{item.name}</span>
                  ".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                  })}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className={buttonVariants({
                    variant: "destructive",
                    size: "sm",
                  })}
                  onClick={() => onDelete(item.id, item.name)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
