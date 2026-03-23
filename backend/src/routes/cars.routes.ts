import { Router } from "express";
import type { Request, Response } from "express";
import { Car } from "../models/Car";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// PUBLIC — Get All cars
router.get("/", async (_req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });

    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

// PUBLIC — Get one car

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.json(car);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch car" });
  }
});

// PROTECTED — Create car

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { brand, model, price, image, description } = req.body;

    const car = new Car({
      brand,
      model,
      price,
      image,
      description,
    });

    await car.save();

    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: "Failed to create car" });
  }
});

export default router;
