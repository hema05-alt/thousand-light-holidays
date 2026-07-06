import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata = {
  title: "Thousand Light Holidays",
  description:
    "Thousand Light Holidays - Your trusted travel partner for family tours, honeymoon packages, group trips, and customized holiday experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}