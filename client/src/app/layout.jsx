import "./globals.css";
import { Atkinson_Hyperlegible } from "next/font/google";

// Define metadata for your application or page
export const metadata = {
  title: "Crown Cuisine",
  description: "Your app description goes here.",
};

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-atkinson",
});

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
