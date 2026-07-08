"use client";

import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/HeroSection/HeroSection";
import About from "../components/About/About";
import Packages from "../components/Packages/Packages";
import Gallery from "../components/Gallery/Gallery";
import Services from "../components/Services/Services";
import Testimonials from "../components/Testimonials/Testimonials";
import Footer from "../components/Footer/Footer";
import BookingForm from "../components/Bookingform/Bookingform";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBookingForm = () => setIsBookingOpen(true);
  const closeBookingForm = () => setIsBookingOpen(false);

  return (
    <main suppressHydrationWarning>
      <Navbar openBookingForm={openBookingForm} />
      <HeroSection />
      <About />
      <Packages />
      <Services />
      <Testimonials />
      <Gallery />
      <Footer />

      {isBookingOpen && (
        <BookingForm closeForm={closeBookingForm} />
      )}
    </main>
  );
}