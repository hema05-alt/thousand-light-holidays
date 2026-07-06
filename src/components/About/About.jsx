"use client";

import { useEffect, useRef } from "react";
import "./About.css";
import picture3 from "../../assets/images/picture3.png";
import picture1 from "../../assets/images/picture1.png";
import picture2 from "../../assets/images/picture2.png";
import {
    FaMapMarkedAlt,
    FaUserTie,
    FaBus,
    FaPhoneAlt,
    FaHotel,
    FaEye,
    FaBullseye,
} from "react-icons/fa";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {

    const sectionRef   = useRef(null);
    const imageRef     = useRef(null);
    const headingRef   = useRef(null);
    const para1Ref     = useRef(null);
    const para2Ref     = useRef(null);
    const card1Ref     = useRef(null);
    const card2Ref     = useRef(null);
    const bottomRef    = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            const trigger = {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play reverse play reverse",
            };

            /* Image — zoom in from left */
            gsap.fromTo(imageRef.current,
                { opacity: 0, x: -60, scale: 0.92 },
                {
                    opacity: 1, x: 0, scale: 1,
                    duration: 1, ease: "power3.out",
                    scrollTrigger: { ...trigger, start: "top 78%" },
                }
            );

            /* Heading — fade up + skew */
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 40, skewY: 3 },
                {
                    opacity: 1, y: 0, skewY: 0,
                    duration: 0.9, ease: "power3.out",
                    scrollTrigger: { ...trigger, start: "top 76%" },
                }
            );

            /* Para 1 */
            gsap.fromTo(para1Ref.current,
                { opacity: 0, y: 24 },
                {
                    opacity: 1, y: 0,
                    duration: 0.75, delay: 0.1, ease: "power2.out",
                    scrollTrigger: { ...trigger, start: "top 74%" },
                }
            );

            /* Para 2 */
            gsap.fromTo(para2Ref.current,
                { opacity: 0, y: 24 },
                {
                    opacity: 1, y: 0,
                    duration: 0.75, delay: 0.2, ease: "power2.out",
                    scrollTrigger: { ...trigger, start: "top 72%" },
                }
            );

            /* Vision card */
            gsap.fromTo(card1Ref.current,
                { opacity: 0, y: 36, scale: 0.93 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.65, delay: 0.25, ease: "back.out(1.4)",
                    scrollTrigger: { ...trigger, start: "top 72%" },
                }
            );

            /* Mission card */
            gsap.fromTo(card2Ref.current,
                { opacity: 0, y: 36, scale: 0.93 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.65, delay: 0.4, ease: "back.out(1.4)",
                    scrollTrigger: { ...trigger, start: "top 72%" },
                }
            );

            /* Bottom bar — slide up */
            gsap.fromTo(bottomRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 0.9, ease: "power3.out",
                    scrollTrigger: {
                        trigger: bottomRef.current,
                        start: "top 88%",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about-section" id="about" ref={sectionRef}>
            <div className="about-container">

                {/* Top content */}
                <div className="about-top">

                    {/* Left — images */}
                    <div className="about-image about-image-gsap" ref={imageRef}>
                        <img src={picture3.src} alt="About Us" className="picture picture1" />
                        <img src={picture1.src} alt="About Us" className="picture picture2" />
                        <img src={picture2.src} alt="About Us" className="picture picture3" />
                    </div>

                    {/* Right — content */}
                    <div className="about-content">

                        <h1 className="heading about-heading-gsap" ref={headingRef}>
                            About Us
                        </h1>

                        <p className="about-para1-gsap" ref={para1Ref}>
                            Thousand Light Holidays is a passionate travel company dedicated
                            to creating memorable journeys across South India. We believe
                            every trip should be comfortable, safe, and full of beautiful
                            memories.
                        </p>

                        <p className="about-para2-gsap" ref={para2Ref}>
                            From family vacations to honeymoon getaways, group tours to
                            corporate outings - we handle every detail with care and
                            professionalism.
                        </p>

                        {/* Vision & Mission */}
                        <div className="vision">
                            <div className="info-card about-card1-gsap" ref={card1Ref}>
                                <div className="icon1">
                                    <span><FaEye /></span>
                                </div>
                                <div>
                                    <h3>Our Vision</h3>
                                    <p>
                                        To become the most trusted travel partner
                                        for exploring the beauty of South India.
                                    </p>
                                </div>
                            </div>

                            <div className="info-card1 about-card2-gsap" ref={card2Ref}>
                                <div className="icon2">
                                    <span><FaBullseye /></span>
                                </div>
                                <div>
                                    <h3>Our Mission</h3>
                                    <p>
                                        To deliver safe, affordable, and joyful
                                        travel experiences for every customer.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom feature bar */}
            <div className="about-bottom about-bottom-gsap" ref={bottomRef}>
                <div className="features">

                    <div className="feature-item">
                        <span><FaMapMarkedAlt /></span>
                        <p>Personalized Tour Planning</p>
                    </div>

                    <div className="feature-item">
                        <span><FaUserTie /></span>
                        <p>Experienced Tour Guides</p>
                    </div>

                    <div className="feature-item">
                        <span><FaBus /></span>
                        <p>Comfortable Transportation</p>
                    </div>

                    <div className="feature-item">
                        <span><FaPhoneAlt /></span>
                        <p>24/7 Customer Support</p>
                    </div>

                    <div className="feature-item">
                        <span><FaHotel /></span>
                        <p>Trusted Hotel Arrangements</p>
                    </div>

                </div>
            </div>

        </section>
    );
}

export default About;