import "./globals.css";
import { funnelSans } from "./fonts";

export const metadata = {
  title: "Crown Cuisine - Restaurant Operations Suite",
  description:
    "Restaurant operations suite for reservations and orders. Guests " +
    "book tables and order meals; managers oversee inventory, menus, " +
    "seating, and staff seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={[funnelSans.className, "antialiased", "bg-stone-300"].join(
          " ",
        )}
      >
        {children}
      </body>
    </html>
  );
}
