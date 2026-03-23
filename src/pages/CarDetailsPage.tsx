import { useParams } from "react-router-dom";
import { cars } from "../features/cars/data/cars";
import { useAppDispatch } from "../hooks/redux";
import { addToCart } from "../features/cart/cartSlice";

function CarDetailsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const car = cars.find((car) => car.id === Number(id));

  if (!car) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        Car not found
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pt-20 -mb-12">
      {/* 🔥 HERO (фикс ультрашироких экранов) */}
      <div className="relative w-full flex justify-center bg-black">
        <div className="w-full max-w-[1800px] px-6">
          <div className="relative rounded-2xl overflow-hidden">
            {/* 👇 ключ: контролируем высоту через clamp */}
            <div className="h-[clamp(500px,70vh,900px)]">
              <img
                src={car.images[0]}
                alt={car.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* текст */}
            <div className="absolute bottom-12 left-12">
              <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
                {car.name}
              </h1>
              <p className="text-gray-300 mt-3 text-lg">
                {car.year} • {car.mileage} KM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-[1400px] mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16">
        {/* 📸 ГАЛЕРЕЯ */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-xl">
            <img
              src={car.images[1]}
              alt={car.name}
              className="w-full h-[420px] object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {car.images.slice(2, 6).map((img, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <img
                  src={img}
                  alt={car.name}
                  className="h-[180px] w-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 📊 INFO */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold mb-8">Specifications</h2>

            <div className="grid grid-cols-2 gap-y-8 gap-x-10 text-gray-300">
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="text-xl">{car.year}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Mileage</p>
                <p className="text-xl">{car.mileage} KM</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="text-xl">{car.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Condition</p>
                <p className="text-xl">Excellent</p>
              </div>
            </div>
          </div>

          {/* 💰 PRICE + CTA */}
          <div className="mt-16">
            <h2 className="text-5xl font-bold mb-8">
              €{car.price.toLocaleString()}
            </h2>

            <button
              onClick={() => dispatch(addToCart(car.id))}
              className="hero-btn inline-flex max-w-[350px] bg-white py-5 px-16 text-lg font-semibold rounded-xl active:scale-95"
            >
              <span className="hero-btn-span ">Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetailsPage;
