import sf90_1 from "../../../assets/cars/Ferrari_SF90_Stradale_1.jpg";
import sf90_2 from "../../../assets/cars/Ferrari_SF90_Stradale_2.jpg";

import sf90Spider_1 from "../../../assets/cars/ferrari_sf90_spider_by_novitec_1.jpg";
import sf90Spider_2 from "../../../assets/cars/ferrari_sf90_spider_by_novitec_2.jpg";

import ferrari296_1 from "../../../assets/cars/ferrari_296-gtb_1.jpg";
import ferrari296_2 from "../../../assets/cars/ferrari_296-gtb_2.jpg";

import roma_1 from "../../../assets/cars/ferrari_roma_1.jpg";
import roma_2 from "../../../assets/cars/ferrari_roma_2.webp";

import f8_1 from "../../../assets/cars/f8-tributo_1.webp";
import f8_2 from "../../../assets/cars/f8-tributo_2.jpg";

import aperta_1 from "../../../assets/cars/Aperta_1.webp";
import aperta_2 from "../../../assets/cars/Aperta_2.webp";

import laferrari_1 from "../../../assets/cars/ferrari_laferrari_1.jpg";
import laferrari_2 from "../../../assets/cars/ferrari_laferrari_2.jpg";

import superfast_1 from "../../../assets/cars/2017_ferrari_812_superfast_1.jpg";
import superfast_2 from "../../../assets/cars/2017_ferrari_812_superfast_2.jpg";

import purosangue_1 from "../../../assets/cars/purosangue_1.jpg";
import purosangue_2 from "../../../assets/cars/purosangue_2.jpg";

export interface Car {
  id: number;
  name: string;
  model: string; // 🔥 НОВОЕ
  year: number;
  mileage: number;
  price: number;
  color: string;
  interior: string;
  images: string[];
}

export const cars: Car[] = [
  {
    id: 1,
    name: "SF90 Stradale",
    model: "SF90",
    year: 2023,
    mileage: 3200,
    price: 525000,
    color: "Rosso Corsa",
    interior: "Nero",
    images: [sf90_1, sf90_2],
  },
  {
    id: 2,
    name: "SF90 Spider Novitec",
    model: "SF90",
    year: 2024,
    mileage: 1500,
    price: 590000,
    color: "Rosso Corsa",
    interior: "Nero",
    images: [sf90Spider_1, sf90Spider_2],
  },
  {
    id: 3,
    name: "296 GTB",
    model: "296",
    year: 2024,
    mileage: 800,
    price: 340000,
    color: "Grigio Silverstone",
    interior: "Nero",
    images: [ferrari296_1, ferrari296_2],
  },
  {
    id: 4,
    name: "Ferrari Roma",
    model: "Roma",
    year: 2023,
    mileage: 3500,
    price: 245000,
    color: "Blu Tour De France",
    interior: "Cuoio",
    images: [roma_1, roma_2],
  },
  {
    id: 5,
    name: "F8 Tributo",
    model: "F8",
    year: 2022,
    mileage: 4600,
    price: 315000,
    color: "Rosso Corsa",
    interior: "Beige",
    images: [f8_1, f8_2],
  },
  {
    id: 6,
    name: "LaFerrari Aperta",
    model: "LaFerrari",
    year: 2017,
    mileage: 900,
    price: 3200000,
    color: "Rosso Fuoco",
    interior: "Nero",
    images: [aperta_1, aperta_2],
  },
  {
    id: 7,
    name: "812 Superfast",
    model: "812",
    year: 2017,
    mileage: 7800,
    price: 390000,
    color: "Rosso Berlinetta",
    interior: "Nero",
    images: [superfast_1, superfast_2],
  },
  {
    id: 8,
    name: "Purosangue",
    model: "Purosangue",
    year: 2024,
    mileage: 600,
    price: 480000,
    color: "Bianco Italia",
    interior: "Nero",
    images: [purosangue_1, purosangue_2],
  },
  {
    id: 9,
    name: "LaFerrari",
    model: "LaFerrari",
    year: 2017,
    mileage: 1200,
    price: 2600000,
    color: "Rosso Fuoco",
    interior: "Nero",
    images: [laferrari_1, laferrari_2],
  },
];
