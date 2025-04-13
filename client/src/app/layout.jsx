import "./globals.css";
import { Atkinson_Hyperlegible } from "next/font/google";

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-atkinson",
});

export const metadata = {
  title: "Crown Cuisine",
  description:
    "Crown Cuisine streamlines restaurant operations with inventory tracking, reservations, scheduling, digital menus, and payments.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={atkinson.variable}>
      <body
        className="bg-stone-200"
        style={{ fontFamily: "var(--font-atkinson), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}