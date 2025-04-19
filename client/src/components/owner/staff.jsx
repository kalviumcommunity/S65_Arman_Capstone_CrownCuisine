"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Staff = () => (
  <div className="rounded-md bg-stone-300 p-4 shadow-none h-[400px] flex flex-col">
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="staff" className="border-none">
        <AccordionTrigger className="py-3 text-base font-medium">
          Staff Management
        </AccordionTrigger>
        <AccordionContent className="overflow-hidden">
          <div className="h-[300px] flex items-center justify-center">
            <Card className="p-4 bg-stone-100 border-none shadow-md text-center w-full">
              <Users className="mx-auto mb-3 h-8 w-8 text-blue-500" />
              <h3 className="text-lg font-medium text-stone-900 mb-2">Staff Management</h3>
              <p className="text-stone-600 mb-3 text-sm">
                Coming soon! Manage your team, schedule shifts, and track performance.
              </p>
              <Button className="bg-stone-100 hover:bg-stone-300 text-stone-900 cursor-pointer mt-2" disabled size="sm">
                Manage Staff <ExternalLink className="ml-1 h-4 w-4" />
              </Button>
            </Card>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export default Staff;
