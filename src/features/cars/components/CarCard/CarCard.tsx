import type { Car } from "../../data/cars";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/redux";
import { addToCart } from "../../../cart/cartSlice";

interface Props {
  car: Car;
}

function CarCard({ car }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dispatch = useAppDispatch();
  const dragging = useRef(false);
  const dragStart = useRef<number | null>(null);
  const dragOffsetRef = useRef(0);
  const isHovered = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cooldownRef = useRef(false); // 🔥 ключевой фикс

  // ================= AUTOPLAY =================

  const startSlider = () => {
    if (intervalRef.current || cooldownRef.current) return;

    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % car.images.length);
    }, 3000);
  };

  const stopSlider = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopSlider();

    cooldownRef.current = true;

    setTimeout(() => {
      cooldownRef.current = false;

      // 🔥 ВАЖНО — проверяем hover
      if (isHovered.current) {
        startSlider();
      }
    }, 2000);
  };

  // ================= DRAG =================

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    dragging.current = true;
    dragStart.current = e.clientX;

    stopSlider(); // 🔥 стопаем autoplay сразу
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    startSlider();
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    stopSlider();
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!dragging.current || dragStart.current === null) return;

      const diff = e.clientX - dragStart.current;

      dragOffsetRef.current = diff;
      setDragOffset(diff);
    };

    const handleUp = () => {
      if (!dragging.current || dragStart.current === null) return;

      const diff = dragOffsetRef.current;
      const threshold = 80;

      if (diff > threshold) {
        setCurrentImage((prev) =>
          prev === 0 ? car.images.length - 1 : prev - 1,
        );
      } else if (diff < -threshold) {
        setCurrentImage((prev) => (prev + 1) % car.images.length);
      }

      // 🔥 возврат
      setDragOffset(0);

      dragging.current = false;
      dragStart.current = null;
      dragOffsetRef.current = 0;

      resetTimer(); // 🔥 теперь работает правильно
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [car.images.length]);

  // ================= INDICATORS =================

  const handleIndicatorClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrentImage(index);
    setDragOffset(0);

    resetTimer();
  };

  // ================= UI =================

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group block border border-gray-200 bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="flex flex-col h-full">
        {/* IMAGE */}
        <div
          className="relative overflow-hidden aspect-[16/10] max-h-[420px] cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onDragStart={(e) => e.preventDefault()}
        >
          <div
            className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(calc(-${currentImage * 100}% + ${dragOffset}px))`,
            }}
          >
            {car.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={car.name}
                draggable={false}
                className="w-full h-full object-cover flex-shrink-0 select-none"
              />
            ))}
          </div>

          {/* DOTS */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {car.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => handleIndicatorClick(e, index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentImage === index ? "bg-white scale-110" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
        {/* CONTENT */}{" "}
        <div className="p-8 flex flex-col gap-4">
          {" "}
          <div className="flex gap-6 text-sm text-gray-500 tracking-wide">
            {" "}
            <span>{car.year}</span>{" "}
            <span>{car.mileage.toLocaleString()} KM</span>{" "}
          </div>{" "}
          <h3 className="text-xl font-semibold tracking-wide">{car.name}</h3>{" "}
          <div className="text-2xl font-semibold">
            {" "}
            €{car.price.toLocaleString()}{" "}
          </div>{" "}
          <div className="text-sm text-gray-500 mt-2">
            {" "}
            <p>Color: {car.color}</p> <p>Interior: {car.interior}</p>{" "}
          </div>
          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={(e) => {
                e.preventDefault();

                dispatch(addToCart(car.id));

                setAdded(true);

                setTimeout(() => {
                  setAdded(false);
                }, 1200);
              }}
              className="
  relative
  px-5 py-2
  text-sm tracking-wider
  border border-black
  text-white
  bg-black
  overflow-hidden
  group/button
  cursor-pointer
  transition-transform duration-150 active:scale-95
"
            >
              <span className="relative z-10">ADD TO CART</span>

              <span
                className="
    absolute inset-0
    bg-red-600
    scale-x-0
    origin-left
    transition-transform duration-300
    group-hover/button:scale-x-100
    "
              />
            </button>

            <Link
              to={`/cars/${car.id}`}
              className="px-5 py-2 text-sm tracking-wider border border-gray-300 transition-all duration-300 hover:border-black hover:text-black"
            >
              MORE DETAILS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
