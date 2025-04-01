import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogPortal,
    DialogOverlay,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import MenuCard from "../../components/menu-card";

const RestaurantDetails = ({ restaurant }) => {
    const navigate = useNavigate();

    const restaurantData = restaurant || {
        id: 1,
        name: "Sakura Sushi",
        cuisine: "Japanese",
        rating: 4.7,
        address: "456 Oak Ave, Somewhere, USA",
        description:
            "Authentic Japanese cuisine featuring fresh sushi and sashimi prepared by master chefs.",
        hours: "Mon-Sun: 11:00 AM - 10:00 PM",
        phone: "(555) 123-4567",
        images: [
            "https://images.unsplash.com/photo-1645371958635-88dd6c8e1be7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1512132411229-c30391241dd8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1512132411229-c30391241dd8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        menu: [
            {
                category: "Appetizers",
                items: [
                    {
                        name: "Edamame",
                        price: 6.99,
                        description: "Steamed soybeans with sea salt",
                        image: "https://images.unsplash.com/photo-1670237735381-ac5c7fa72c51?q=80&w=1706&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    },
                    {
                        name: "Gyoza",
                        price: 8.99,
                        description: "Pan-fried pork dumplings",
                        image: "https://images.unsplash.com/photo-1681747941397-1e2b22e0bb9a?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    },
                    {
                        name: "Miso Soup",
                        price: 4.99,
                        description:
                            "Traditional Japanese soup with tofu and seaweed",
                        image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    },
                ],
            },
            {
                category: "Sushi Rolls",
                items: [
                    {
                        name: "California Roll",
                        price: 10.99,
                        description: "Crab, avocado, cucumber",
                        image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    },
                ],
            },
        ],
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [date, setDate] = useState(new Date());
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === restaurantData.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? restaurantData.images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-6">
                <Button
                    variant="outline"
                    className="mb-4 cursor-pointer"
                    onClick={() => navigate("/customer-dashboard")}
                >
                    ← Back to Dashboard
                </Button>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Restaurant Images */}
                    <Card className="w-full md:w-2/3 overflow-hidden p-0 flex flex-col">
                        <div className="relative w-full h-[500px]">
                            <img
                                src={restaurantData.images[currentImageIndex]}
                                alt={`${restaurantData.name} interior`}
                                className="w-full h-full object-cover object-center"
                                style={{ display: "block" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-between p-4">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={prevImage}
                                    className="rounded-full bg-white/80 hover:bg-white/90 cursor-pointer"
                                >
                                    ←
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={nextImage}
                                    className="rounded-full bg-white/80 hover:bg-white/90 cursor-pointer"
                                >
                                    →
                                </Button>
                            </div>
                            <div className="absolute bottom-4 right-4 bg-white/80 px-2 py-1 rounded-md">
                                {currentImageIndex + 1} /{" "}
                                {restaurantData.images.length}
                            </div>
                        </div>
                    </Card>

                    {/* Restaurant Info - Modified for height matching */}
                    <Card className="w-full md:w-1/3 h-[500px] flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl">
                                        {restaurantData.name}
                                    </CardTitle>
                                    <CardDescription>
                                        <span className="inline-block bg-black text-white px-2 py-1 rounded-lg mt-2 text-sm">
                                            {restaurantData.cuisine}
                                        </span>
                                        <span className="ml-2">
                                            ★ {restaurantData.rating}
                                        </span>
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold">Address</h3>
                                    <p>{restaurantData.address}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Hours</h3>
                                    <p>{restaurantData.hours}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p>{restaurantData.phone}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">About</h3>
                                    <p>{restaurantData.description}</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2 mt-auto">
                            <Dialog onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="flex-1 cursor-pointer">
                                        Reserve Table
                                    </Button>
                                </DialogTrigger>
                                <DialogPortal>
                                    <DialogOverlay className="bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                                    <DialogContent className="sm:max-w-[650px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Reserve a Table
                                            </DialogTitle>
                                            <DialogDescription>
                                                Make a reservation at{" "}
                                                {restaurantData.name}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid md:grid-cols-2 gap-6 py-4">
                                            <div className="flex flex-col gap-4">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    className="rounded-md border mx-auto"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="time">
                                                            Time
                                                        </Label>
                                                        <Select>
                                                            <SelectTrigger
                                                                id="time"
                                                                className="cursor-pointer"
                                                            >
                                                                <SelectValue placeholder="Select time" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem
                                                                    value="18:00"
                                                                    className="cursor-pointer"
                                                                >
                                                                    6:00 PM
                                                                </SelectItem>
                                                                <SelectItem
                                                                    value="18:30"
                                                                    className="cursor-pointer"
                                                                >
                                                                    6:30 PM
                                                                </SelectItem>
                                                                <SelectItem
                                                                    value="19:00"
                                                                    className="cursor-pointer"
                                                                >
                                                                    7:00 PM
                                                                </SelectItem>
                                                                <SelectItem
                                                                    value="19:30"
                                                                    className="cursor-pointer"
                                                                >
                                                                    7:30 PM
                                                                </SelectItem>
                                                                <SelectItem
                                                                    value="20:00"
                                                                    className="cursor-pointer"
                                                                >
                                                                    8:00 PM
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="guests">
                                                            Guests
                                                        </Label>
                                                        <Select>
                                                            <SelectTrigger
                                                                id="guests"
                                                                className="cursor-pointer"
                                                            >
                                                                <SelectValue placeholder="Select guests" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem
                                                                    value="1"
                                                                    className="cursor-pointer"
                                                                >
                                                                    1 Person
                                                                </SelectItem>
                                                                <SelectItem
                                                                    value="2"
                                                                    className="cursor-pointer"
                                                                >
                                                                    2 People
                                                                </SelectItem>
                                                                <SelectItem
                                                                    value="3"
                                                                    className="cursor-pointer"
                                                                >
                                                                    3 People
                                                                </SelectItem>
                                                                <SelectItem
                                                                    value="4"
                                                                    className="cursor-pointer"
                                                                >
                                                                    4 People
                                                                </SelectItem>
                                                                <SelectItem
                                                                    value="5"
                                                                    className="cursor-pointer"
                                                                >
                                                                    5+ People
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        placeholder="Your name"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">
                                                        Phone Number
                                                    </Label>
                                                    <Input
                                                        id="phone"
                                                        placeholder="Your phone number"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="special">
                                                        Special Requests
                                                    </Label>
                                                    <Input
                                                        id="special"
                                                        placeholder="Any special requests"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type="submit"
                                                className="cursor-pointer"
                                            >
                                                Confirm Reservation
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </DialogPortal>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="flex-1 cursor-pointer"
                                    >
                                        View Menu
                                    </Button>
                                </DialogTrigger>
                                <DialogPortal>
                                    <DialogOverlay className="bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                {restaurantData.name} Menu
                                            </DialogTitle>
                                            <DialogDescription>
                                                Browse our menu and place your
                                                order
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <Tabs
                                                defaultValue={
                                                    restaurantData.menu[0]
                                                        .category
                                                }
                                            >
                                                <TabsList className="mb-4">
                                                    {restaurantData.menu.map(
                                                        (category) => (
                                                            <TabsTrigger
                                                                key={
                                                                    category.category
                                                                }
                                                                value={
                                                                    category.category
                                                                }
                                                            >
                                                                {
                                                                    category.category
                                                                }
                                                            </TabsTrigger>
                                                        )
                                                    )}
                                                </TabsList>
                                                {restaurantData.menu.map(
                                                    (category) => (
                                                        <TabsContent
                                                            key={
                                                                category.category
                                                            }
                                                            value={
                                                                category.category
                                                            }
                                                        >
                                                            <div className="space-y-4">
                                                                {category.items.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="flex justify-between items-start pb-4"
                                                                        >
                                                                            <div className="space-y-1">
                                                                                <h4 className="font-medium">
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </h4>
                                                                                <p className="text-sm text-gray-500">
                                                                                    {
                                                                                        item.description
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-semibold">
                                                                                    $
                                                                                    {
                                                                                        item.price
                                                                                    }
                                                                                </span>
                                                                                <Button
                                                                                    size="sm"
                                                                                    variant="outline"
                                                                                >
                                                                                    Add
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </TabsContent>
                                                    )
                                                )}
                                            </Tabs>
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-medium">
                                                    Your Order (0 items)
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Total: $0.00
                                                </p>
                                            </div>
                                            <Button disabled>
                                                Place Order
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </DialogPortal>
                            </Dialog>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* Restaurant Menu Preview */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Menu Highlights</CardTitle>
                    <CardDescription>
                        Popular items our customers love
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {restaurantData.menu.flatMap((category) =>
                            category.items
                                .slice(0, 2)
                                .map((item, index) => (
                                    <MenuCard
                                        key={`${category.category}-${index}`}
                                        item={item}
                                    />
                                ))
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full cursor-pointer"
                            >
                                View Full Menu
                            </Button>
                        </DialogTrigger>
                        <DialogPortal>
                            <DialogOverlay className="bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
                                <DialogHeader>
                                    <DialogTitle>
                                        {restaurantData.name} Menu
                                    </DialogTitle>
                                    <DialogDescription>
                                        Browse our menu and place your order
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                    {/* Same menu content as above */}
                                </div>
                            </DialogContent>
                        </DialogPortal>
                    </Dialog>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RestaurantDetails;
