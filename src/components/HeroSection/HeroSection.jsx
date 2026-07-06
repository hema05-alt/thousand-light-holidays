"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "./HeroSection.css";
import Button from "../common/Button/Button";

// React Icons
import { FaBus, FaUsers, FaHeadset, FaWallet } from "react-icons/fa";

// Images — hero-image1.webp removed
import hero2 from "../../assets/images/hero-image2.webp";
import hero3 from "../../assets/images/hero-image3.webp";
import hero4 from "../../assets/images/hero-image4.webp";

const heroImages = [hero2.src, hero3.src, hero4.src];

const stats = [
  { icon: <FaBus />,     value: "200+",       label: "Customized Tours" },
  { icon: <FaUsers />,   value: "100%",       label: "Family Friendly"  },
  { icon: <FaHeadset />, value: "24/7",       label: "Support"          },
  { icon: <FaWallet />,  value: "Affordable", label: "Packages"         },
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [prevImage,    setPrevImage]    = useState(null);
  const [loaded,       setLoaded]       = useState(false);
  const intervalRef = useRef(null);

  /* ── Preload all 3 images ── */
  useEffect(() => {
    let count = 0;
    heroImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        count++;
        if (count === heroImages.length) setLoaded(true);
      };
    });
  }, []);

  /* ── Auto-advance slider ── */
  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => {
        const next = prev === heroImages.length - 1 ? 0 : prev + 1;
        setPrevImage(prev);
        setTimeout(() => setPrevImage(null), 1200);
        return next;
      });
    }, 4500);
  }, []);

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  /* ── Manual dot navigation ── */
  const goTo = useCallback(
    (index) => {
      if (index === currentImage) return;
      setPrevImage(currentImage);
      setCurrentImage(index);
      setTimeout(() => setPrevImage(null), 1200);
      startInterval();
    },
    [currentImage, startInterval]
  );

  /* ── Handlers ── */
  const handleViewPackages = () =>
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });

  const handleContactUs = () =>
    window.open(
      "https://wa.me/917358856007?text=Hi%20Thousand%20Light%20Holidays,%20I%20would%20like%20to%20know%20more%20about%20your%20travel%20packages.",
      "_blank"
    );

  return (
    <section
      className={`hero-section${loaded ? " hero-loaded" : ""}`}
      id="home"
    >
      {/* ── Background crossfade layers ── */}
      <div className="hero-bg-container">
        {heroImages.map((src, i) => (
          <div
            key={i}
            className={`hero-bg-layer${i === currentImage ? " active" : ""}${
              i === prevImage ? " prev" : ""
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      {/* ── Overlays ── */}
      <div className="overlay" />
      <div className="vignette" />

      {/* ── Floating particles ── */}
      <div className="particles" aria-hidden="true">
        {[...Array(7)].map((_, i) => (
          <span key={i} className={`particle p${i + 1}`} />
        ))}
      </div>

      {/* ── Hero content ── */}
      <div className="hero-content">
        <div className="hero-inner">

          <p className="hero-tagline">
            <span className="tagline-line" />
            Let's Explore The World With
            <span className="tagline-line" />
          </p>

          <h1 className="company-name">Thousand Light Holidays</h1>

          <p className="hero-description">
            Your trusted travel partner for family tours, honeymoon packages,
            group trips, and customized holiday experiences. Discover affordable
            travel packages, comfortable journeys, and unforgettable memories
            with us.
          </p>

          {/* Buttons */}
          <div className="hero-buttons">
            <Button title="View Packages" type="primary"    onClick={handleViewPackages} />
            <Button title="Contact Us"   type="secondary"  onClick={handleContactUs}    />
          </div>

          {/* Slide dots — auto-renders 3 dots for 3 images */}
          <div className="slide-dots" role="tablist" aria-label="Image navigation">
            {heroImages.map((_, i) => (
              <button
                key={i}
                className={`dot${i === currentImage ? " active" : ""}`}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === currentImage}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="hero-stats" role="list">
            {stats.map((stat, i) => (
              <div className="stat-item" key={i} role="listitem">
                <div className="stat-icon-wrap" aria-hidden="true">
                  {stat.icon}
                </div>
                <div className="stat-text">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};

export default HeroSection;