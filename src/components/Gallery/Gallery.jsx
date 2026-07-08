"use client";

import { useRef, useEffect } from "react";
import "./Gallery.css";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import gallery1 from "../../assets/images/gallery1.jpg";
import gallery2 from "../../assets/images/gallery2.jpg";
import gallery3 from "../../assets/images/gallery3.jpeg";
import gallery4 from "../../assets/images/gallery4.jpeg";
import gallery6 from "../../assets/images/gallery6.jpeg";
import gallery7 from "../../assets/images/gallery7.jpeg";
import gallery8 from "../../assets/images/gallery8.jpeg";
import gallery9 from "../../assets/images/gallery9.jpeg";

const images = [
    { src: gallery2.src, alt: "Gallery 2" },
    { src: gallery3.src, alt: "Gallery 3" },
    { src: gallery4.src, alt: "Gallery 4" },
    { src: gallery6.src, alt: "Gallery 6" },
    { src: gallery7.src, alt: "Gallery 7" },
    { src: gallery8.src, alt: "Gallery 8" },
    { src: gallery9.src, alt: "Gallery 9" },
    { src: gallery1.src, alt: "Gallery 1" },
];

function Gallery() {
    const galleryRef = useRef(null);

    const scrollLeft = () => {
        if (!galleryRef.current) return;
        galleryRef.current.scrollBy({ left: -320, behavior: "smooth" });
    };

    const scrollRight = () => {
        if (!galleryRef.current) return;
        galleryRef.current.scrollBy({ left: 320, behavior: "smooth" });
    };

    useEffect(() => {
        const gallery = galleryRef.current;
        if (!gallery) return;

        const interval = setInterval(() => {
            const maxScroll = gallery.scrollWidth - gallery.clientWidth;
            if (gallery.scrollLeft >= maxScroll - 5) {
                gallery.scrollTo({ left: 0, behavior: "auto" });
            } else {
                gallery.scrollBy({ left: 320, behavior: "smooth" });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="gallery-section" id="gallery">

            <div className="gallery-header">
                <h6 className="underline">Our Gallery</h6>
                <h1>Explore Our Memorable Moments</h1>
            </div>

            <div className="gallery-container">

                <button className="button-gallery" onClick={scrollLeft}>
                    <FaChevronLeft />
                </button>

                <div className="gallery-item" ref={galleryRef}>

                    {/* Original set — key: orig-0 to orig-7 */}
                    {images.map((img, i) => (
                        <img
                            key={`orig-${i}`}
                            src={img.src}
                            alt={img.alt}
                            className="gallery-image"
                        />
                    ))}

                    {/* Duplicate set for infinite loop — key: dup-0 to dup-7 */}
                    {images.map((img, i) => (
                        <img
                            key={`dup-${i}`}
                            src={img.src}
                            alt={img.alt}
                            className="gallery-image"
                        />
                    ))}

                </div>

                <button className="button-gallery" onClick={scrollRight}>
                    <FaChevronRight />
                </button>

            </div>

        </section>
    );
}

export default Gallery;