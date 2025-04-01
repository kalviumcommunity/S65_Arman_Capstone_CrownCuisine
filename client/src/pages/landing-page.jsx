import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {
    CalendarCheck,
    UtensilsCrossed,
    CreditCard,
    MenuSquare,
    Warehouse,
    UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black flex flex-col">
            {/* Hero Section */}
            <section className="flex items-center justify-center text-center px-6 pt-24 pb-12">
                <div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                        Streamline Your Restaurant
                        <br />
                        Management Experience
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                        A comprehensive platform designed to empower restaurant
                        owners and delight customers with seamless, innovative
                        solutions.
                    </p>
                    <div className="flex justify-center gap-4 mb-8">
                        <Button
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 flex items-center cursor-pointer text-lg font-medium"
                            variant="default"
                            onClick={() => navigate("/auth")}
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full max-w-7xl mx-auto px-6 pt-0 pb-16">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Customer Features */}
                    <Card className="flex flex-col items-center bg-zinc-950 border-zinc-800">
                        <CardHeader className="flex flex-col items-center">
                            <CalendarCheck
                                className="w-8 h-8 text-white mb-4"
                                style={{ strokeWidth: 2 }}
                            />
                            <CardTitle className="text-white">
                                Easy Table Booking
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400">
                                Reserve your favorite table with just a few
                                clicks. View real-time availability and make
                                instant reservations.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant="default"
                                className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-white"
                            >
                                Get Started
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col items-center bg-zinc-950 border-zinc-800">
                        <CardHeader className="flex flex-col items-center">
                            <UtensilsCrossed
                                className="w-8 h-8 text-white mb-4"
                                style={{ strokeWidth: 2 }}
                            />
                            <CardTitle className="text-white">
                                Convenient Menu Ordering
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400">
                                Browse menus, customize orders, and place
                                seamless takeout from your favorite restaurants.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant="default"
                                className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-white"
                            >
                                Get Started
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col items-center bg-zinc-950 border-zinc-800">
                        <CardHeader className="flex flex-col items-center">
                            <CreditCard
                                className="w-8 h-8 text-white mb-4"
                                style={{ strokeWidth: 2 }}
                            />
                            <CardTitle className="text-white">
                                Secure Payments
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400">
                                Experience hassle-free, secure transactions with
                                multiple payment options and advanced
                                encryption.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant="default"
                                className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-white"
                            >
                                Get Started
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Owner Features */}
                    <Card className="flex flex-col items-center bg-zinc-950 border-zinc-800">
                        <CardHeader className="flex flex-col items-center">
                            <MenuSquare
                                className="w-8 h-8 text-white mb-4"
                                style={{ strokeWidth: 2 }}
                            />
                            <CardTitle className="text-white">
                                Dynamic Menu Management
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400">
                                Easily update menus, add specials, manage
                                pricing, and showcase your culinary offerings in
                                real-time.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant="default"
                                className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-white"
                            >
                                Get Started
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col items-center bg-zinc-950 border-zinc-800">
                        <CardHeader className="flex flex-col items-center">
                            <Warehouse
                                className="w-8 h-8 text-white mb-4"
                                style={{ strokeWidth: 2 }}
                            />
                            <CardTitle className="text-white">
                                Inventory Tracking
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400">
                                Monitor stock levels, track ingredient usage,
                                and receive automated restocking alerts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant="default"
                                className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-white"
                            >
                                Get Started
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col items-center bg-zinc-950 border-zinc-800">
                        <CardHeader className="flex flex-col items-center">
                            <UserCheck
                                className="w-8 h-8 text-white mb-4"
                                style={{ strokeWidth: 2 }}
                            />
                            <CardTitle className="text-white">
                                Staff Scheduling
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400">
                                Simplify workforce management with intuitive
                                scheduling, shift tracking, and performance
                                insights.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant="default"
                                className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-white"
                            >
                                Get Started
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
