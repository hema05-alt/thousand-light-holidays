"use client";

import { useState, useEffect, useRef } from "react";
import "./Packages.css";

import package1 from "../../assets/images/vagamon.jpg";
import package2 from "../../assets/images/munnar.jpg";
import package3 from "../../assets/images/ooty.jpg";
import package4 from "../../assets/images/karnataka.jpg";

import {
  FaWhatsapp, FaSuitcaseRolling,
  FaMountain, FaTree, FaTrain, FaLeaf,
  FaWater, FaLandmark, FaMonument
} from "react-icons/fa";

import BookingForm from "../Bookingform/Bookingform";

function Packages() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const cardRefs = useRef([]);

  const packages = [
    {
      id: "vagamon",
      title: "VAGAMON",
      subtitle: "Explore Adventure & Nature",
      image: package1.src,
      places: [
        { id: "pine-forest",    icon: <FaMountain />, text: "Pine Forest" },
        { id: "meadows",        icon: <FaTree />,     text: "Vagamon Meadows" },
        { id: "adventure-park", icon: <FaMountain />, text: "Adventure Park" },
      ],
    },
    {
      id: "ooty",
      title: "OOTY",
      subtitle: "Queen of Hill Stations",
      image: package3.src,
      places: [
        { id: "toy-train",    icon: <FaTrain />,    text: "Toy Train" },
        { id: "botanical",    icon: <FaLeaf />,     text: "Botanical Garden" },
        { id: "doddabetta",   icon: <FaMountain />, text: "Doddabetta Peak" },
      ],
    },
    {
      id: "munnar",
      title: "MUNNAR",
      subtitle: "Tea Gardens & Waterfalls",
      image: package2.src,
      places: [
        { id: "tea-gardens",  icon: <FaLeaf />,     text: "Tea Gardens" },
        { id: "attukad",      icon: <FaWater />,    text: "Attukad Falls" },
        { id: "top-station",  icon: <FaMountain />, text: "Top Station" },
      ],
    },
    {
      id: "karnataka",
      title: "KARNATAKA",
      subtitle: "History & Heritage",
      image: package4.src,
      places: [
        { id: "mysore",       icon: <FaLandmark />, text: "Mysore Palace" },
        { id: "hampi",        icon: <FaMonument />, text: "Hampi" },
        { id: "gol-gumbaz",   icon: <FaLandmark />, text: "Gol Gumbaz" },
      ],
    },
  ];

  useEffect(() => {
    const observers = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
      card.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(40px)";
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section className="packages-section" id="packages">

      <div className="packages-header">
        <h6 className="pack-underline">Our Tour Packages</h6>
        <h1>
          Popular Tour <span>Packages</span>
          <FaSuitcaseRolling className="package-logo" />
        </h1>
        <p>Handpicked holiday packages for unforgettable experiences.</p>
      </div>

      <div className="packages-container">
        {packages.map((item, index) => (
          <div
            key={item.id}
            className="package-card"
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="package-image"
            />

            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>

            <div className="package-list-item">
              {item.places.map((place) => (
                <p key={`${item.id}-${place.id}`}>
                  {place.icon}
                  {place.text}
                </p>
              ))}
            </div>

            <div className="package-footer">
              <button
                className="enquire-now"
                onClick={() => setShowBookingForm(true)}
              >
                <FaWhatsapp className="whatsapp" />
                Enquire Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {showBookingForm && (
        <BookingForm closeForm={() => setShowBookingForm(false)} />
      )}

    </section>
  );
}

export default Packages;