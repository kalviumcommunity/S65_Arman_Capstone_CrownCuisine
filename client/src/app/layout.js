import "./globals.css";

export const metadata = {
  title: "Crown Cuisine",
  description:
    "Crown Cuisine streamlines restaurant operations with inventory tracking, reservations, scheduling, digital menus, and payments.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-stone-200">{children}</body>
    </html>
  );
}