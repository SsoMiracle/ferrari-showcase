import mongoose from "mongoose";
import dotenv from "dotenv";
import { Car } from "./models/Car";

dotenv.config();

const seedCars = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    await Car.deleteMany();

    await Car.insertMany([
      {
        brand: "Porsche",
        model: "911 Turbo S",
        price: 220000,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        description: "Legendary German performance sports car.",
      },
      {
        brand: "Lamborghini",
        model: "Huracan EVO",
        price: 280000,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b",
        description: "Aggressive Italian V10 supercar.",
      },
      {
        brand: "Ferrari",
        model: "F8 Tributo",
        price: 300000,
        image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
        description: "Pure Italian racing DNA.",
      },
      {
        brand: "BMW",
        model: "M4 Competition",
        price: 85000,
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c9",
        description: "Precision German engineering.",
      },
      {
        brand: "Audi",
        model: "R8 V10",
        price: 180000,
        image: "https://images.unsplash.com/photo-1606229365485-93a3e5d5b5a0",
        description: "Naturally aspirated V10 masterpiece.",
      },
      {
        brand: "Mercedes",
        model: "AMG GT",
        price: 160000,
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a",
        description: "Luxury meets brutal performance.",
      },
      {
        brand: "Nissan",
        model: "GT-R Nismo",
        price: 210000,
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
        description: "Japanese performance legend.",
      },
      {
        brand: "McLaren",
        model: "720S",
        price: 310000,
        image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
        description: "Carbon fiber hyper precision machine.",
      },
    ]);

    console.log("Cars seeded successfully 🚀");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedCars();
