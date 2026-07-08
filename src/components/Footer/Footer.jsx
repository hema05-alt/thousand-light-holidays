"use client";

import "./Footer.css";
import logo from "../../assets/images/logo.webp";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      {/* MAIN GRID */}
      <div className="footer-grid">
        {/* Company Info */}
        <div className="footer-section">
          <div className="logo-box">
            <img src={logo.src} alt="TLH Logo" className="logo" />

            <div className="company-info">
              <h2>
                <span className="name-line1">Thousand Light</span>
                <span className="name-line2">Holidays</span>
              </h2>

              <p>Travel • Explore • Experience</p>
            </div>
          </div>

          <p className="description">
            Your trusted travel partner for exploring the beautiful
            destinations of South India. We craft journeys that create
            lifelong memories.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("home");
                }}
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("about");
                }}
              >
                About Us
              </a>
            </li>

            <li>
              <a
                href="#packages"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("packages");
                }}
              >
                Tour Packages
              </a>
            </li>

            <li>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("services");
                }}
              >
                Services
              </a>
            </li>

            <li>
              <a
                href="#gallery"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("gallery");
                }}
              >
                Gallery
              </a>
            </li>

            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("contact");
                }}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Our Services</h3>

          <ul>
            <li>Domestic Tours</li>
            <li>Honeymoon Packages</li>
            <li>Family Vacations</li>
            <li>Group Tours</li>
            <li>Corporate Tours</li>
            <li>College / IV Trips</li>
            <li>Adventure Trips</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Info</h3>

          <ul className="contact-info">
            <li>
              <FaPhoneAlt />
              <span>+91 73588 56007</span>
            </li>

            <li>
              <FaEnvelope />
              <span>thousandlightholidays@gmail.com</span>
            </li>

            <li>
              <FaMapMarkerAlt />
              <span>Tirunelveli, Tamil Nadu, India</span>
            </li>

            <li>
              <FaInstagram />
              <a
                href="https://www.instagram.com/thousand_light_holidays"
                target="_blank"
                rel="noopener noreferrer"
                className="insta-link"
              >
                @thousand_light_holidays
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="footer-divider" />

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          © {currentYear}{" "}
          <span>Thousand Light Holidays</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}