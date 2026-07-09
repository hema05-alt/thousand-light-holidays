"use client";

import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import Button from "../common/Button/Button";
import logo from "../../assets/images/logo.webp";

const Navbar = ({ openBookingForm }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Separate refs for two typing lines
  const logoTextRef = useRef(null);
  const taglineRef = useRef(null);

  // Typing Animation
  useEffect(() => {
    const titleEl = logoTextRef.current;
    const tagEl = taglineRef.current;

    if (!titleEl || !tagEl) return;

    const title = "Thousand Light Holidays";
    const tagline = "Travels & Tourism";

    let titleIndex = 0;
    let tagIndex = 0;
    let phase = "typingTitle";
    let timer;

    const animate = () => {
      switch (phase) {
        case "typingTitle":
          titleEl.textContent = title.slice(0, titleIndex);
          titleIndex++;

          if (titleIndex > title.length) {
            phase = "typingTag";
            timer = setTimeout(animate, 300);
            return;
          }
          break;

        case "typingTag":
          tagEl.textContent = tagline.slice(0, tagIndex);
          tagIndex++;

          if (tagIndex > tagline.length) {
            phase = "pause";
            timer = setTimeout(animate, 2000);
            return;
          }
          break;

        case "pause":
          phase = "deletingTag";
          animate();
          return;

        case "deletingTag":
          tagEl.textContent = tagline.slice(0, tagIndex);
          tagIndex--;

          if (tagIndex < 0) {
            phase = "deletingTitle";
            timer = setTimeout(animate, 100);
            return;
          }
          break;

        case "deletingTitle":
          titleEl.textContent = title.slice(0, titleIndex);
          titleIndex--;

          if (titleIndex < 0) {
            titleIndex = 0;
            tagIndex = 0;
            phase = "typingTitle";
            timer = setTimeout(animate, 500);
            return;
          }
          break;

        default:
          break;
      }

      timer = setTimeout(
        animate,
        phase === "deletingTitle" || phase === "deletingTag"
          ? 35
          : 80
      );
    };

    animate();

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

        {/* Logo + Brand */}
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

          <div className="navbar-brand-text">
            <span
              className="navbar-logo-text"
              ref={logoTextRef}
            ></span>

            <span
              className="navbar-tagline"
              ref={taglineRef}
            ></span>
          </div>
        </a>

        {/* Hamburger */}
        <button
          className={`navbar-toggler custom-toggler ${
            menuOpen ? "is-open" : ""
          }`}
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="toggler-bar bar1"></span>
          <span className="toggler-bar bar2"></span>
          <span className="toggler-bar bar3"></span>
        </button>

        {/* Menu */}
        <div
          className={`custom-collapse ${
            menuOpen ? "show" : ""
          }`}
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