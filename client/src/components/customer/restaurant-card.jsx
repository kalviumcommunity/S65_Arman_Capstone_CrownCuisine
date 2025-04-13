"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Star, Utensils } from "lucide-react";

const RestaurantCard = ({ restaurant }) => {
  const {
    name = "Restaurant Name",
    image = "/placeholder-restaurant.jpg",
    cuisine = "Italian",
    rating = 4.5,
    distance = "1.2 km away",
    openingHours = "9:00 AM - 10:00 PM",
    id = "restaurant-1",
  } = restaurant || {};

  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all hover:shadow-md bg-white border-stone-200">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        <Badge className="absolute top-2 right-2 bg-stone-800 text-white">
          {rating} <Star className="ml-1 h-3 w-3 fill-current" />
        </Badge>
      </div>
      
      <CardHeader className="px-4 pt-4 pb-0">
        <CardTitle className="text-xl font-bold text-stone-800">{name}</CardTitle>
        <CardDescription className="flex items-center text-stone-500">
          <Utensils className="mr-1 h-4 w-4" />
          {cuisine}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 pt-2 pb-0">
        <div className="grid gap-1 text-sm text-stone-500">
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{distance}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{openingHours}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 flex justify-between">
        <Button variant="outline" className="border-stone-200 hover:bg-stone-100 text-stone-700">
          View Menu
        </Button>
        <Button className="bg-stone-800 hover:bg-stone-700 text-white">
          Book Table
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
