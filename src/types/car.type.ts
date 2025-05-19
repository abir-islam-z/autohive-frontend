import { CURRENCY_SYMBOL } from "@/lib/const";

export type TBrandsModels = {
  brands: string[];
  models: string[];
};

export type TCar = {
  readonly _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  description: string;
  currency: keyof typeof CURRENCY_SYMBOL;
  quantity: number;
  inStock: boolean;
  color: string;
  engine: string;
  transmission: string;
  fuelType: string;
  mileage: number;
  horsepower: number;
  driveType: string;
  images: string[];
  createdAt: string;
};
export const CAR_BRANDS = [
  "All",
  "Toyota",
  "Honda",
  "Ford",
  "BMW",
  "Mercedes",
  "Audi",
];

export const CAR_CATEGORIES: TCarCategory[] = [
  "All",
  "SUV",
  "Sedan",
  "Truck",
  "Sports",
  "Luxury",
  "Electric",
];

export type TCarCategory =
  | "All"
  | "SUV"
  | "Sedan"
  | "Truck"
  | "Sports"
  | "Luxury"
  | "Electric";

export const CATEGORY_OPTIONS = [
  { label: "Sedan", value: "Sedan" },
  { label: "SUV", value: "SUV" },
  { label: "Truck", value: "Truck" },
  { label: "Coupe", value: "Coupe" },
  { label: "Convertible", value: "Convertible" },
  { label: "Sports", value: "Sports" },
  { label: "Luxury", value: "Luxury" },
];

export const CURRENCY_OPTIONS = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
  {
    label: "BDT",
    value: "BDT",
  },
];
