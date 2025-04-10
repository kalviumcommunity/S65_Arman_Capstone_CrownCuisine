import { Badge } from "@/components/ui/badge";
import type { BookingStatus } from "./types";

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  let badgeColor = "bg-stone-100 text-stone-600";
  let textColor = "text-stone-600";

  if (status === "Confirmed") {
    badgeColor = "bg-green-100 text-green-700";
    textColor = "text-green-700";
  } else if (status === "Pending") {
    badgeColor = "bg-yellow-100 text-yellow-700";
    textColor = "text-yellow-700";
  } else if (status === "Cancelled") {
    badgeColor = "bg-red-100 text-red-700";
    textColor = "text-red-700";
  } else if (status === "Completed") {
    badgeColor = "bg-stone-100 text-stone-600";
    textColor = "text-stone-600";
  }

  return (
    <Badge className={`capitalize ${badgeColor} ${textColor} border-none`}>
      {status}
    </Badge>
  );
}
