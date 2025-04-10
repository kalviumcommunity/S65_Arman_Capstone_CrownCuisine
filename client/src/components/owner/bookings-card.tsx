import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  CalendarCheck,
  ExternalLink,
  Calendar,
  Clock,
  Users,
} from "lucide-react";
import type { Booking, BookingStatus } from "./types";
import { BookingStatusBadge } from "./bookings-status-badge";

interface BookingsCardProps {
  bookings: Booking[];
  maxPreviewCount: number;
  onToggleStatus: (bookingId: string, newStatus: BookingStatus) => void;
}

export function BookingsCard({
  bookings,
  maxPreviewCount,
  onToggleStatus,
}: BookingsCardProps) {
  const formatDate = (dateInput: string | Date): string => {
    try {
      const date =
        typeof dateInput === "string"
          ? new Date(dateInput + "T00:00:00")
          : dateInput;
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      console.error("Invalid date format:", dateInput);
      return "Invalid Date";
    }
  };

  return (
    <Card className="h-full flex flex-col border border-stone-300 bg-stone-300 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium text-black">
            Upcoming Bookings
          </CardTitle>
          <CardDescription className="text-stone-600">
            Next {maxPreviewCount} pending/confirmed reservations.
          </CardDescription>
        </div>
        <CalendarCheck className="h-5 w-5 text-stone-500" />
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <div className="space-y-3 p-6 pt-2 h-full">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <Card
                key={booking.id}
                className="shadow-sm transition-all hover:shadow-mdborder border-stone-100 bg-stone-100 overflow-hidden"
              >
                <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-x-4 gap-y-3">
                  <div className="flex-grow space-y-1.5 min-w-0">
                    <p
                      className="font-semibold text-base text-black truncate"
                      title={booking.customerName}
                    >
                      {booking.customerName}
                    </p>
                    <div className="flex items-center gap-x-3 gap-y-1 flex-wrap text-sm text-stone-600">
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(booking.date)}
                      </span>
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Clock className="h-3.5 w-3.5" />
                        {booking.time}
                      </span>
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Users className="h-3.5 w-3.5" />
                        {booking.partySize} Guests
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 pt-1 sm:pt-0 self-start sm:self-center">
                    <BookingStatusBadge status={booking.status} />
                    <Switch
                      id={`status-toggle-${booking.id}`}
                      checked={booking.status === "Confirmed"}
                      onCheckedChange={(isChecked) =>
                        onToggleStatus(
                          booking.id,
                          isChecked ? "Confirmed" : "Pending"
                        )
                      }
                      aria-label={`Toggle booking status for ${booking.customerName}`}
                      disabled={
                        booking.status !== "Pending" &&
                        booking.status !== "Confirmed"
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-center text-stone-500 px-6">
                No upcoming bookings found.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
