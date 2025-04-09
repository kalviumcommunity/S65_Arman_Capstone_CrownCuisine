"use client";

import React, { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@/components/ui/select";

import {
  MapPin,
  Star,
  Utensils,
  Calendar as CalendarIcon,
  ShoppingCart,
  Trash2,
  ClockIcon,
  Package,
  Plus,
  Minus,
} from "lucide-react";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};

type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

type RestaurantData = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  cuisine: string;
  location: string;
  menu: {
    categories: MenuCategory[];
  };
};

const mockRestaurantData: RestaurantData = {
  id: "1",
  name: "Haveli Eastwood",
  description:
    "Experience the rich flavors of Punjab in a setting that transports you to a traditional village. Enjoy live folk music every evening while savoring authentic dishes prepared with age-old recipes and the freshest local ingredients.",
  imageUrl: "", // Intentionally left blank as in the original code
  rating: 4.7,
  cuisine: "Punjabi",
  location: "GT Road, Near Amritsar Bypass",
  menu: {
    categories: [
      {
        id: "cat1",
        name: "Appetizers",
        items: [
          {
            id: "a1",
            name: "Paneer Tikka",
            description:
              "Marinated cottage cheese cubes grilled to perfection.",
            price: 280,
          },
          {
            id: "a2",
            name: "Amritsari Fish Fry",
            description: "Spicy fried fish, a local specialty.",
            price: 350,
          },
          {
            id: "a3",
            name: "Hara Bhara Kebab",
            description: "Spinach and vegetable patties, shallow fried.",
            price: 250,
          },
        ],
      },
      {
        id: "cat2",
        name: "Main Course (Veg)",
        items: [
          {
            id: "v1",
            name: "Dal Makhani",
            description: "Creamy black lentils simmered overnight.",
            price: 320,
          },
          {
            id: "v2",
            name: "Shahi Paneer",
            description: "Cottage cheese in a rich tomato and cream gravy.",
            price: 380,
          },
          {
            id: "v3",
            name: "Sarson da Saag",
            description: "Mustard greens delicacy, served with makki di roti.",
            price: 400,
          },
        ],
      },
      {
        id: "cat3",
        name: "Main Course (Non-Veg)",
        items: [
          {
            id: "nv1",
            name: "Butter Chicken",
            description: "Classic tandoori chicken in a creamy tomato gravy.",
            price: 450,
          },
          {
            id: "nv2",
            name: "Rogan Josh",
            description: "Aromatic lamb curry.",
            price: 550,
          },
        ],
      },
      {
        id: "cat4",
        name: "Breads & Rice",
        items: [
          {
            id: "b1",
            name: "Tandoori Roti",
            description: "Whole wheat bread baked in tandoor.",
            price: 40,
          },
          {
            id: "b2",
            name: "Garlic Naan",
            description: "Leavened bread with garlic.",
            price: 70,
          },
          {
            id: "b3",
            name: "Jeera Rice",
            description: "Basmati rice tempered with cumin.",
            price: 180,
          },
        ],
      },
    ],
  },
};

type CartItem = MenuItem & { quantity: number };

export default function RestaurantPage() {
  const restaurant = mockRestaurantData;

  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [bookingTime, setBookingTime] = useState<string>("");
  const [partySize, setPartySize] = useState<number>(2);

  const [cart, setCart] = useState<CartItem[]>([]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime || partySize < 1) {
      alert("Please fill in all booking details.");
      return;
    }
    // Format date for logging/alert if it exists
    const formattedDate = bookingDate ? format(bookingDate, "PPP") : "N/A";
    console.log("Booking Details:", {
      date: formattedDate,
      time: bookingTime,
      size: partySize,
    });
    alert(
      `Table booking requested for ${partySize} on ${formattedDate} at ${bookingTime}.`
    );
  };

  const handleAddToOrder = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    console.log("Added to cart:", item.name);
  };

  const handleUpdateQuantity = (itemId: string, change: number) => {
    setCart((prevCart) => {
      return (
        prevCart
          .map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  // Ensure quantity doesn't go below 0 before filtering
                  quantity: Math.max(0, item.quantity + change),
                }
              : item
          )
          // Filter out items where quantity is 0 *after* mapping
          .filter((item) => item.quantity > 0)
      );
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const total = calculateCartTotal();
    console.log("Proceeding to Checkout with:", cart);
    console.log("Total Amount:", total);
    alert(`Proceeding to checkout. Total: ₹${total.toFixed(2)}`);
    // Clear cart after checkout simulation
    // setCart([]); // Optional: Uncomment to clear cart
  };

  const renderRating = (rating: number) => (
    <div className="flex items-center gap-1 text-sm font-medium">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <span>{rating.toFixed(1)}</span>
      <span className="text-muted-foreground">(Rating)</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Updated header */}
      <div className="relative overflow-hidden bg-black w-full">
        <div className="container relative z-10 mx-auto px-4 pb-16 pt-20 text-center md:pb-24 md:pt-28 lg:pt-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {restaurant.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
            Experience authentic {restaurant.cuisine} cuisine in a memorable
            setting
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* --- Column 1: Restaurant Info & Booking --- */}
          <div className="md:col-span-1 space-y-6">
            {/* --- START: Restaurant Description Card Changes --- */}
            <Card className="overflow-hidden shadow-md">
              {" "}
              {/* Removed p-2, added shadow-md */}
              <CardHeader className="p-6 pb-4">
                {" "}
                {/* Added p-6, adjusted pb */}
                <div className="flex items-start gap-4">
                  {" "}
                  {/* Adjusted gap slightly */}
                  {/* Restaurant Logo Area */}
                  <div className="h-20 w-20 rounded-md border bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {" "}
                    {/* Slightly smaller logo area */}
                    {restaurant.imageUrl ? (
                      <Image
                        src={restaurant.imageUrl}
                        alt={`${restaurant.name} logo`}
                        width={80} // Match container
                        height={80} // Match container
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Utensils className="h-10 w-10 text-muted-foreground/40" /> // Slightly smaller icon
                    )}
                  </div>
                  {/* Restaurant Details */}
                  <div className="flex-1 space-y-1.5">
                    {" "}
                    {/* Added space-y */}
                    {/* Moved Title here for better flow */}
                    <h3 className="text-xl font-semibold leading-tight">
                      {" "}
                      {/* Larger Title */}
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center justify-between gap-4">
                      <Badge
                        variant="secondary"
                        className="text-xs px-2 py-0.5" // Smaller badge text/padding
                      >
                        <Utensils className="mr-1 h-3 w-3" />{" "}
                        {/* Smaller icon */}
                        {restaurant.cuisine}
                      </Badge>
                      {renderRating(restaurant.rating)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                {" "}
                {/* Added p-6 pt-0, added space-y */}
                {/* Moved Description Here */}
                <CardDescription className="text-base text-muted-foreground text-justify leading-relaxed">
                  {" "}
                  {/* Use muted-foreground for standard description color */}
                  {restaurant.description}
                </CardDescription>
                {/* Location */}
                <div className="flex items-center text-muted-foreground text-sm border-t pt-4">
                  {" "}
                  {/* Added border-t and pt-4 */}
                  <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span>{restaurant.location}</span>
                </div>
              </CardContent>
            </Card>
            {/* --- END: Restaurant Description Card Changes --- */}

            {/* --- Booking Card (Existing structure) --- */}
            <Card className="overflow-hidden border shadow-md w-full max-w-md mx-auto">
              <CardHeader className="p-6 pb-4">
                {" "}
                {/* Consistent Padding */}
                <CardTitle className="text-xl">
                  Reserve Your Table
                </CardTitle>{" "}
                {/* Adjusted size */}
                <CardDescription>
                  Experience an unforgettable dining moment
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleBooking}>
                <CardContent className="space-y-6 p-6">
                  {/* Grid for Date and Time */}
                  <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
                    {/* Date Picker Section */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="booking-date-trigger"
                        className="font-medium"
                      >
                        Please select date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="booking-date-trigger"
                            variant="outline"
                            className="w-full h-11 justify-start text-left font-normal flex items-center px-3"
                          >
                            <CalendarIcon className="mr-2 h-5 w-5 flex-shrink-0" />
                            {bookingDate ? (
                              format(bookingDate, "MMM d, yyyy")
                            ) : (
                              <span className="text-muted-foreground">
                                Select date
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={bookingDate}
                            onSelect={setBookingDate}
                            // Disable past dates, including today
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Time Picker Section */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="booking-time-trigger"
                        className="font-medium"
                      >
                        Please select time
                      </Label>
                      <Select
                        value={bookingTime}
                        onValueChange={setBookingTime}
                      >
                        <SelectTrigger
                          id="booking-time-trigger"
                          className="w-full h-11 px-3"
                        >
                          <div className="flex items-center">
                            <ClockIcon className="mr-2 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                            <SelectValue placeholder="Select time" />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="max-h-72">
                          {/* Lunch Times */}
                          <SelectGroup>
                            <SelectLabel>Lunch</SelectLabel>
                            <SelectItem value="12:00 PM">
                              12:00 PM
                            </SelectItem>{" "}
                            {/* Use display value */}
                            <SelectItem value="12:30 PM">12:30 PM</SelectItem>
                            <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                            <SelectItem value="1:30 PM">1:30 PM</SelectItem>
                            <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                            <SelectItem value="2:30 PM">2:30 PM</SelectItem>
                          </SelectGroup>
                          {/* Dinner Times */}
                          <SelectGroup>
                            <SelectLabel>Dinner</SelectLabel>
                            <SelectItem value="6:00 PM">
                              6:00 PM
                            </SelectItem>{" "}
                            {/* Use display value */}
                            <SelectItem value="6:30 PM">6:30 PM</SelectItem>
                            <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                            <SelectItem value="7:30 PM">7:30 PM</SelectItem>
                            <SelectItem value="8:00 PM">8:00 PM</SelectItem>
                            <SelectItem value="8:30 PM">8:30 PM</SelectItem>
                            <SelectItem value="9:00 PM">9:00 PM</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Party Size Section */}
                  <div className="space-y-2">
                    <Label htmlFor="party-size" className="font-medium">
                      Please select the number of guests
                    </Label>
                    <div className="flex items-center space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-11 w-11 rounded-full flex-shrink-0"
                        onClick={() => setPartySize(Math.max(1, partySize - 1))}
                        disabled={partySize <= 1}
                      >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Decrease guest count</span>
                      </Button>
                      <div className="flex-1 min-w-0">
                        <Input
                          id="party-size"
                          type="number"
                          min="1"
                          value={partySize}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setPartySize(isNaN(value) || value < 1 ? 1 : value);
                          }}
                          className="h-11 text-center text-lg w-full px-2"
                          required
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-11 w-11 rounded-full flex-shrink-0"
                        onClick={() => setPartySize(partySize + 1)}
                        // disabled={partySize >= 20} // Example max limit
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Increase guest count</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="bg-muted/50 p-4">
                  <Button
                    type="submit"
                    className="w-full h-11 text-base font-medium"
                    disabled={!bookingDate || !bookingTime || partySize < 1}
                  >
                    Confirm Reservation
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          {/* --- Column 2: Menu --- */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-semibold tracking-tight mb-6">
              {" "}
              {/* Larger heading, more margin */}
              Menu
            </h2>
            <Accordion type="multiple" className="w-full space-y-3">
              {" "}
              {/* Increased space-y */}
              {restaurant.menu.categories.map((category) => (
                <AccordionItem
                  key={category.id}
                  value={category.id}
                  className="border rounded-lg bg-card shadow-sm" // Added shadow-sm
                >
                  <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
                    {" "}
                    {/* Adjusted padding */}
                    {category.name}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4">
                    {" "}
                    {/* Adjusted padding */}
                    <div className="space-y-4 divide-y divide-border/40">
                      {" "}
                      {/* Added divider */}
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-4 pt-4 first:pt-0" // Adjusted padding/borders
                        >
                          <div className="flex-grow">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {" "}
                              {/* Added margin-top */}
                              {item.description}
                            </p>
                            <p className="text-sm font-medium mt-1.5">
                              {" "}
                              {/* Added margin-top */}₹{item.price.toFixed(2)}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddToOrder(item)}
                            aria-label={`Add ${item.name} to order`}
                            className="flex-shrink-0" // Prevent shrinking
                          >
                            <Plus className="h-4 w-4 mr-1.5" />{" "}
                            {/* Adjusted margin */}
                            Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* --- Cart Sheet (Using Redesigned Version) --- */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="default"
            size="lg"
            className="fixed bottom-6 right-6 rounded-full shadow-lg z-50 h-14 w-14 p-0 flex items-center justify-center"
            aria-label="Open Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {cart.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </Badge>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent className="flex h-full flex-col sm:max-w-lg w-[90vw] sm:w-full">
          {" "}
          {/* Added width control */}
          <SheetHeader className="px-6 pt-6 pb-4">
            <SheetTitle className="text-xl font-semibold">
              Your Order
            </SheetTitle>
            <SheetDescription>
              Review items and proceed to checkout when ready.
            </SheetDescription>
          </SheetHeader>
          <Separator />
          {cart.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center p-6 space-y-4">
              <ShoppingCart className="h-20 w-20 text-muted-foreground/20" />
              <p className="text-lg font-medium text-muted-foreground">
                Your cart is empty
              </p>
              <p className="text-sm text-muted-foreground">
                Add items from the menu to get started.
              </p>
              <SheetClose asChild>
                <Button variant="outline" className="mt-4">
                  Start Ordering
                </Button>
              </SheetClose>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 border-b border-border/50 pb-4 last:border-b-0 last:pb-0"
                  >
                    {/* Optional: Item Image Placeholder */}
                    <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0 border">
                      <Package className="h-8 w-8 text-muted-foreground/50" />
                    </div>

                    {/* Item Details & Quantity */}
                    <div className="flex flex-col flex-grow gap-1">
                      <h4 className="font-medium text-sm leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Price: ₹{item.price.toFixed(2)}
                      </p>
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          // Disable remove button logic moved to filter in handleUpdateQuantity
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="text-sm font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Item Total & Remove Button */}
                    <div className="flex flex-col items-end justify-between h-full flex-shrink-0 ml-auto pl-2">
                      <p className="font-semibold text-sm">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      {/* Remove button logic changed to use quantity update */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveFromCart(item.id)} // Direct remove instead
                        aria-label="Remove item completely"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Footer - Only shown if cart has items */}
          {cart.length > 0 && (
            <>
              <Separator />
              <SheetFooter className="px-6 py-4 mt-auto border-t bg-background">
                <div className="flex flex-col w-full gap-4">
                  <div className="flex justify-between items-center text-base font-medium">
                    <span>Subtotal:</span>
                    <span>₹{calculateCartTotal().toFixed(2)}</span>
                  </div>
                  {/* Add other potential elements like Discounts or Taxes here if needed */}
                  <Button size="lg" className="w-full" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </div>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
