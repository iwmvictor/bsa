import React, { useRef, useState, useEffect } from "react";
import "./../styles/corousel.scss";

const Carousel = ({ images }) => {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);

  // Update active slide when scrolling
  const handleScroll = () => {
    const el = containerRef.current;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setCurrent(index);
  };

  // Move by one slide
  const goTo = (index) => {
    const el = containerRef.current;
    el.scrollTo({
      left: index * el.clientWidth,
      behavior: "smooth",
    });
  };

  // Drag controls
  useEffect(() => {
    const el = containerRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const mousedown = (e) => {
      isDown = true;
      startX = e.pageX || e.touches?.[0].pageX;
      scrollLeft = el.scrollLeft;
    };

    const mousemove = (e) => {
      if (!isDown) return;
      const x = e.pageX || e.touches?.[0].pageX;
      const walk = x - startX;
      el.scrollLeft = scrollLeft - walk;
    };

    const mouseup = () => (isDown = false);

    el.addEventListener("mousedown", mousedown);
    el.addEventListener("mousemove", mousemove);
    el.addEventListener("mouseup", mouseup);
    el.addEventListener("mouseleave", mouseup);
    el.addEventListener("touchstart", mousedown);
    el.addEventListener("touchmove", mousemove);
    el.addEventListener("touchend", mouseup);

    return () => {
      el.removeEventListener("mousedown", mousedown);
      el.removeEventListener("mousemove", mousemove);
      el.removeEventListener("mouseup", mouseup);
      el.removeEventListener("mouseleave", mouseup);
      el.removeEventListener("touchstart", mousedown);
      el.removeEventListener("touchmove", mousemove);
      el.removeEventListener("touchend", mouseup);
    };
  }, []);

  return (
    <div className="carousel-wrapper">
      {/* Navigation arrows */}
      <button
        className="nav left"
        onClick={() => goTo(current - 1)}
        disabled={current === 0}
      >
        ❮
      </button>

      <div className="carousel" ref={containerRef} onScroll={handleScroll}>
        {images.map((src, idx) => (
          <div className="slide" key={idx}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>

      <button
        className="nav right"
        onClick={() => goTo(current + 1)}
        disabled={current === images.length - 1}
      >
        ❯
      </button>

      {/* Slide indicators */}
      <div className="dots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${idx === current ? "active" : ""}`}
            onClick={() => goTo(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
