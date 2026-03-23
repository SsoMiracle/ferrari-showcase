import { Schema, model } from "mongoose";

export interface ICar {
  brand: string;
  model: string;
  price: number;
  image: string;
  description: string;
}

const carSchema = new Schema<ICar>(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const Car = model<ICar>("Car", carSchema);
