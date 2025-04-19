import "./globals.css";
import { Funnel_Sans } from "next/font/google";

export const metadata = {
  title: "Crown Cuisine",
  description: "Your app description goes here.",
};

const funnelSans = Funnel_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-funnel-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={funnelSans.variable}>
      <body
        className="bg-stone-200"
        style={{ fontFamily: "var(--font-funnel-sans), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
