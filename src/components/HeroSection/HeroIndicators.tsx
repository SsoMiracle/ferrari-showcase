interface Props {
  currentSlide: number;
}

function HeroIndicators({ currentSlide }: Props) {
  const activeIndex = currentSlide % 2;

  return (
    <div className="flex gap-1">
      <div
        className={`w-[50px] h-[2px] transition-colors duration-300 ${
          activeIndex === 0 ? "bg-black" : "bg-gray-300"
        }`}
      />

      <div
        className={`w-[50px] h-[2px] transition-colors duration-300 ${
          activeIndex === 1 ? "bg-black" : "bg-gray-300"
        }`}
      />
    </div>
  );
}

export default HeroIndicators;
