import { useState, useEffect, useRef } from "react";

import slide1 from "../../assets/hero/hero-slide-1.avif";
import slide2 from "../../assets/hero/hero-slide-2.avif";

const slides = [slide1, slide2];

interface Props {
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}

function HeroSlider({ currentSlide, setCurrentSlide }: Props) {
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [transition, setTransition] = useState(true);

  // ---------- AUTOPLAY ----------

  const startAutoplay = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }

    autoplayRef.current = setTimeout(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 5000);
  };

  useEffect(() => {
    startAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, [currentSlide]);

  // ---------- DRAG ----------

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);

    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const diff = e.clientX - startX;
    setDeltaX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    if (deltaX < -80) {
      setCurrentSlide((prev) => prev + 1);
    }

    if (deltaX > 80) {
      setCurrentSlide((prev) => prev - 1);
    }

    setIsDragging(false);
    setDeltaX(0);

    startAutoplay();
  };

  // ---------- INFINITE LOOP ----------

  useEffect(() => {
    if (currentSlide === slides.length + 1) {
      setTimeout(() => {
        setTransition(false);
        setCurrentSlide(1);
      }, 700);
    }

    if (currentSlide === 0) {
      setTimeout(() => {
        setTransition(false);
        setCurrentSlide(slides.length);
      }, 700);
    }

    setTransition(true);
  }, [currentSlide]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className={`flex h-full ${
          transition && !isDragging
            ? "transition-transform duration-700 ease-in-out"
            : ""
        }`}
        style={{
          transform: `translateX(calc(-${currentSlide * 100}% + ${deltaX}px))`,
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={slide}
              draggable={false}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
