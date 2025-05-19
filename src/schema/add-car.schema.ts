import { CAR_CATEGORY } from "@/lib/const";
import { z } from "zod";

export const createCarSchema = z.object({
  brand: z.string().nonempty({ message: "Brand is required" }),
  model: z.string().nonempty({ message: "Model is required" }),
  year: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => val >= 1900 && val <= 2025, {
      message: "Year must be between 1900 and 2025",
    }),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => val >= 0, {
      message: "Price must be non-negative",
    }),
  category: z.enum(CAR_CATEGORY, {
    message:
      '"Sedan", "SUV", "Truck", "Coupe", "Convertible" are the only valid categories',
  }),
  description: z.string().nonempty({ message: "Description is required" }),
  quantity: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => val >= 0 && Number.isInteger(val), {
      message: "Quantity must be a non-negative number",
    }),
  currency: z.string().default("usd"),
  images: z.array(z.instanceof(File)).nonempty({
    message: "Image is required",
  }),
  color: z.string().trim().min(1, {
    message: "Color is required",
  }),
  engine: z.string().trim().min(1, {
    message: "Engine is required",
  }),
  transmission: z.string().trim().min(1, {
    message: "Transmission is required",
  }),
  fuelType: z.string().trim().min(1, {
    message: "Fuel type is required",
  }),
  mileage: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => val >= 0, {
      message: "Mileage must be non-negative",
    }),

  horsepower: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => val >= 0, {
      message: "Horsepower must be non-negative",
    }),

  driveType: z.string().trim().min(1, {
    message: "Drive type is required",
  }),
});

export const updateCarSchema = createCarSchema.strip().partial();

export type TCreateCar = z.infer<typeof createCarSchema>;
export type TUpdateCar = z.infer<typeof updateCarSchema>;
