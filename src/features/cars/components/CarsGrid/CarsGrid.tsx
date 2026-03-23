import { motion, AnimatePresence } from "framer-motion";
import type { Car } from "../../data/cars";
import CarCard from "../CarCard/CarCard";

type Props = {
  cars: Car[];
};

function CarsGrid({ cars }: Props) {
  if (!cars.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-500 py-24 text-lg"
      >
        No cars found
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="grid
  grid-cols-1
  md:grid-cols-2
  xl:grid-cols-3
  gap-12
  justify-items-center
  "
    >
      <AnimatePresence>
        {cars.map((car) => (
          <motion.div
            key={car.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default CarsGrid;
