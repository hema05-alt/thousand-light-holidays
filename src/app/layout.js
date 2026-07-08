import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import WhatsAppButton from "../components/WhatsAppButton/WhatsAppButton";
import { Poppins, Playfair_Display } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Thousand Light Holidays",
  description:
    "Thousand Light Holidays - Your trusted travel partner for family tours, honeymoon packages, group trips, and customized holiday experiences.",
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable}`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}