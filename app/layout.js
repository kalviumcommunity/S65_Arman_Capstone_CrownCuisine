// app/layout.js (or .jsx)
import { Instrument_Sans, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  // It's good practice to specify all weights you intend to use if the font supports it,
  // or if it's a variable font, this setup is fine.
  // For non-variable fonts, you might load multiple weights like:
  // weight: ["400", "700"],
  weight: "400", // Assuming you only need regular for now
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  // Geist Mono is a variable font, so just defining the variable is usually enough.
  // You can still specify a default weight if needed, but often not necessary for variable fonts.
});

export const metadata = {
  title: "Crown Cuisine - Restaurant Operations Suite",
  description: "Restaurant operations suite for reservations and orders. Guests book tables and order meals; managers oversee inventory, menus, seating, and staff seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className={`${instrumentSans.variable} ${instrumentSerif.variable} ${geistMono.variable} font-sans antialiased bg-stone-300`}
      >
        {children}
      </body>
    </html>
  );
}
