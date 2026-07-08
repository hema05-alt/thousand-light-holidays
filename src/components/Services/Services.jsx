"use client";

import { useEffect, useRef } from "react";
import serviceImage from "../../assets/images/travel-service-image.webp";
import VanillaTilt from "vanilla-tilt";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import {
  FaBus,
  FaUsers,
  FaGift,
  FaCheckCircle,
} from "react-icons/fa";

import "./Services.css";

const miniCards = [
  {
    id: "tour-packages",
    icon: <FaBus />,
    title: "Tour Packages",
    desc: <>Domestic Tours &<br />Customized Planning</>,
  },
  {
    id: "special-trips",
    icon: <FaUsers />,
    title: "Special Trips",
    desc: <>Honeymoon, Family<br />& Group Tours</>,
  },
  {
    id: "seasonal-offers",
    icon: <FaGift />,
    title: "Seasonal Offers",
    desc: <>Festival Packages &<br />Weekend Getaways</>,
  },
];

const travelGridItems = [
  { id: "pickup-drop",      label: "Pickup & Drop" },
  { id: "hotel-stay",       label: "Hotel Stay" },
  { id: "food",             label: "Food Arrangements" },
  { id: "sightseeing",      label: "Sightseeing" },
  { id: "activities",       label: "Activities & Games" },
  { id: "tour-guides",      label: "Tour Guides" },
  { id: "transportation",   label: "Transportation" },
  { id: "trip-scheduling",  label: "Trip Scheduling" },
];

const Services = () => {
  const statsRef      = useRef(null);
  const countedRef    = useRef(false);
  const cardsRef      = useRef([]);
  const sectionRef    = useRef(null);
  const leftRef       = useRef(null);
  const rightRef      = useRef(null);
  const headingRef    = useRef(null);
  const tagRef        = useRef(null);
  const descRef       = useRef(null);
  const imageRef      = useRef(null);
  const gridItemsRef  = useRef([]);

  /* ---- Blob parallax ---- */
  useEffect(() => {
    gsap.to(".blob-mid", {
      y: 100,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  /* ---- ScrollTrigger entrance animations ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(tagRef.current,
        { opacity: 0, y: 20, letterSpacing: "1px" },
        {
          opacity: 1, y: 0, letterSpacing: "3px",
          duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40, skewY: 3 },
        {
          opacity: 1, y: 0, skewY: 0,
          duration: 0.9, delay: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(descRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.75, delay: 0.2, ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 76%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(imageRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)", opacity: 1,
          duration: 1, delay: 0.3, ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 36, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, stagger: 0.15, delay: 0.4, ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0,
          duration: 1, delay: 0.2, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(gridItemsRef.current,
        { opacity: 0, x: -18 },
        {
          opacity: 1, x: 0,
          duration: 0.45, stagger: 0.08, delay: 0.5, ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ---- VanillaTilt ---- */
  useEffect(() => {
    const validCards = cardsRef.current.filter(Boolean);
    if (validCards.length) {
      VanillaTilt.init(validCards, {
        max: 12,
        speed: 400,
        glare: true,
        "max-glare": 0.25,
        scale: 1.03,
      });
    }
  }, []);

  /* ---- Counter animation ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) countedRef.current = false;
          if (entry.isIntersecting && !countedRef.current) {
            countedRef.current = true;
            animateCounter("stat-tours", 0, 200, "+", 1400);
            animateCounter("stat-years", 0, 2,   "+", 900);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const animateCounter = (id, from, to, suffix, duration) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("counter-pop");
    void el.offsetWidth;
    el.classList.add("counter-pop");
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.floor(from + (to - from) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = to + suffix;
    };
    requestAnimationFrame(update);
  };

  return (
    <section ref={sectionRef} className="services" id="services">

      <div className="blob-mid" aria-hidden="true" />

      <div className="services-wrapper">

        {/* ===== LEFT ===== */}
        <div className="services-left" ref={leftRef}>

          <span className="service-tag" ref={tagRef}>OUR SERVICES</span>

          <h2 ref={headingRef}>
            Crafting Meaningful
            <span> Travel Experiences</span>
          </h2>

          <p className="service-description" ref={descRef}>
            From customized tour packages to complete travel arrangements,
            we create smooth, comfortable and memorable journeys tailored
            to every traveler.
          </p>

          <div className="service-image" ref={imageRef}>
            <img
              src={serviceImage.src}
              alt="South India Tour Packages by Thousand Light Holidays"
              loading="lazy"
            />
          </div>

          <div className="service-cards">
            {miniCards.map((card, i) => (
              <div
                key={card.id}
                className="mini-card"
                ref={(el) => (cardsRef.current[i] = el)}
              >
                <div className="mini-icon">{card.icon}</div>
                <div className="mini-card-text">
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== RIGHT ===== */}
        <div className="travel-card" ref={rightRef}>
          <div>
            <span className="travel-label">COMPLETE A-Z ARRANGEMENTS</span>

            <h3>
              End-to-End
              <br />
              <span className="shimmer-text">Travel Assistance</span>
            </h3>

            <div className="travel-grid">
              {travelGridItems.map((item, i) => (
                <p
                  key={item.id}
                  ref={(el) => (gridItemsRef.current[i] = el)}
                >
                  <FaCheckCircle className="check-icon" />
                  {item.label}
                </p>
              ))}
            </div>
          </div>

          <div className="travel-stats" ref={statsRef}>
            <div className="stat-card">
              <div className="stat-item">
                <h4 id="stat-years">2+</h4>
                <span>Years Service</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <h4 id="stat-tours">0</h4>
                <span>Tours</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <h4>24/7</h4>
                <span>Support</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;