import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Flame, Plus, Minus } from "lucide-react";

const MenuCard = ({ item }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToOrder = (e) => {
        e.stopPropagation();
        console.log(`Added ${quantity} of ${item.name} to order`);
    };

    const incrementQuantity = (e) => {
        e.stopPropagation();
        setQuantity((prev) => prev + 1);
    };

    const decrementQuantity = (e) => {
        e.stopPropagation();
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const renderSpicyIndicator = () => {
        if (!item.spicyLevel) return null;

        const level = item.spicyLevel.toLowerCase();
        const spicyColors = {
            mild: "text-yellow-500",
            medium: "text-orange-500",
            hot: "text-red-500",
            "extra hot": "text-red-600",
        };

        const color = spicyColors[level] || "text-red-500";

        return (
            <div className="flex items-center gap-1">
                <Flame className={`h-4 w-4 ${color}`} />
                <span className="text-xs font-medium">{item.spicyLevel}</span>
            </div>
        );
    };

    return (
        <Card
            className="overflow-hidden transition-all duration-300 hover:shadow-lg group h-full flex flex-col p-0 rounded-lg"
            onClick={() => console.log(`Selected ${item.name}`)}
        >
            {/* Image Section */}
            <div className="relative w-full overflow-hidden rounded-t-lg">
                {item.image && (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-56 object-cover object-center transition-transform"
                        style={{ display: "block", margin: 0 }}
                        loading="lazy"
                    />
                )}

                {/* Price Badge */}
                <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 bg-black/75 text-white px-2.5 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                        ${item.price.toFixed(2)}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <CardContent className="pt-4 px-4 pb-2 flex-grow">
                {item.dietary && item.dietary.length > 0 && (
                    <Badge variant="secondary" className="mb-2 font-medium">
                        {item.dietary[0]}
                    </Badge>
                )}

                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold line-clamp-1">
                        {item.name}
                    </h2>
                    {renderSpicyIndicator()}
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2">
                    {item.description}
                </p>

                {item.isChefSpecial && (
                    <div className="flex items-center gap-2 mt-2">
                        <ChefHat className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            Chef's special
                        </span>
                    </div>
                )}
            </CardContent>

            {/* Footer Section */}
            <CardFooter className="pt-2 pb-4 px-4">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center border rounded-md">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={decrementQuantity}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                            {quantity}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={incrementQuantity}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                    <Button
                        className="font-medium transition-all duration-300 cursor-pointer"
                        onClick={handleAddToOrder}
                    >
                        Add to Order
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default MenuCard;
