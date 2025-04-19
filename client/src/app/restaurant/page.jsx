"use client";

import React, { useState } from "react";
import Image from "next/image";
import Information from "@/components/restaurant/information";
import Menu from "@/components/restaurant/menu";
import Reservation from "@/components/restaurant/reservation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";

const RestaurantPage = () => {
  const [order, setOrder] = useState([]);
  const [activeTab, setActiveTab] = useState("menu");
  
  const addToOrder = (item) => {
    const existingItemIndex = order.findIndex(orderItem => orderItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      const newOrder = [...order];
      newOrder[existingItemIndex].quantity = (newOrder[existingItemIndex].quantity || 1) + 1;
      setOrder(newOrder);
    } else {
      setOrder([...order, { ...item, quantity: 1 }]);
    }
  };

  const removeFromOrder = (index) => {
    const newOrder = [...order];
    newOrder.splice(index, 1);
    setOrder(newOrder);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const newOrder = [...order];
    newOrder[index].quantity = newQuantity;
    setOrder(newOrder);
  };

  const calculateTotal = () => {
    return order.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return order.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-stone-800">
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent opacity-60 z-10" />
        <div className="absolute inset-0 bg-[url('/images/donations.jpg')] bg-cover bg-center opacity-50" />
        <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-end pb-12">
          <h1 className="text-6xl font-serif text-white mb-2">Bistro Moderna</h1>
          <p className="text-xl text-stone-200 font-serif">Fine dining with a modern twist</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <Card className="border-none shadow-md rounded-lg bg-white overflow-hidden mb-8">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-stone-200 border-b border-stone-300">
              <div className="container py-2">
                <TabsList className="bg-transparent h-12">
                  <TabsTrigger 
                    value="info" 
                    className="data-[state=active]:bg-stone-100 data-[state=active]:shadow-none rounded-md h-10 px-6"
                  >
                    Information
                  </TabsTrigger>
                  <TabsTrigger 
                    value="menu" 
                    className="data-[state=active]:bg-stone-100 data-[state=active]:shadow-none rounded-md h-10 px-6"
                  >
                    Menu
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reservation" 
                    className="data-[state=active]:bg-stone-100 data-[state=active]:shadow-none rounded-md h-10 px-6"
                  >
                    Reservations
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <div className="p-6">
              <TabsContent value="info" className="mt-0">
                <Information />
              </TabsContent>
              
              <TabsContent value="menu" className="mt-0">
                <Menu addToOrder={addToOrder} />
              </TabsContent>
              
              <TabsContent value="reservation" className="mt-0">
                <Reservation />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>

      {/* Order Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              className="bg-stone-800 hover:bg-stone-900 rounded-full text-white h-16 px-8 shadow-lg flex items-center gap-3"
              size="lg"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">Order</span>
                {order.length > 0 && (
                  <Badge className="bg-amber-500 text-white border-none ml-1">
                    {getTotalItems()}
                  </Badge>
                )}
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-stone-100 border-none w-full max-w-md sm:max-w-md">
            <div className="flex flex-col h-full">
              <h2 className="text-3xl font-serif mb-6 text-stone-800">Your Order</h2>
              
              <ScrollArea className="flex-grow pr-4">
                {order.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-stone-500">
                    <div className="text-5xl mb-4">🍽️</div>
                    <p className="text-center">Your order is empty</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setActiveTab("menu");
                        document.querySelector('[data-value="menu"]').click();
                      }}
                      className="mt-2 text-stone-800"
                    >
                      Browse the menu
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {order.map((item, index) => (
                      <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                        <div className="flex justify-between items-start">
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <p className="font-medium text-stone-900">{item.name}</p>
                              <p className="text-stone-800 font-medium">
                                ${(parseFloat(item.price.replace('$', '')) * (item.quantity || 1)).toFixed(2)}
                              </p>
                            </div>
                            <p className="text-sm text-stone-600 mt-1 line-clamp-1">{item.description}</p>
                            
                            <div className="flex justify-between items-center mt-3">
                              <div className="flex items-center border border-stone-200 rounded-md">
                                <Button 
                                  type="button"
                                  variant="ghost" 
                                  className="h-7 w-7 p-0 text-stone-500 hover:text-stone-800"
                                  onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center">{item.quantity || 1}</span>
                                <Button 
                                  type="button"
                                  variant="ghost" 
                                  className="h-7 w-7 p-0 text-stone-500 hover:text-stone-800"
                                  onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                                >
                                  +
                                </Button>
                              </div>
                              <Button 
                                variant="ghost" 
                                className="h-7 p-0 text-stone-500 hover:text-red-600 hover:bg-transparent"
                                onClick={() => removeFromOrder(index)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              
              <div className="border-t border-stone-300 mt-6 pt-6">
                <div className="flex justify-between text-lg font-medium mb-2">
                  <span>Subtotal</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-sm text-stone-600 mb-6">
                  <span>Tax & Service Fee</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <Button 
                  className="w-full bg-stone-800 hover:bg-stone-900 rounded-md h-12 text-base"
                  disabled={order.length === 0}
                >
                  Proceed to Checkout
                </Button>
                
                {order.length > 0 && (
                  <Button 
                    variant="outline"
                    className="w-full mt-2 border-stone-300 text-stone-600 rounded-md h-12 text-base"
                    onClick={() => setOrder([])}
                  >
                    Clear Order
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default RestaurantPage;
