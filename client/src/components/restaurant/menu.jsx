import React from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const menuItems = {
  starters: [
    {
      id: "starter-1",
      name: "Caesar Salad",
      description: "Crisp romaine, garlic croutons, parmesan cheese with house-made Caesar dressing",
      price: "$9.99",
      image: "/images/caesar-salad.jpg"
    },
    {
      id: "starter-2",
      name: "Bruschetta",
      description: "Grilled artisan bread topped with diced tomatoes, fresh basil, and garlic",
      price: "$8.99",
      image: "/images/bruschetta.jpg"
    },
    {
      id: "starter-3",
      name: "Seasonal Soup",
      description: "Chef's daily creation using fresh seasonal ingredients",
      price: "$7.99",
      image: "/images/soup.jpg"
    },
  ],
  mainCourse: [
    {
      id: "main-1",
      name: "Margherita Pizza",
      description: "San Marzano tomato sauce, fresh mozzarella, basil, and extra virgin olive oil",
      price: "$14.99",
      image: "/images/pizza.jpg"
    },
    {
      id: "main-2",
      name: "Grilled Salmon",
      description: "Wild-caught salmon served with seasonal vegetables and lemon herb sauce",
      price: "$24.99",
      image: "/images/salmon.jpg"
    },
    {
      id: "main-3",
      name: "Truffle Risotto",
      description: "Creamy Arborio rice with wild mushrooms, truffle oil, and parmesan",
      price: "$18.99",
      image: "/images/risotto.jpg"
    },
    {
      id: "main-4",
      name: "Filet Mignon",
      description: "8oz grass-fed beef tenderloin with red wine reduction and herb butter",
      price: "$29.99",
      image: "/images/steak.jpg"
    },
  ],
  desserts: [
    {
      id: "dessert-1",
      name: "Tiramisu",
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone",
      price: "$8.99",
      image: "/images/tiramisu.jpg"
    },
    {
      id: "dessert-2",
      name: "Chocolate Lava Cake",
      description: "Rich chocolate cake with a molten center, served with vanilla ice cream",
      price: "$9.99",
      image: "/images/lava-cake.jpg"
    },
    {
      id: "dessert-3",
      name: "Crème Brûlée",
      description: "Creamy vanilla custard with a caramelized sugar crust",
      price: "$8.99",
      image: "/images/creme-brulee.jpg"
    },
  ],
  drinks: [
    {
      id: "drink-1",
      name: "Signature Cocktails",
      description: "Seasonal craft cocktails made with premium spirits and fresh ingredients",
      price: "$12.99",
      image: "/images/cocktail.jpg"
    },
    {
      id: "drink-2",
      name: "Wine Selection",
      description: "Curated selection of fine wines from around the world",
      price: "$9.99 (glass)",
      image: "/images/wine.jpg"
    },
    {
      id: "drink-3",
      name: "Craft Beer",
      description: "Local and imported craft beers on tap and bottled",
      price: "$7.99",
      image: "/images/beer.jpg"
    },
  ]
};

const MenuCard = ({ item, addToOrder }) => {
  return (
    <Card className="bg-stone-100 rounded-md border-none shadow-none hover:bg-stone-200 transition-colors">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <h3 className="text-lg font-medium text-stone-800">{item.name}</h3>
            <p className="text-sm text-stone-600 mt-1">{item.description}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="font-medium text-stone-800">{item.price}</span>
              <Button 
                onClick={() => addToOrder(item)} 
                className="bg-stone-800 hover:bg-stone-900 rounded-md text-white text-sm py-1"
              >
                Add to Order
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Menu = ({ addToOrder }) => {
  return (
    <div>
      <h2 className="text-3xl font-serif text-stone-800 mb-6 text-center">Our Menu</h2>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="starters" className="border-b border-stone-300">
          <AccordionTrigger className="text-xl font-serif py-4 text-stone-800 hover:text-stone-600">
            Starters
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="grid grid-cols-1 gap-4">
              {menuItems.starters.map(item => (
                <MenuCard key={item.id} item={item} addToOrder={addToOrder} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="main-course" className="border-b border-stone-300">
          <AccordionTrigger className="text-xl font-serif py-4 text-stone-800 hover:text-stone-600">
            Main Course
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="grid grid-cols-1 gap-4">
              {menuItems.mainCourse.map(item => (
                <MenuCard key={item.id} item={item} addToOrder={addToOrder} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="desserts" className="border-b border-stone-300">
          <AccordionTrigger className="text-xl font-serif py-4 text-stone-800 hover:text-stone-600">
            Desserts
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="grid grid-cols-1 gap-4">
              {menuItems.desserts.map(item => (
                <MenuCard key={item.id} item={item} addToOrder={addToOrder} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="drinks" className="border-b border-stone-300">
          <AccordionTrigger className="text-xl font-serif py-4 text-stone-800 hover:text-stone-600">
            Drinks
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="grid grid-cols-1 gap-4">
              {menuItems.drinks.map(item => (
                <MenuCard key={item.id} item={item} addToOrder={addToOrder} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Menu;
