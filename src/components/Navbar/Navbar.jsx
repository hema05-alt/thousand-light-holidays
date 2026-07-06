"use client";

import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import Button from "../common/Button/Button";
import logo from "../../assets/images/logo.webp";

const Navbar = ({ openBookingForm }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoTextRef = useRef(null);

  // Typing effect
  useEffect(() => {
    const el = logoTextRef.current;
    if (!el) return;

    const fullText = "Thousand Light Holidays";
    let i = 0;
    let deleting = false;
    let timer;

    const type = () => {
      if (!deleting) {
        el.textContent = fullText.slice(0, i);
        i++;

        if (i > fullText.length) {
          deleting = true;
          timer = setTimeout(type, 2000);
          return;
        }
      } else {
        el.textContent = fullText.slice(0, i);
        i--;

        if (i < 0) {
          deleting = false;
          i = 0;
          timer = setTimeout(type, 500);
          return;
        }
      }

      timer = setTimeout(type, deleting ? 45 : 85);
    };

    type();

    return () => clearTimeout(timer);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }

    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar" ref={navRef}>
      <div className="container-fluid px-4">

        {/* Logo + Brand Name */}
        <a
          className="navbar-brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
        >
          <img
            src={logo.src}
            alt="Thousand Light Holidays"
            className="navbar-logo"
          />
          <span
            className="navbar-logo-text"
            ref={logoTextRef}
          ></span>
        </a>

        {/* Hamburger Toggle */}
        <button
          className={`navbar-toggler custom-toggler${
            menuOpen ? " is-open" : ""
          }`}
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="toggler-bar bar1"></span>
          <span className="toggler-bar bar2"></span>
          <span className="toggler-bar bar3"></span>
        </button>

        {/* Navigation Menu */}
        <div
          className={`custom-collapse${menuOpen ? " show" : ""}`}
          id="navbarMenu"
        >
          <ul className="navbar-nav ms-auto nav-links">
            {[
              { label: "Home", id: "home" },
              { label: "About Us", id: "about" },
              { label: "Packages", id: "packages" },
              { label: "Services", id: "services" },
              { label: "Testimonials", id: "testimonials" },
              { label: "Contact", id: "contact" },
            ].map(({ label, id }) => (
              <li className="nav-item" key={id}>
                <span
                  className="nav-link"
                  onClick={() => scrollToSection(id)}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <div className="nav-btn">
            <Button
              title="Enquire Now"
              type="primary"
              className="navbar-btn"
              onClick={() => {
                openBookingForm();
                setMenuOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;