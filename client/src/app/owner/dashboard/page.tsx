"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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

import {
  CalendarCheck,
  BookOpenText,
  Boxes,
  UsersRound,
  Construction,
  Edit,
  ExternalLink,
  Calendar,
  Clock,
  Users,
  Trash2,
  Utensils,
} from "lucide-react";

type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";
interface Booking {
  id: string;
  customerName: string;
  date: string | Date;
  time: string;
  partySize: number;
  status: BookingStatus;
  notes?: string;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  description?: string;
}

const mockBookingsData: Booking[] = [
  {
    id: "b1",
    customerName: "Rohan Sharma",
    date: "2025-04-10",
    time: "19:00",
    partySize: 2,
    status: "Confirmed",
    notes: "Birthday celebration",
  },
  {
    id: "b2",
    customerName: "Priya Kaur",
    date: "2025-04-10",
    time: "20:30",
    partySize: 4,
    status: "Confirmed",
    notes: "Window seat requested",
  },
  {
    id: "b3",
    customerName: "Amit Singh",
    date: "2025-04-11",
    time: "18:30",
    partySize: 3,
    status: "Confirmed",
  },
  {
    id: "b6",
    customerName: "Geeta Verma",
    date: "2025-04-11",
    time: "19:30",
    partySize: 2,
    status: "Confirmed",
  },
];

const mockMenuItemsData: MenuItem[] = [
  {
    id: "m1",
    name: "Paneer Tikka Masala",
    price: 350,
    category: "Main Course",
    description: "Creamy tomato-based curry with grilled paneer.",
  },
  {
    id: "m2",
    name: "Dal Makhani",
    price: 280,
    category: "Main Course",
    description: "Classic black lentil curry simmered overnight.",
  },
  {
    id: "m3",
    name: "Garlic Naan",
    price: 70,
    category: "Breads",
    description: "Soft flatbread with garlic and butter.",
  },
  {
    id: "m4",
    name: "Vegetable Biryani",
    price: 320,
    category: "Rice",
    description: "Aromatic basmati rice cooked with mixed vegetables.",
  },
  {
    id: "m5",
    name: "Gulab Jamun (2 pcs)",
    price: 120,
    category: "Desserts",
    description: "Sweet milk solids dumplings in syrup.",
  },
];

const BookingStatusBadge = ({ status }: { status: BookingStatus }) => {
  let badgeColor = "bg-stone-100 text-stone-600";
  let textColor = "text-stone-600";

  if (status === "Confirmed") {
    badgeColor = "bg-green-100 text-green-700";
    textColor = "text-green-700";
  } else if (status === "Pending") {
    badgeColor = "bg-yellow-100 text-yellow-700";
    textColor = "text-yellow-700";
  } else if (status === "Cancelled") {
    badgeColor = "bg-red-100 text-red-700";
    textColor = "text-red-700";
  } else if (status === "Completed") {
    badgeColor = "bg-stone-100 text-stone-600";
    textColor = "text-stone-600";
  }

  return (
    <Badge className={`capitalize ${badgeColor} ${textColor} border-none`}>
      {status}
    </Badge>
  );
};

export default function OwnerDashboardPage() {
  const [bookings, setBookings] = React.useState<Booking[]>(mockBookingsData);
  const [menuItems, setMenuItems] =
    React.useState<MenuItem[]>(mockMenuItemsData);

  const handleToggleBookingStatus = (
    bookingId: string,
    newStatus: BookingStatus
  ) => {
    console.log(
      `ACTION: Toggle status for booking ${bookingId} to ${newStatus}`
    );
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const handleAddNewMenuItem = () => {
    console.log(
      "ACTION: Trigger Add New Menu Item (e.g., open modal/navigate)"
    );
    const newItem: MenuItem = {
      id: `m${Date.now()}`,
      name: "New Item",
      price: 0,
      category: "Uncategorized",
      description: "",
    };
    setMenuItems((prev) => [...prev, newItem]);
    console.log("ACTION: Trigger Edit Menu Item for ID:", newItem.id);
  };

  const handleEditMenuItem = (itemId: string) => {
    console.log(`ACTION: Trigger Edit Menu Item for ID: ${itemId}`);
  };

  const handleDeleteMenuItem = (itemId: string, itemName: string) => {
    console.log(
      `ACTION: PERFORMING DELETE for Menu Item ID: ${itemId}, Name: ${itemName}`
    );
    setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const MAX_PREVIEW_BOOKINGS = 4;
  const MAX_PREVIEW_MENU_ITEMS = 4;

  const upcomingBookingsPreview = bookings
    .filter((b) => b.status === "Pending" || b.status === "Confirmed")
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime()
    )
    .slice(0, MAX_PREVIEW_BOOKINGS);

  const menuItemsPreview = menuItems.slice(0, MAX_PREVIEW_MENU_ITEMS);

  const formatDate = (dateInput: string | Date): string => {
    try {
      const date =
        typeof dateInput === "string"
          ? new Date(dateInput + "T00:00:00")
          : dateInput;
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      console.error("Invalid date format:", dateInput);
      return "Invalid Date";
    }
  };

  return (
    <div className="min-h-screen bg-stone-200">
      <div className="relative overflow-hidden bg-stone-200">
        <div className="container relative z-10 mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black tracking-tight">
              Afternoon, <span className="italic">Arman</span>
            </h1>
            <p className="mt-6 text-lg text-black/80 font-serif max-w-2xl mx-auto">
              Streamline your restaurant&apos;s day-to-day, from managing menus
              and tracking reservations to optimizing staff and service, all in
              one place.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="mb-8 border-b border-stone-200 pb-4">
          <h2 className="text-3xl font-semibold tracking-tight text-black">
            Core Management
          </h2>
          <p className="mt-2 text-base text-stone-600">
            Manage your primary operations: Bookings and Menu.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 items-stretch">
          <Card className="h-full flex flex-col border border-stone-300 bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="space-y-1">
                <CardTitle className="text-lg font-medium text-black">
                  Upcoming Bookings
                </CardTitle>
                <CardDescription className="text-stone-600">
                  Next {MAX_PREVIEW_BOOKINGS} pending/confirmed reservations.
                </CardDescription>
              </div>
              <CalendarCheck className="h-5 w-5 text-stone-500" />
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <div className="space-y-3 p-6 pt-2 h-full">
                {upcomingBookingsPreview.length > 0 ? (
                  upcomingBookingsPreview.map((booking) => (
                    <Card
                      key={booking.id}
                      className="border border-stone-200 shadow-sm transition-all hover:shadow-md hover:border-stone-400 bg-white overflow-hidden"
                    >
                      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-x-4 gap-y-3">
                        <div className="flex-grow space-y-1.5 min-w-0">
                          <p
                            className="font-semibold text-base text-black truncate"
                            title={booking.customerName}
                          >
                            {booking.customerName}
                          </p>
                          <div className="flex items-center gap-x-3 gap-y-1 flex-wrap text-sm text-stone-600">
                            <span className="flex items-center gap-1 whitespace-nowrap">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(booking.date)}
                            </span>
                            <span className="flex items-center gap-1 whitespace-nowrap">
                              <Clock className="h-3.5 w-3.5" />
                              {booking.time}
                            </span>
                            <span className="flex items-center gap-1 whitespace-nowrap">
                              <Users className="h-3.5 w-3.5" />
                              {booking.partySize} Guests
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 pt-1 sm:pt-0 self-start sm:self-center">
                          <BookingStatusBadge status={booking.status} />
                          <Switch
                            id={`status-toggle-${booking.id}`}
                            checked={booking.status === "Confirmed"}
                            onCheckedChange={(isChecked) =>
                              handleToggleBookingStatus(
                                booking.id,
                                isChecked ? "Confirmed" : "Pending"
                              )
                            }
                            aria-label={`Toggle booking status for ${booking.customerName}`}
                            disabled={
                              booking.status !== "Pending" &&
                              booking.status !== "Confirmed"
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-center text-stone-500 px-6">
                      No upcoming bookings found.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-stone-300 px-6 py-3 bg-stone-50 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-black hover:bg-black/10 h-8 px-3"
              >
                View All Bookings
                <ExternalLink className="ml-1.5 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="h-full flex flex-col border border-stone-300 bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold text-black">
                  Menu Management
                </CardTitle>
                <CardDescription className="text-stone-600">
                  Preview, add, edit, or delete menu items.
                </CardDescription>
              </div>
              <BookOpenText className="h-6 w-6 text-black" />
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <div className="px-6 pt-4">
                <Button
                  size="sm"
                  className="w-full bg-black text-white hover:bg-stone-800"
                  onClick={handleAddNewMenuItem}
                >
                  Add New Menu Item
                </Button>
              </div>
              <div className="space-y-3 p-6 pt-4 h-full">
                {menuItemsPreview.length > 0 ? (
                  menuItemsPreview.map((item) => (
                    <Card
                      key={item.id}
                      className="border border-stone-200 shadow-sm transition-all hover:shadow-md hover:border-stone-400 bg-white overflow-hidden"
                    >
                      <CardContent className="p-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-10 w-10 rounded object-cover flex-shrink-0 border border-stone-200"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded bg-stone-100 flex items-center justify-center flex-shrink-0 border border-stone-200">
                              <Utensils className="h-5 w-5 text-stone-500" />
                            </div>
                          )}
                          <div className="flex-grow min-w-0">
                            <p
                              className="text-sm font-medium truncate text-black"
                              title={item.name}
                            >
                              {item.name}
                            </p>
                            <p className="text-xs text-stone-600">
                              ₹{item.price.toFixed(2)}{" "}
                              <span className="mx-1 hidden sm:inline"></span>{" "}
                              <span className="block sm:inline">
                                {item.category}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center flex-shrink-0 gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-stone-700 hover:bg-stone-100"
                            onClick={() => handleEditMenuItem(item.id)}
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
                                <span className="sr-only">
                                  Delete {item.name}
                                </span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white border-stone-300">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-black">
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-stone-600">
                                  This action cannot be undone. This will
                                  permanently delete the menu item "
                                  <span className="font-semibold">
                                    {item.name}
                                  </span>
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
                                  onClick={() =>
                                    handleDeleteMenuItem(item.id, item.name)
                                  }
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-sm text-stone-500 text-center py-4">
                      No menu items added yet.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-stone-300 px-6 py-3 bg-stone-50 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-black hover:bg-black/10 h-8 px-3"
              >
                View/Edit Full Menu
                <ExternalLink className="ml-1.5 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 mb-8 border-b border-stone-300 pb-4 pt-4">
          <h2 className="text-3xl font-semibold tracking-tight text-black">
            Additional Tools
          </h2>
          <p className="mt-2 text-base text-stone-600">
            Other operational areas (features coming soon).
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <Card className="border border-stone-300 bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold text-black">
                  Inventory
                </CardTitle>
                <CardDescription className="text-stone-600">
                  Track stock levels & manage suppliers.
                </CardDescription>
              </div>
              <Boxes className="h-6 w-6 text-stone-500" />
            </CardHeader>
            <CardContent className="pt-4">
              <Alert
                variant="default"
                className="border-stone-400 bg-stone-100 text-stone-800"
              >
                <Construction className="h-5 w-5 text-stone-600" />
                <AlertTitle className="font-semibold text-stone-900">
                  Feature Under Development
                </AlertTitle>
                <AlertDescription className="text-sm text-stone-700">
                  Advanced inventory management tools are coming soon. Stay
                  tuned!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          <Card className="border border-stone-300 bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold text-black">
                  Staff Scheduling
                </CardTitle>
                <CardDescription className="text-stone-600">
                  Plan shifts and manage availability.
                </CardDescription>
              </div>
              <UsersRound className="h-6 w-6 text-stone-500" />
            </CardHeader>
            <CardContent className="pt-4">
              <Alert
                variant="default"
                className="border-stone-400 bg-stone-100 text-stone-800"
              >
                <Construction className="h-5 w-5 text-stone-600" />
                <AlertTitle className="font-semibold text-stone-900">
                  Coming Soon!
                </AlertTitle>
                <AlertDescription className="text-sm text-stone-700">
                  Tools for scheduling and team communication are under
                  development.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
