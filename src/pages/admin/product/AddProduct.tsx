/* eslint-disable no-useless-catch */
"use client";

import EZButton from "@/components/form/EZButton";
import EZFileInput from "@/components/form/EZFileInput";
import { EZForm } from "@/components/form/EZForm";
import EZInput from "@/components/form/EZInput";
import EZSelect from "@/components/form/EZSelect";
import EZTextArea from "@/components/form/EZTextArea";
import { useCreateCarMutation } from "@/redux/features/car/carApi";
import { PRODUCTS_PATH } from "@/routes/admin.route";
import { createCarSchema, TCreateCar } from "@/schema/add-car.schema";
import { CATEGORY_OPTIONS, CURRENCY_OPTIONS } from "@/types/car.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

// Path Constants

export default function AddProduct() {
  const navigate = useNavigate();

  const defaultValues = {
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    category: "Sedan",
    currency: "USD",
    description: "",
    quantity: 0,
    inStock: true,
    image: "",
  };
  const [addProduct] = useCreateCarMutation();

  const handleSubmit = async (data: TCreateCar) => {
    try {
      await addProduct(data).unwrap();
      navigate(PRODUCTS_PATH);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <EZForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues as unknown as TCreateCar}
        resolver={zodResolver(createCarSchema)}
      >
        <div className="grid sm:grid-cols-2 gap-2">
          <EZInput label="Brand" name="brand" type="text" />
          <EZInput label="Model" name="model" type="text" />
          <EZInput label="Year" name="year" type="number" />
          <EZSelect
            label="Category"
            name="category"
            options={CATEGORY_OPTIONS}
          />
          <EZInput label="Price" name="price" type="number" />
          <EZSelect
            label="Currency"
            name="currency"
            options={CURRENCY_OPTIONS}
          />
          <EZInput label="Quantity" name="quantity" type="number" />
        </div>
        <div className="space-y-2.5 mt-3">
          <EZTextArea label="Description" name="description" row={5} />
          <EZFileInput label="Image" name="image" />
          <EZButton>Add Product</EZButton>
        </div>
      </EZForm>
    </div>
  );
}
