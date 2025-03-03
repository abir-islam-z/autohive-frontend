"use client";

import EZButton from "@/components/form/EZButton";
import { EZForm } from "@/components/form/EZForm";
import EZInput from "@/components/form/EZInput";
import EZSelect from "@/components/form/EZSelect";
import EZTextArea from "@/components/form/EZTextArea";
import {
  useGetCarByIdQuery,
  useUpdateCarMutation,
} from "@/redux/features/car/carApi";
import { PRODUCTS_PATH } from "@/routes/admin.route";
import { TUpdateCar, updateCarSchema } from "@/schema/add-car.schema";
import { CATEGORY_OPTIONS, CURRENCY_OPTIONS } from "@/types/car.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function EditProduct() {
  const { productId: id } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useGetCarByIdQuery(id!);
  const [updateProduct] = useUpdateCarMutation();

  const defaultValues = {
    brand: product?.data?.brand,
    model: product?.data?.model,
    year: product?.data?.year,
    price: product?.data?.price,
    category: product?.data?.category,
    description: product?.data?.description,
    quantity: product?.data?.quantity,
    currency: product?.data?.currency,
    inStock: product?.data?.inStock,
  };

  const handleSubmit = async (data: TUpdateCar) => {
    const toastId = toast.loading("Updating product...");
    try {
      await updateProduct({ id, ...data }).unwrap();
      navigate(PRODUCTS_PATH);
      toast.success("Product updated successfully", {
        id: toastId,
        duration: 5000,
      });
    } catch (error) {
      toast.dismiss(toastId);
      throw error;
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product</div>;

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <EZForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues as unknown as TUpdateCar}
        resolver={zodResolver(updateCarSchema)}
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
          <EZButton>Add Product</EZButton>
        </div>
      </EZForm>
    </div>
  );
}
