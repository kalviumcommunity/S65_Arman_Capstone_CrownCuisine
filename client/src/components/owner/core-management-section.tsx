import { SectionHeader } from "./section-header";
import { BookingsCard } from "./bookings-card";
import { MenuManagementCard } from "./menu-management-card";
import type { Booking, MenuItem, BookingStatus } from "./types";

interface CoreManagementSectionProps {
  bookings: Booking[];
  menuItems: MenuItem[];
  onToggleBookingStatus: (bookingId: string, newStatus: BookingStatus) => void;
  onAddMenuItem: () => void;
  onEditMenuItem: (itemId: string) => void;
  onDeleteMenuItem: (itemId: string, itemName: string) => void;
}

export function CoreManagementSection({
  bookings,
  menuItems,
  onToggleBookingStatus,
  onAddMenuItem,
  onEditMenuItem,
  onDeleteMenuItem,
}: CoreManagementSectionProps) {
  const MAX_PREVIEW_BOOKINGS = 4;
  const MAX_PREVIEW_MENU_ITEMS = 4;

  const upcomingBookingsPreview = bookings
    .filter((b) => b.status === "Pending" || b.status === "Confirmed")
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime()
    )
    .slice(0, MAX_PREVIEW_BOOKINGS);

  const menuItemsPreview = menuItems.slice(0, MAX_PREVIEW_MENU_ITEMS);

  return (
    <>
      <SectionHeader
        title="Core Management"
        description="Manage your primary operations: Bookings and Menu."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 items-stretch">
        <BookingsCard
          bookings={upcomingBookingsPreview}
          maxPreviewCount={MAX_PREVIEW_BOOKINGS}
          onToggleStatus={onToggleBookingStatus}
        />

        <MenuManagementCard
          menuItems={menuItemsPreview}
          onAddMenuItem={onAddMenuItem}
          onEditMenuItem={onEditMenuItem}
          onDeleteMenuItem={onDeleteMenuItem}
        />
      </div>
    </>
  );
}
