import { useState } from "react";
import HeroSlider from "./HeroSlider";
import HeroIndicators from "./HeroIndicators";
import HeroButton from "./HeroButton";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="w-full aspect-[16/7] min-h-[560px]">
        <HeroSlider
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      </div>

      <div className="absolute bottom-12 left-12">
        <HeroButton
          href="https://store.ferrari.com/en-de/gp-china"
          className="border border-black"
          target="_blank"
        >
          EXCLUSIVE CHINESE GP
        </HeroButton>
      </div>

      <div className="absolute bottom-10 right-12">
        <HeroIndicators currentSlide={currentSlide} />
      </div>
    </section>
  );
}

export default HeroSection;
