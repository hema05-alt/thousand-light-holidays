"use client";

import { useState } from "react";
import "./Bookingform.css";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaTimes,
  FaClipboardList,
  FaBus,
} from "react-icons/fa";

const BookingForm = ({ closeForm }) => {
  const travelPhone = "917358856007";

  const [formData, setFormData] = useState({
    destination: "",
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    people: "",
    pickup: "",
    requirements: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone — only digits allowed, block letters at input level
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData({ ...formData, phone: digitsOnly });

      if (digitsOnly.length > 0 && digitsOnly.length < 10) {
        setErrors((prev) => ({ ...prev, phone: "Please enter a valid 10-digit phone number." }));
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
      return;
    }

    // Email — validate format on change
    if (name === "email") {
      setFormData({ ...formData, email: value });
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.length > 0 && !emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      errors.phone === "" &&
      errors.email === "" &&
      formData.phone.length >= 10 &&
      emailRegex.test(formData.email)
    );
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    // Final validation before submit
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError = false;

    if (formData.phone.length < 10) {
      setErrors((prev) => ({ ...prev, phone: "Please enter a valid 10-digit phone number." }));
      hasError = true;
    }
    if (!emailRegex.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
      hasError = true;
    }
    if (hasError) return;

    const message = `
*New Tour Booking Request*

📍 Destination: ${formData.destination}
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email}
📅 Travel Date: ${formData.travelDate}
👥 No. Of People: ${formData.people}
🚏 Pickup Location: ${formData.pickup}

📝 Special Requirements:
${formData.requirements}
`;

    const whatsappURL = `https://wa.me/${travelPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:+${travelPhone}`;
  };

  return (
    <div className="booking-overlay">
      <div className="booking-modal">

        {/* HEADER */}
        <div className="booking-header">

          <div className="header-left">
            {/* Title + Badge on same line */}
            <h2>
              <FaClipboardList className="title-icon" />
              Book Your Tour
              <span className="package-badge">
                <FaBus />
                Any Package
              </span>
            </h2>

            <p>Fill your details - we'll contact you within 30 mins!</p>
          </div>

          <div className="header-right">
            <button className="close-btn" onClick={closeForm}>
              <FaTimes />
            </button>
          </div>

        </div>

        {/* BODY */}
        <div className="booking-body">

          <div className="info-box">
            ✅ After submitting, WhatsApp opens with your booking details automatically.
          </div>

          <form onSubmit={handleWhatsAppSubmit}>

            {/* ROW 1 */}
            <div className="form-row">

              <div className="form-group">
                <label>CHOOSE DESTINATION *</label>
                <input
                  list="destinations"
                  name="destination"
                  placeholder="Type or select destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />
                <datalist id="destinations">
                  <option value="Goa" />
                  <option value="Kerala" />
                  <option value="Karnataka" />
                  <option value="Varkala" />
                  <option value="Ooty" />
                </datalist>
              </div>

              <div className="form-group">
                <label>FULL NAME *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>PHONE NUMBER *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 73588 56007"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  inputMode="numeric"
                  required
                  className={errors.phone ? "input-error" : ""}
                />
                {errors.phone && (
                  <span className="error-msg">{errors.phone}</span>
                )}
              </div>

            </div>

            {/* ROW 2 */}
            <div className="form-row">

              <div className="form-group">
                <label>EMAIL ADDRESS *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && (
                  <span className="error-msg">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label>TRAVEL DATE *</label>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>NO. OF PEOPLE *</label>
                <input
                  type="number"
                  name="people"
                  placeholder="e.g. 5"
                  value={formData.people}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* PICKUP */}
            <div className="form-group">
              <label>PICKUP LOCATION</label>
              <input
                type="text"
                name="pickup"
                placeholder="e.g. Tirunelveli Bus Stand"
                value={formData.pickup}
                onChange={handleChange}
              />
            </div>

            {/* REQUIREMENTS */}
            <div className="form-group">
              <label>SPECIAL REQUIREMENTS</label>
              <textarea
                rows="3"
                name="requirements"
                placeholder="Dietary needs, room preferences..."
                value={formData.requirements}
                onChange={handleChange}
              />
            </div>

            {/* BUTTONS */}
            <div className="button-group">
              <button type="button" className="call-btn" onClick={handleCall}>
                <FaPhoneAlt />
                Call Us Now
              </button>
              <button type="submit" className="whatsapp-btn">
                <FaWhatsapp />
                Send Via WhatsApp
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default BookingForm;