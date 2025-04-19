import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Information = () => {
  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-serif text-stone-800">Bistro Moderna</h1>
        <p className="text-xl text-stone-600 mt-2 font-serif">Fine dining with a modern twist</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-stone-200 rounded-md border-none shadow-none">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-serif text-stone-800 mb-2">Hours</h3>
              <div className="space-y-1 text-stone-600">
                <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
                <p>Saturday: 10:00 AM - 11:00 PM</p>
                <p>Sunday: 10:00 AM - 9:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-200 rounded-md border-none shadow-none">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-serif text-stone-800 mb-2">Location</h3>
              <div className="space-y-1 text-stone-600">
                <p>123 Culinary Avenue</p>
                <p>Gourmet District</p>
                <p>Foodville, FV 98765</p>
                <p className="mt-2">(555) 123-4567</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-200 rounded-md border-none shadow-none">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-serif text-stone-800 mb-2">About Us</h3>
              <p className="text-stone-600">
                Established in 2010, Bistro Moderna blends classic techniques with contemporary flavors. 
                Our chefs craft seasonal menus using locally-sourced ingredients to create unforgettable 
                dining experiences.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Information;
