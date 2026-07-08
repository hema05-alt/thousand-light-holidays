"use client";

import { useEffect, useRef, useState } from "react";
import "./Testimonials.css";
import reviewsData from "../../data/reviews.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import testimonialsBg from "../../assets/images/testimonials-bg.webp";

import VanillaTilt from "vanilla-tilt";

import { supabase } from "../../supabase";

const routeNames = [
  "Chennai → Ooty",
  "Madurai → Kodaikanal",
  "Coimbatore → Munnar",
  "Salem → Yercaud",
  "Erode → Valparai",
  "Trichy → Wayanad",
];

/* Give static JSON reviews a stable unique prefix so they
   never clash with Supabase uuid-based ids               */
const staticReviews = reviewsData.map((r, i) => ({
  ...r,
  id: r.id ?? `static-${i}`,
}));

const Testimonials = () => {
  const [userReviews, setUserReviews]       = useState([]);
  const [allReviews, setAllReviews]         = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentRoute, setCurrentRoute]     = useState(0);
  const [submitted, setSubmitted]           = useState(false);
  const [submitting, setSubmitting]         = useState(false);
  const [newReviewId, setNewReviewId]       = useState(null);
  const [hoverStar, setHoverStar]           = useState(0);

  const swiperRef   = useRef(null);
  const cardsRef    = useRef([]);
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const routeRef    = useRef(null);
  const roadRef     = useRef(null);

  const [formData, setFormData] = useState({
    name: "", location: "", trip: "", review: "", rating: 5,
  });

  /* ── Fetch user reviews from Supabase ── */
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch error message:", error.message);
        console.error("Supabase fetch error details:", error.details);
        console.error("Supabase fetch error hint:", error.hint);
        console.error("Supabase fetch error code:", error.code);
        return;
      }

      const fetched = data.map((item) => ({
        ...item,
        id: `supabase-${item.id}`,
        date: new Date(item.created_at).toLocaleDateString("en-IN"),
      }));
      setUserReviews(fetched);
    };
    fetchReviews();
  }, []);

  /* ── Merge reviews ── */
  useEffect(() => {
    setAllReviews([...userReviews, ...staticReviews]);
  }, [userReviews]);

  /* ── VanillaTilt ── */
  useEffect(() => {
    const validRefs = cardsRef.current.filter(Boolean);
    if (validRefs.length > 0) {
      VanillaTilt.init(validRefs, {
        max: 18, speed: 500, glare: true,
        "max-glare": 0.35, scale: 1.04,
        perspective: 1400, gyroscope: true,
      });
    }
    return () => {
      validRefs.forEach((el) => {
        if (el && el.vanillaTilt) el.vanillaTilt.destroy();
      });
    };
  }, [allReviews]);

  /* ── Route Animation ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoute((prev) =>
        prev === routeNames.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* ── IntersectionObserver: header + route board + road ── */
  useEffect(() => {
    const blocks = [
      {
        el: headerRef.current,
        hidden: { opacity: "0", transform: "translateY(-24px)" },
        shown:  { opacity: "1", transform: "translateY(0)",
                  transition: "opacity 0.7s ease, transform 0.7s ease" },
      },
      {
        el: routeRef.current,
        hidden: { opacity: "0", transform: "scale(0.9)" },
        shown:  { opacity: "1", transform: "scale(1)",
                  transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" },
      },
      {
        el: roadRef.current,
        hidden: { opacity: "0" },
        shown:  { opacity: "1", transition: "opacity 0.5s ease 0.2s" },
      },
    ];

    blocks.forEach(({ el, hidden }) => {
      if (el) Object.assign(el.style, hidden);
    });

    const observers = blocks.map(({ el, hidden, shown }) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            Object.assign(el.style, shown);
          } else {
            el.style.transition = "none";
            Object.assign(el.style, hidden);
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  /* ── IntersectionObserver: review cards ── */
  useEffect(() => {
    if (!allReviews.length) return;
    const observers = [];

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      card.style.opacity   = "0";
      card.style.transform = "translateY(36px)";

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            card.style.transition = `opacity 0.55s ease ${i * 0.08}s,
                                     transform 0.55s ease ${i * 0.08}s`;
            card.style.opacity   = "1";
            card.style.transform = "translateY(0)";
          } else {
            card.style.transition = "none";
            card.style.opacity    = "0";
            card.style.transform  = "translateY(36px)";
          }
        },
        { threshold: 0.12 }
      );

      obs.observe(card);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [allReviews]);

  /* ── Form handlers ── */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { data, error } = await supabase
      .from("reviews")
      .insert([{
        name:     formData.name,
        location: formData.location,
        trip:     formData.trip,
        review:   formData.review,
        rating:   Number(formData.rating),
      }])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error message:", error.message);
      console.error("Supabase insert error details:", error.details);
      console.error("Supabase insert error hint:", error.hint);
      console.error("Supabase insert error code:", error.code);
      alert(`Something went wrong: ${error.message || "Please try again."}`);
      setSubmitting(false);
      return;
    }

    const newReview = {
      ...data,
      id: `supabase-${data.id}`,
      date: new Date(data.created_at).toLocaleDateString("en-IN"),
    };

    setUserReviews((prev) => [newReview, ...prev]);
    setNewReviewId(`supabase-${data.id}`);
    setFormData({ name: "", location: "", trip: "", review: "", rating: 5 });
    setSubmitted(true);
    setSubmitting(false);

    setTimeout(() => {
      if (swiperRef.current) swiperRef.current.slideTo(0);
    }, 100);

    setTimeout(() => {
      setSubmitted(false);
      setNewReviewId(null);
    }, 3500);
  };

  return (
    <section className="testimonials-section" id="testimonials" ref={sectionRef}>

      {/* Heading */}
      <div className="testimonial-header" ref={headerRef}>
        <span className="sub-title">THOUSAND LIGHT HOLIDAYS - REVIEWS</span>
        <h2>
          <span className="pin-icon pin-before">📍</span>Journey Stories From
          <span> Happy Travellers</span>
          <span className="pin-icon pin-after">📍</span>
        </h2>
        <p>Real memories shared by our customers across South India.</p>
      </div>

      {/* Route Board */}
      <div className="route-board" ref={routeRef}>
        <div className="route-label">CURRENT TOUR ROUTE</div>
        <div className="route-name">{routeNames[currentRoute]}</div>
      </div>

      {/* Road + Bus */}
      <div className="road-area" ref={roadRef}>
        <div className="road"></div>
        <div className="bus-wrapper">
          <div className="bus">
            <div className="bus-top">
              <div className="window"></div>
              <div className="window"></div>
              <div className="window"></div>
              <div className="window"></div>
            </div>
            <div className="bus-bottom"></div>
            <div className="wheel wheel-left"></div>
            <div className="wheel wheel-right"></div>
          </div>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="testimonials-two-col">

        {/* LEFT — Share Journey Form */}
        <div className="share-journey-panel">
          <div className="form-title">
            <h3>Share Your Journey</h3>
            <p>Tell us about your experience with Thousand Light Holidays.</p>
          </div>

          <form className="review-form" onSubmit={handleSubmit}>
            <input
              type="text" name="name" placeholder="Your Name"
              value={formData.name} onChange={handleChange} required
            />
            <input
              type="text" name="location" placeholder="Your City"
              value={formData.location} onChange={handleChange} required
            />
            <input
              type="text" name="trip" placeholder="Tour Package"
              value={formData.trip} onChange={handleChange} required
            />

            <div className="star-rating-inline">
              <span className="star-rating-label">Your Rating</span>
              <div className="stars-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={`star-${star}`}
                    type="button"
                    className={`star-btn${star <= (hoverStar || formData.rating) ? " active" : ""}`}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    onMouseEnter={() => setHoverStar(star)}
                    onMouseLeave={() => setHoverStar(0)}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  >★</button>
                ))}
              </div>
            </div>

            <textarea
              rows="5" name="review" placeholder="Share your experience..."
              value={formData.review} onChange={handleChange} required
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Review"}
            </button>

            {submitted && (
              <div className="submit-success" role="status">
                <span className="success-check">✓</span>
                Your review has been added! Thank you.
              </div>
            )}
          </form>
        </div>

        {/* RIGHT — Reviews Carousel */}
        <div className="reviews-carousel-wrapper">
          <div className="section-row">
            <h3>What Our Travellers Say</h3>
            <div className="custom-nav">
              <button className="review-prev">←</button>
              <button className="review-next">→</button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            loop={allReviews.length > 1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation={{ prevEl: ".review-prev", nextEl: ".review-next" }}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            breakpoints={{
              320: { slidesPerView: 1 },
              600: { slidesPerView: 1 },
              900: { slidesPerView: 2 },
            }}
          >
            {allReviews.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`review-window-card${
                    item.id === newReviewId ? " new-review-highlight" : ""
                  }`}
                >
                  <div className="window-glow"></div>

                  <div className="review-top">
                    <div className="avatar">{item.name.charAt(0)}</div>
                    <div>
                      <h4>{item.name}</h4>
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="rating">
                    {"★".repeat(Number(item.rating))}
                    {"☆".repeat(5 - Number(item.rating))}
                  </div>

                  <h5>{item.trip}</h5>

                  <p className="review-preview">{item.review}</p>

                  <button
                    className="read-more-btn"
                    onClick={() => setSelectedReview(item)}
                  >
                    Read More →
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="testimonial-bg-image">
            <img src={testimonialsBg.src} alt="Munnar College Trip" />
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedReview && (
        <div
          className="review-modal-overlay"
          onClick={() => setSelectedReview(null)}
        >
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedReview(null)}>✕</button>

            <div className="modal-header">
              <div className="modal-avatar">{selectedReview.name.charAt(0)}</div>
              <div>
                <h3>{selectedReview.name}</h3>
                <span>{selectedReview.location}</span>
              </div>
            </div>

            <div className="modal-rating">
              {"★".repeat(Number(selectedReview.rating))}
              {"☆".repeat(5 - Number(selectedReview.rating))}
            </div>

            <h4 className="modal-trip">{selectedReview.trip}</h4>
            <p className="modal-review">{selectedReview.review}</p>
            {selectedReview.date && (
              <div className="modal-date">{selectedReview.date}</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;