import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export type Restaurant = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    rating: number;
    cuisine: string;
    location: string;
};

type RestaurantCardProps = {
    restaurant: Restaurant;
    priority?: boolean;
};

export const RestaurantCard = ({
    restaurant,
    priority = false,
}: RestaurantCardProps) => {
    return (
        <Card className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow duration-300 ease-in-out hover:border-black p-0 cursor-pointer">
            {/* Image container: No padding/margin to remove space */}
            <div className="relative h-48 w-full rounded-b-xl overflow-hidden">
                <Image
                    src={restaurant.imageUrl}
                    alt={`Image of ${restaurant.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="bg-muted"
                    priority={priority}
                />
            </div>

            {/* Content Area */}
            <div className="flex flex-1 flex-col p-5">
                <CardHeader className="w-full p-0">
                    <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg font-semibold leading-tight tracking-tight text-foreground">
                            {restaurant.name}
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="flex-grow p-0 py-3">
                    <p className="text-sm text-muted-foreground line-clamp-2 pb-2">
                        {restaurant.description}
                    </p>
                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <MapPin className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                        <span>{restaurant.location}</span>
                    </div>
                </CardContent>

                <CardFooter className="p-0" />
            </div>
        </Card>
    );
};
