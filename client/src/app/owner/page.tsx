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
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    CalendarCheck,
    BookOpenText,
    Boxes,
    UsersRound,
    Construction,
    PlusCircle,
    Edit,
    Check,
    X,
    ExternalLink,
} from "lucide-react";

type Booking = {
    id: string;
    customerName: string;
    date: string;
    time: string;
    partySize: number;
    status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
    notes?: string;
};

const mockBookings: Booking[] = [
    {
        id: "b1",
        customerName: "Rohan Sharma",
        date: "2025-04-05",
        time: "19:00",
        partySize: 2,
        status: "Pending",
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
        status: "Pending",
    },
    {
        id: "b4",
        customerName: "Sunita Devi",
        date: "2025-04-06",
        time: "19:00",
        partySize: 5,
        status: "Cancelled",
    },
    {
        id: "b5",
        customerName: "Vikram Kumar",
        date: "2025-04-04",
        time: "21:00",
        partySize: 2,
        status: "Completed",
    },
    {
        id: "b7",
        customerName: "Neha Patel",
        date: "2025-04-07",
        time: "13:00",
        partySize: 4,
        status: "Confirmed",
    },
    {
        id: "b8",
        customerName: "Arjun Reddy",
        date: "2025-04-07",
        time: "20:00",
        partySize: 2,
        status: "Pending",
    },
    {
        id: "b9",
        customerName: "Divya Nair",
        date: "2025-04-08",
        time: "19:30",
        partySize: 3,
        status: "Confirmed",
    },
];

const BookingStatusBadge = ({ status }: { status: Booking["status"] }) => {
    const variantMap: Record<
        Booking["status"],
        "default" | "secondary" | "destructive" | "outline"
    > = {
        Pending: "outline",
        Confirmed: "default",
        Cancelled: "destructive",
        Completed: "secondary",
    };
    const statusTextMap: Record<Booking["status"], string> = {
        Pending: "Pending",
        Confirmed: "Confirmed",
        Cancelled: "Cancelled",
        Completed: "Completed",
    };
    return <Badge variant={variantMap[status]}>{statusTextMap[status]}</Badge>;
};

export default function OwnerDashboardPage() {
    const MAX_PREVIEW_BOOKINGS = 9;
    const upcomingBookingsPreview = mockBookings
        .filter((b) => b.status === "Pending" || b.status === "Confirmed")
        .sort(
            (a, b) =>
                new Date(a.date + "T" + a.time).getTime() -
                new Date(b.date + "T" + b.time).getTime()
        )
        .slice(0, MAX_PREVIEW_BOOKINGS);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Plain black banner */}
            <div className="relative overflow-hidden bg-black">
                <div className="absolute inset-0"></div>
                <div className="container relative z-10 mx-auto px-4 pb-16 pt-20 text-center md:pb-24 md:pt-28 lg:pt-32">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                        Owner Dashboard
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-purple-100 md:text-xl">
                        Manage bookings, menus, and operations for your
                        restaurant efficiently.
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
                <div className="mb-6 pb-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                        Core Management
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage your primary operations: Bookings and Menu.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card className="border bg-card shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-semibold">
                                    Upcoming Bookings
                                </CardTitle>
                                <CardDescription>
                                    Next {MAX_PREVIEW_BOOKINGS}{" "}
                                    pending/confirmed reservations.
                                </CardDescription>
                            </div>
                            <CalendarCheck className="h-6 w-6 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {upcomingBookingsPreview.length > 0 ? (
                                    upcomingBookingsPreview.map((booking) => (
                                        <Card
                                            key={booking.id}
                                            className="bg-muted/50"
                                        >
                                            <CardHeader>
                                                <CardTitle>
                                                    {booking.customerName}
                                                </CardTitle>
                                                <CardDescription>
                                                    {new Date(
                                                        booking.date
                                                    ).toLocaleDateString(
                                                        "en-GB",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                        }
                                                    )}{" "}
                                                    @ {booking.time}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-1">
                                                <p className="text-sm">
                                                    Guests: {booking.partySize}
                                                </p>
                                                <BookingStatusBadge
                                                    status={booking.status}
                                                />
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="py-6 text-center text-muted-foreground">
                                        No upcoming bookings found.
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-3 bg-muted/50">
                            <Button variant="outline" size="sm">
                                {" "}
                                View All Bookings{" "}
                                <ExternalLink className="ml-2 h-3 w-3" />{" "}
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="flex flex-col border bg-card shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-semibold">
                                    Menu Management
                                </CardTitle>
                                <CardDescription>
                                    Update dishes, prices, and categories.
                                </CardDescription>
                            </div>
                            <BookOpenText className="h-6 w-6 text-primary" />
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4 pt-4">
                            <p className="text-sm text-muted-foreground">
                                Quick actions for managing your menu.
                            </p>
                            <div className="flex flex-col space-y-3">
                                <Button>
                                    {" "}
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add
                                    New Menu Item{" "}
                                </Button>
                                <Button variant="secondary">
                                    {" "}
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                    Existing Items{" "}
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-3 bg-muted/50">
                            <Button variant="outline" size="sm">
                                {" "}
                                View/Edit Full Menu{" "}
                                <ExternalLink className="ml-2 h-3 w-3" />{" "}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="mt-10 mb-6 pb-4 pt-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                        Additional Tools
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Other operational areas (features coming soon).
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                    Advanced inventory management tools are
                                    coming soon. Stay tuned!
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
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
                                    Tools for scheduling and team communication
                                    are under development.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
