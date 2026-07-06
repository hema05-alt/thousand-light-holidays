"use client";

import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/HeroSection/HeroSection";
import About from "../components/About/About";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBookingForm = () => setIsBookingOpen(true);
  const closeBookingForm = () => setIsBookingOpen(false);

  return (
    <>
      <Navbar openBookingForm={openBookingForm} />
      <HeroSection />
      <About />

      <section id="packages"></section>
      <section id="services"></section>
      <section id="testimonials"></section>
      <section id="contact"></section>

      {isBookingOpen && (
        <div>{/* BookingForm/modal component goes here */}</div>
      )}
    </>
  );
}