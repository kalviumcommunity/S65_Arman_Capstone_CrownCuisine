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
import { Separator } from "@/components/ui/separator";
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
  PlusCircle,
  Edit,
  ExternalLink,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Circle,
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
    date: "2025-04-05",
    time: "19:00",
    partySize: 2,
    status: "Confirmed",
    notes: "Birthday celebration",
  },
  {
    id: "b2",
    customerName: "Priya Kaur",
    date: "2025-04-05",
    time: "20:30",
    partySize: 4,
    status: "Confirmed",
    notes: "Window seat requested",
  },
  {
    id: "b3",
    customerName: "Amit Singh",
    date: "2025-04-06",
    time: "18:30",
    partySize: 3,
    status: "Confirmed",
  },
  {
    id: "b6",
    customerName: "Geeta Verma",
    date: "2025-04-06",
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
  const isConfirmed = status === "Confirmed";
  const isPending = status === "Pending";
  const variant: "default" | "outline" | "secondary" | "destructive" =
    status === "Confirmed"
      ? "default"
      : status === "Pending"
        ? "outline"
        : status === "Cancelled"
          ? "destructive"
          : status === "Completed"
            ? "secondary"
            : "default";

  return (
    <Badge
      variant={variant}
      className="capitalize text-xs whitespace-nowrap px-2 py-0.5"
    >
      {isConfirmed ? (
        <CheckCircle2 className="mr-1 h-3 w-3" />
      ) : isPending ? (
        <Circle className="mr-1 h-3 w-3" />
      ) : null}
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
      // Ensure date is treated correctly regardless of input type
      const date =
        typeof dateInput === "string"
          ? new Date(dateInput + "T00:00:00")
          : dateInput;
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        // year: "numeric" // Add year if needed for clarity
      });
    } catch (e) {
      console.error("Invalid date format:", dateInput);
      return "Invalid Date";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section - Updated to match other banners */}
      <div className="relative overflow-hidden bg-black w-full">
        <div className="container relative z-10 mx-auto px-4 pb-16 pt-20 text-center md:pb-24 md:pt-28 lg:pt-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Owner Dashboard
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
            Manage bookings, menus, and operations for your restaurant
            efficiently.
          </p>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        {/* Core Management Section Header */}
        <div className="mb-8 border-b pb-4">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Core Management
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Manage your primary operations: Bookings and Menu.
          </p>
        </div>
        {/* Core Management Grid */}
        {/* The grid layout automatically handles column alignment.
                    Adding `h-full` to the Card components tells them to fill the height
                    of their grid cell. We also use `flex flex-col` inside the cards
                    and `flex-grow` on the content areas to push footers down. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 items-stretch">
          {" "}
          {/* Added items-stretch */}
          {/* Upcoming Bookings Card */}
          {/* Added `h-full` and `flex flex-col` */}
          <Card className="h-full flex flex-col border bg-card text-card-foreground shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="space-y-1">
                <CardTitle className="text-lg font-medium">
                  Upcoming Bookings
                </CardTitle>
                <CardDescription>
                  Next {MAX_PREVIEW_BOOKINGS} pending/confirmed reservations.
                </CardDescription>
              </div>
              <CalendarCheck className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            {/* Added `flex-grow` to allow content area to expand */}
            <CardContent className="p-0 flex-grow">
              <div className="space-y-3 p-6 pt-2 h-full">
                {" "}
                {/* Ensure inner div takes space */}
                {upcomingBookingsPreview.length > 0 ? (
                  upcomingBookingsPreview.map((booking) => (
                    <Card
                      key={booking.id}
                      className="border shadow-sm transition-all hover:shadow-md hover:border-primary/30 bg-card overflow-hidden"
                    >
                      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-x-4 gap-y-3">
                        <div className="flex-grow space-y-1.5 min-w-0">
                          <p
                            className="font-semibold text-base text-card-foreground truncate"
                            title={booking.customerName}
                          >
                            {booking.customerName}
                          </p>
                          <div className="flex items-center gap-x-3 gap-y-1 flex-wrap text-sm text-muted-foreground">
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
                          <div className="flex items-center space-x-2">
                            <Label
                              htmlFor={`status-toggle-${booking.id}`}
                              className="sr-only"
                            >
                              {booking.status === "Confirmed"
                                ? "Mark as Pending"
                                : "Mark as Confirmed"}
                            </Label>
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
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center">
                    {" "}
                    {/* Center placeholder text */}
                    <p className="text-center text-muted-foreground px-6">
                      No upcoming bookings found.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            {/* Footer remains at the bottom */}
            <CardFooter className="border-t px-6 py-3 bg-muted/30 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/10 h-8 px-3"
              >
                View All Bookings
                <ExternalLink className="ml-1.5 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          {/* Menu Management Card */}
          {/* Kept `flex flex-col`, added `h-full` */}
          <Card className="h-full flex flex-col border bg-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold">
                  Menu Management
                </CardTitle>
                <CardDescription>
                  Preview, add, edit, or delete menu items.
                </CardDescription>
              </div>
              <BookOpenText className="h-6 w-6 text-primary" />
            </CardHeader>
            {/* Added `flex-grow` to allow content area to expand */}
            <CardContent className="p-0 flex-grow">
              <div className="space-y-3 p-6 pt-2 h-full">
                {menuItemsPreview.length > 0 ? (
                  menuItemsPreview.map((item) => (
                    <Card
                      key={item.id}
                      className="border shadow-sm transition-all hover:shadow-md hover:border-primary/30 bg-card overflow-hidden"
                    >
                      <CardContent className="p-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-10 w-10 rounded object-cover flex-shrink-0 border"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded bg-secondary flex items-center justify-center flex-shrink-0 border">
                              <Utensils className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <div className="flex-grow min-w-0">
                            <p
                              className="text-sm font-medium truncate"
                              title={item.name}
                            >
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ₹{item.price.toFixed(2)}{" "}
                              <span className="mx-1 hidden sm:inline">·</span>{" "}
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
                            className="h-8 w-8"
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
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">
                                  Delete {item.name}
                                </span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete the menu item "
                                  <span className="font-semibold">
                                    {item.name}
                                  </span>
                                  ".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className={buttonVariants({
                                    variant: "destructive",
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
                    {" "}
                    {/* Center placeholder text */}
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No menu items added yet.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            {/* Footer remains at the bottom */}
            <CardFooter className="border-t px-6 py-3 bg-muted/50 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/10 h-8 px-3"
              >
                View/Edit Full Menu
                <ExternalLink className="ml-1.5 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>{" "}
        {/* End Core Management Grid */}
        {/* Additional Tools Section */}
        <div className="mt-12 mb-8 border-b pb-4 pt-4">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Additional Tools
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Other operational areas (features coming soon).
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {/* Inventory Card */}
          <Card className="border bg-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold">
                  Inventory
                </CardTitle>
                <CardDescription>
                  Track stock levels & manage suppliers.
                </CardDescription>
              </div>
              <Boxes className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-4">
              <Alert
                variant="default"
                className="border-yellow-500/50 bg-yellow-50 text-yellow-900 dark:bg-yellow-950/60 dark:text-yellow-200 dark:border-yellow-700/80"
              >
                <Construction className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                <AlertTitle className="font-semibold text-yellow-800 dark:text-yellow-300">
                  Feature Under Development
                </AlertTitle>
                <AlertDescription className="text-sm">
                  Advanced inventory management tools are coming soon. Stay
                  tuned!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          {/* Staff Scheduling Card */}
          <Card className="border bg-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold">
                  Staff Scheduling
                </CardTitle>
                <CardDescription>
                  Plan shifts and manage availability.
                </CardDescription>
              </div>
              <UsersRound className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-4">
              <Alert
                variant="default"
                className="border-blue-500/50 bg-blue-50 text-blue-900 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-700/80"
              >
                <Construction className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                <AlertTitle className="font-semibold text-blue-800 dark:text-blue-300">
                  Coming Soon!
                </AlertTitle>
                <AlertDescription className="text-sm">
                  Tools for scheduling and team communication are under
                  development.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>{" "}
        {/* End Additional Tools Grid */}
      </div>{" "}
      {/* End Container */}
    </div> /* End Page Wrapper */
  );
}
