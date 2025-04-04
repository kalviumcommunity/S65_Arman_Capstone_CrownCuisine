import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, Users, Crown, Utensils } from "lucide-react";

export default function LandingPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
                <Link href="/auth" passHref>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="w-48 justify-center px-4"
                    >
                        <LogIn className="mr-2 h-5 w-5" />
                        Auth
                    </Button>
                </Link>

                <Link href="/customer" passHref>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="w-48 justify-center px-4"
                    >
                        <Users className="mr-2 h-5 w-5" />
                        Customer
                    </Button>
                </Link>

                <Link href="/owner" passHref>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="w-48 justify-center px-4"
                    >
                        <Crown className="mr-2 h-5 w-5" />
                        Owner
                    </Button>
                </Link>

                <Link href="/restaurant" passHref>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="w-48 justify-center px-4"
                    >
                        <Utensils className="mr-2 h-5 w-5" />
                        Restaurant
                    </Button>
                </Link>
            </div>
        </main>
    );
}
