import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ restaurant, onSelect }) => {
    const navigate = useNavigate();

    return (
        <Card
            className="overflow-hidden transition-all duration-300 hover:shadow-lg group h-full flex flex-col p-0"
            onClick={() => onSelect(restaurant.id)}
        >
            {/* Image Section - No padding */}
            <div className="relative w-full h-56 overflow-hidden">
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover object-center transition-transform"
                    loading="lazy"
                />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 bg-black/75 text-white px-2.5 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{restaurant.rating}</span>
                    </div>
                </div>
            </div>

            {/* Content Section - Add explicit padding here */}
            <CardContent className="pt-4 px-4 pb-2 flex-grow">
                <Badge variant="secondary" className="mb-2 font-medium">
                    {restaurant.cuisine}
                </Badge>

                <h2 className="text-xl font-semibold line-clamp-1 mb-2">
                    {restaurant.name}
                </h2>

                <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <p className="line-clamp-2">{restaurant.address}</p>
                </div>
            </CardContent>

            {/* Footer Section - Add explicit padding */}
            <CardFooter className="pt-2 pb-4 px-4">
                <Button
                    className="w-full font-medium transition-all duration-300 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/restaurant/${restaurant.id}`);
                    }}
                >
                    Select Restaurant
                </Button>
            </CardFooter>
        </Card>
    );
};

export default RestaurantCard;
