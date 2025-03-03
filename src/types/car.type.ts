/* eslint-disable @typescript-eslint/no-explicit-any */
export type TCar = {
  _id: string;
  brand: string;
  model: string;
  price: number;
  quantity: number;
  category?: string;
  [key: string]: any;
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
export const CAR_CATEGORIES = [
  "All",
  "SUV",
  "Sedan",
  "Truck",
  "Sports",
  "Luxury",
  "Electric",
];

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
