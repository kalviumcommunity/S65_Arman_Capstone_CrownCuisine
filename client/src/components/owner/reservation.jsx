"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Edit, Bolt, ExternalLink } from "lucide-react";

const stone300 = "#d6d3d1";

const Reservation = ({ tableReservations }) => (
  <div
    className="rounded-md bg-stone-300 p-4 shadow-none h-[600px] flex flex-col"
    style={{ position: "relative" }}
  >
    <div
      className="space-y-4 flex-grow overflow-y-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {tableReservations.map((reservation) => (
        <Card
          key={reservation.id}
          className="overflow-hidden border-none shadow-none bg-stone-100 p-4 rounded-md"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-stone-900">
                {reservation.customerName}
              </h3>
              <p className="text-sm text-stone-600">
                {reservation.date} · {reservation.time} · {reservation.guests}{" "}
                guests
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Table: {reservation.tableNumber}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  reservation.status === "approved"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-amber-100 text-amber-800 border border-amber-200"
                }`}
              >
                {reservation.status === "approved" ? "Confirmed" : "Pending"}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-stone-200 flex justify-end">
            {reservation.status === "pending" && (
              <>
                <Button
                  size="sm"
                  className="h-8 bg-green-600 hover:bg-green-700 text-white mr-2"
                >
                  Approve <CheckCircle className="ml-1 h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-red-600 border-red-600 hover:bg-red-50"
                >
                  Decline <XCircle className="ml-1 h-4 w-4" />
                </Button>
              </>
            )}
            {reservation.status === "approved" && (
              <Button size="sm" variant="outline" className="h-8">
                Modify <Edit className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>

    <div
      style={{
        position: "absolute",
        bottom: "76px",
        left: 0,
        right: 0,
        height: "80px",
        background: `linear-gradient(to bottom, transparent, ${stone300})`,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />

    <div className="mt-5 pt-4 border-stone-400 flex justify-end gap-3">
      <Button className="bg-stone-100 hover:bg-stone-300 text-stone-900 cursor-pointer">
        Manage Tables <Bolt className="ml-1 h-4 w-4" />
      </Button>
      <Button className="bg-stone-100 hover:bg-stone-300 text-stone-900 cursor-pointer"
      >
        View All Reservations <ExternalLink className="ml-1 h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default Reservation;