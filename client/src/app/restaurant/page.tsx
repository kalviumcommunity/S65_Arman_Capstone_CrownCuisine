"use client";

import React, { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

// Shadcn UI Components
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
import { Textarea } from "@/components/ui/textarea";

// Icons
import {
    MapPin,
    Star,
    Utensils,
    Calendar as CalendarIcon,
    CheckCircleIcon,
    Users,
    ShoppingCart,
    PlusCircle,
    MinusCircle,
    Trash2,
    ClockIcon,
    InfoIcon,
    MinusIcon,
    PlusIcon,
} from "lucide-react";

type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
};

type MenuCategory = {
    id: string;
    name: string;
    items: MenuItem[];
};

// Updated RestaurantData type to use a single imageUrl
type RestaurantData = {
    id: string;
    name: string;
    description: string;
    imageUrl: string; // Changed from imageUrls array
    rating: number;
    cuisine: string;
    location: string;
    menu: {
        categories: MenuCategory[];
    };
};

// Updated mockRestaurantData with the single imageUrl and the specified URL
const mockRestaurantData: RestaurantData = {
    id: "1",
    name: "Haveli Eastwood",
    description:
        "Experience the rich flavors of Punjab in a setting that transports you to a traditional village. Enjoy live folk music every evening while savoring authentic dishes prepared with age-old recipes and the freshest local ingredients.",
    imageUrl: "", // Using the provided single image URL
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
                        description:
                            "Spinach and vegetable patties, shallow fried.",
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
                        description:
                            "Cottage cheese in a rich tomato and cream gravy.",
                        price: 380,
                    },
                    {
                        id: "v3",
                        name: "Sarson da Saag",
                        description:
                            "Mustard greens delicacy, served with makki di roti.",
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
                        description:
                            "Classic tandoori chicken in a creamy tomato gravy.",
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
        console.log("Booking Details:", {
            date: bookingDate,
            time: bookingTime,
            size: partySize,
        });
        alert(
            `Table booking requested for ${partySize} on ${format(bookingDate, "PPP")} at ${bookingTime}.`
        ); // Used format here for consistency
    };

    const handleAddToOrder = (item: MenuItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (cartItem) => cartItem.id === item.id
            );
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
            return prevCart
                .map((item) =>
                    item.id === itemId
                        ? {
                              ...item,
                              quantity: Math.max(0, item.quantity + change),
                          }
                        : item
                )
                .filter((item) => item.quantity > 0);
        });
    };

    const handleRemoveFromCart = (itemId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };

    const calculateCartTotal = () => {
        return cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
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
            {/* --- Banner Section --- */}
            <div className="w-full h-[40vh] md:h-[55vh] relative bg-black">
                <div className="absolute bottom-8 left-4 md:bottom-16 md:left-8 z-10 text-white max-w-xl">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
                        {restaurant.name}
                    </h1>
                </div>
            </div>

            {/* --- Main Content Section --- */}
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {/* --- Left Column (Info & Booking) --- */}
                    <div className="md:col-span-1 space-y-6">
                        {/* Restaurant Info Card */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between gap-4">
                                    <Badge
                                        variant="secondary"
                                        className="text-sm"
                                    >
                                        <Utensils className="mr-1.5 h-4 w-4" />
                                        {restaurant.cuisine}
                                    </Badge>
                                    {renderRating(restaurant.rating)}
                                </div>
                                <CardDescription className="pt-3 text-base">
                                    {restaurant.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-muted-foreground text-sm">
                                    <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                                    <span>{restaurant.location}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Booking Card */}
                        <Card className="overflow-hidden border shadow-md">
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    Reserve Your Table
                                </CardTitle>
                                <CardDescription>
                                    Experience an unforgettable dining moment
                                </CardDescription>
                            </CardHeader>

                            <form onSubmit={handleBooking}>
                                <CardContent className="space-y-6 p-6">
                                    {/* Date & Time Selection Row */}
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        {/* Date Picker */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="booking-date"
                                                className="font-medium"
                                            >
                                                Please select date
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full justify-start p-6 text-left font-normal"
                                                    >
                                                        <CalendarIcon className="mr-2 h-5 w-5" />
                                                        {bookingDate ? (
                                                            format(
                                                                bookingDate,
                                                                "EEEE, MMMM d"
                                                            )
                                                        ) : (
                                                            <span className="text-muted-foreground">
                                                                Select date
                                                            </span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        selected={bookingDate}
                                                        onSelect={
                                                            setBookingDate
                                                        }
                                                        disabled={(date) =>
                                                            date <
                                                            new Date(
                                                                new Date().setHours(
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    0
                                                                )
                                                            )
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        {/* Time Picker */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="booking-time"
                                                className="font-medium"
                                            >
                                                Please select time
                                            </Label>
                                            <Select
                                                onValueChange={setBookingTime}
                                            >
                                                <SelectTrigger className="p-6">
                                                    <ClockIcon className="mr-2 h-5 w-5" />
                                                    <SelectValue placeholder="Select time" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-72">
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Lunch
                                                        </SelectLabel>
                                                        <SelectItem value="12:00">
                                                            12:00 PM
                                                        </SelectItem>
                                                        <SelectItem value="12:30">
                                                            12:30 PM
                                                        </SelectItem>
                                                        <SelectItem value="13:00">
                                                            1:00 PM
                                                        </SelectItem>
                                                        <SelectItem value="13:30">
                                                            1:30 PM
                                                        </SelectItem>
                                                        <SelectItem value="14:00">
                                                            2:00 PM
                                                        </SelectItem>
                                                        <SelectItem value="14:30">
                                                            2:30 PM
                                                        </SelectItem>
                                                    </SelectGroup>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Dinner
                                                        </SelectLabel>
                                                        <SelectItem value="18:00">
                                                            6:00 PM
                                                        </SelectItem>
                                                        <SelectItem value="18:30">
                                                            6:30 PM
                                                        </SelectItem>
                                                        <SelectItem value="19:00">
                                                            7:00 PM
                                                        </SelectItem>
                                                        <SelectItem value="19:30">
                                                            7:30 PM
                                                        </SelectItem>
                                                        <SelectItem value="20:00">
                                                            8:00 PM
                                                        </SelectItem>
                                                        <SelectItem value="20:30">
                                                            8:30 PM
                                                        </SelectItem>
                                                        <SelectItem value="21:00">
                                                            9:00 PM
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Party Size Selector */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="party-size"
                                            className="font-medium"
                                        >
                                            Please select the number of guests
                                        </Label>
                                        <div className="flex items-center space-x-3">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="h-10 w-10 rounded-full"
                                                onClick={() =>
                                                    setPartySize(
                                                        Math.max(
                                                            1,
                                                            partySize - 1
                                                        )
                                                    )
                                                }
                                            >
                                                <MinusIcon className="h-4 w-4" />
                                            </Button>

                                            <div className="flex-1">
                                                <Input
                                                    id="party-size"
                                                    type="number"
                                                    min="1"
                                                    value={partySize}
                                                    onChange={(e) =>
                                                        setPartySize(
                                                            parseInt(
                                                                e.target.value
                                                            ) || 1
                                                        )
                                                    }
                                                    className="p-6 text-center text-lg"
                                                    required
                                                />
                                            </div>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="h-10 w-10 rounded-full"
                                                onClick={() =>
                                                    setPartySize(partySize + 1)
                                                }
                                            >
                                                <PlusIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="bg-muted/50 p-5">
                                    <Button
                                        type="submit"
                                        className="w-full p-5 text-sm font-medium"
                                    >
                                        Confirm Reservation
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>

                    {/* --- Right Column (Menu) --- */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold tracking-tight mb-4">
                            Menu
                        </h2>
                        <Accordion type="multiple" className="w-full space-y-2">
                            {restaurant.menu.categories.map((category) => (
                                <AccordionItem
                                    key={category.id}
                                    value={category.id}
                                    className="border rounded-lg bg-card"
                                >
                                    <AccordionTrigger className="px-4 text-lg font-medium hover:no-underline">
                                        {category.name}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pt-0 pb-4">
                                        <div className="space-y-4">
                                            {category.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between gap-4 pt-3 border-t border-border/50 first:border-t-0 first:pt-0"
                                                >
                                                    <div className="flex-grow">
                                                        <h4 className="font-semibold">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {item.description}
                                                        </p>
                                                        <p className="text-sm font-medium mt-1">
                                                            ₹
                                                            {item.price.toFixed(
                                                                2
                                                            )}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleAddToOrder(
                                                                item
                                                            )
                                                        }
                                                        aria-label={`Add ${item.name} to order`}
                                                    >
                                                        <PlusCircle className="h-4 w-4 mr-1" />{" "}
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

            {/* --- Cart Sheet --- */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="default"
                        size="lg"
                        className="fixed bottom-6 right-6 rounded-full shadow-lg z-50 h-14 w-14 p-0"
                        aria-label="Open Cart"
                    >
                        <ShoppingCart className="h-6 w-6" />
                        {cart.length > 0 && (
                            <Badge
                                variant="destructive"
                                className="absolute -top-1 -right-1 rounded-full px-1.5 text-xs"
                            >
                                {cart.reduce(
                                    (sum, item) => sum + item.quantity,
                                    0
                                )}
                            </Badge>
                        )}
                    </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                    <SheetHeader>
                        <SheetTitle>Your Order</SheetTitle>
                        <SheetDescription>
                            Review items and proceed to checkout.
                        </SheetDescription>
                    </SheetHeader>
                    <Separator className="my-4" />
                    {cart.length === 0 ? (
                        <div className="flex-grow flex flex-col items-center justify-center text-center">
                            <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
                            <p className="text-muted-foreground">
                                Your cart is empty.
                            </p>
                            <SheetClose asChild>
                                <Button variant="outline" className="mt-4">
                                    Start Ordering
                                </Button>
                            </SheetClose>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto -mx-6 px-6">
                            {" "}
                            {/* Adjusted padding for scroll */}
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-start justify-between gap-3 border-b pb-3 last:border-b-0 last:pb-0"
                                    >
                                        {" "}
                                        {/* Improved spacing and borders */}
                                        <div className="flex-grow">
                                            <h4 className="font-semibold text-sm">
                                                {item.name}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                ₹{item.price.toFixed(2)}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() =>
                                                        handleUpdateQuantity(
                                                            item.id,
                                                            -1
                                                        )
                                                    }
                                                    aria-label="Decrease quantity"
                                                >
                                                    <MinusCircle className="h-3 w-3" />
                                                </Button>
                                                <span className="text-sm font-medium w-4 text-center">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() =>
                                                        handleUpdateQuantity(
                                                            item.id,
                                                            1
                                                        )
                                                    }
                                                    aria-label="Increase quantity"
                                                >
                                                    <PlusCircle className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end">
                                            {" "}
                                            {/* Aligned price and button */}
                                            <p className="font-semibold text-sm">
                                                ₹
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </p>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 mt-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                onClick={() =>
                                                    handleRemoveFromCart(
                                                        item.id
                                                    )
                                                }
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Footer (only shown if cart has items) */}
                    {cart.length > 0 && (
                        <>
                            <Separator className="my-4" />
                            <SheetFooter className="mt-auto pt-4 border-t">
                                {" "}
                                {/* Added padding and border */}
                                <div className="flex flex-col w-full gap-3">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total:</span>
                                        <span>
                                            ₹{calculateCartTotal().toFixed(2)}
                                        </span>
                                    </div>
                                    <Button size="lg" onClick={handleCheckout}>
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
