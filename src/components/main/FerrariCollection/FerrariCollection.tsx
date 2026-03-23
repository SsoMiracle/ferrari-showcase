import { useState } from "react";
import CarsFilters from "../../../features/cars/components/CarsFilters/CarsFilters";
import CarsGrid from "../../../features/cars/components/CarsGrid/CarsGrid";
import { cars } from "../../../features/cars/data/cars";
import type { Car } from "../../../features/cars/data/cars";


type Filters = {
  model: string;
  year: string;
  mileage: string;
};

function FerrariCollection() {
  const [draftFilters, setDraftFilters] = useState<Filters>({
    model: "ALL",
    year: "ALL",
    mileage: "ALL",
  });

  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    model: "ALL",
    year: "ALL",
    mileage: "ALL",
  });

  const handleSearch = () => {
    setAppliedFilters(draftFilters);
  };

  // 🔥 dynamic filters
  const modelOptions = [
    { label: "MODEL", value: "ALL" },
    ...Array.from(new Set(cars.map((car) => car.model))).map((model) => ({
      label: model,
      value: model,
    })),
  ];

  const yearOptions = [
    { label: "FROM YEAR", value: "ALL" },
    ...Array.from(new Set(cars.map((car) => car.year)))
      .sort((a, b) => b - a)
      .map((year) => ({
        label: String(year),
        value: String(year),
      })),
  ];

  // 🔥        filtration 
  const filteredCars: Car[] = cars.filter((car) => {
    if (appliedFilters.model !== "ALL" && car.model !== appliedFilters.model) {
      return false;
    }

    if (
      appliedFilters.year !== "ALL" &&
      car.year < Number(appliedFilters.year)
    ) {
      return false;
    }

    if (appliedFilters.mileage !== "ALL") {
      const [min, max] = appliedFilters.mileage.split("-").map(Number);

      if (car.mileage < min || car.mileage > max) {
        return false;
      }
    }

    return true;
  });

  return (
    <section className="w-full px-[80px] py-24">
      <CarsFilters
        draftFilters={draftFilters}
        setDraftFilters={setDraftFilters}
        onSearch={handleSearch}
        modelOptions={modelOptions}
        yearOptions={yearOptions}
      />

      <CarsGrid cars={filteredCars} />
    </section>
  );
}

export default FerrariCollection;
