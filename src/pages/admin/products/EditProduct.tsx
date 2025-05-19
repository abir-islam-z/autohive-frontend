"use client";

import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import ErrorState from "@/components/errors/ErrorState";
import EZButton from "@/components/form/EZButton";
import EZFileInput from "@/components/form/EZFileInput";
import { EZForm } from "@/components/form/EZForm";
import EZInput from "@/components/form/EZInput";
import EZSelect from "@/components/form/EZSelect";
import EZTextArea from "@/components/form/EZTextArea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getErrorMessage } from "@/lib/getErrorMessage";

import {
  useGetCarByIdQuery,
  useUpdateCarMutation,
} from "@/redux/features/car/carApi";
import { PRODUCTS_PATH } from "@/routes/admin.route";
import { TUpdateCar, updateCarSchema } from "@/schema/add-car.schema";
import { CATEGORY_OPTIONS, CURRENCY_OPTIONS } from "@/types/car.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

// Add new option constants
const TRANSMISSION_OPTIONS = [
  { label: "Automatic", value: "Automatic" },
  { label: "Manual", value: "Manual" },
  { label: "CVT", value: "CVT" },
  { label: "Dual-Clutch", value: "Dual-Clutch" },
  { label: "Semi-Automatic", value: "Semi-Automatic" },
];

const FUEL_TYPE_OPTIONS = [
  { label: "Gasoline", value: "Gasoline" },
  { label: "Diesel", value: "Diesel" },
  { label: "Electric", value: "Electric" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Plug-in Hybrid", value: "Plug-in Hybrid" },
];

const DRIVE_TYPE_OPTIONS = [
  { label: "Front-Wheel Drive (FWD)", value: "FWD" },
  { label: "Rear-Wheel Drive (RWD)", value: "RWD" },
  { label: "All-Wheel Drive (AWD)", value: "AWD" },
  { label: "Four-Wheel Drive (4WD)", value: "4WD" },
];

const COLOR_OPTIONS = [
  { label: "Black", value: "Black" },
  { label: "White", value: "White" },
  { label: "Silver", value: "Silver" },
  { label: "Gray", value: "Gray" },
  { label: "Red", value: "Red" },
  { label: "Blue", value: "Blue" },
  { label: "Green", value: "Green" },
  { label: "Yellow", value: "Yellow" },
  { label: "Brown", value: "Brown" },
  { label: "Orange", value: "Orange" },
];

// Skeleton loader for edit product form
function EditProductSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-40 bg-muted rounded animate-pulse" />

      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                  <div className="h-10 w-full bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                  <div className="h-10 w-full bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                  <div className="h-10 w-full bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-32 w-full bg-muted rounded animate-pulse" />
            </div>

            {/* Car specifications skeleton */}
            <div className="space-y-4">
              <div className="h-5 w-40 bg-muted rounded animate-pulse" />

              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                    <div className="h-10 w-full bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                    <div className="h-10 w-full bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                    <div className="h-10 w-full bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                <div className="h-10 w-full bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between w-full">
            <div className="h-10 w-24 bg-muted rounded animate-pulse" />
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function EditProduct() {
  const { productId: id } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetCarByIdQuery(id!);
  const [updateProduct] = useUpdateCarMutation();

  const handleCancel = () => {
    navigate(PRODUCTS_PATH);
  };

  const handleSubmit = async (data: TUpdateCar) => {
    const toastId = toast.loading("Updating product...");

    try {
      await updateProduct({ id, ...data }).unwrap();
      toast.success("Product updated successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate(PRODUCTS_PATH);
    } catch (error) {
      toast.dismiss(toastId);
      const errorMessage = getErrorMessage(error);
      throw errorMessage;
    }
  };

  let content;

  if (isLoading) {
    content = <EditProductSkeleton />;
  } else if (isError || !product?.data) {
    content = (
      <ErrorState
        title="Failed to Load Product"
        message="We couldn't retrieve the product details. Please try again."
        onRetry={() => refetch()}
      />
    );
  } else {
    const defaultValues = {
      brand: product.data.brand || "",
      model: product.data.model || "",
      year: product.data.year || new Date().getFullYear(),
      price: product.data.price || 0,
      category: product.data.category || "Sedan",
      description: product.data.description || "",
      quantity: product.data.quantity || 0,
      currency: product.data.currency || "USD",
      inStock: product.data.inStock || false,
      // New fields
      color: product.data.color || "Black",
      engine: product.data.engine || "",
      transmission: product.data.transmission || "Automatic",
      fuelType: product.data.fuelType || "Gasoline",
      mileage: product.data.mileage || 0,
      horsepower: product.data.horsepower || 150,
      driveType: product.data.driveType || "FWD",
    };

    content = (
      <>
        <div className="mb-6">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleCancel}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
            <CardDescription>
              Update the product information for {product.data.brand}{" "}
              {product.data.model}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <EZForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues as unknown as TUpdateCar}
              resolver={zodResolver(updateCarSchema)}
            >
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <EZInput label="Brand" name="brand" type="text" />
                  <EZInput label="Model" name="model" type="text" />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <EZInput label="Year" name="year" type="number" />
                  <EZSelect
                    label="Category"
                    name="category"
                    options={CATEGORY_OPTIONS}
                  />
                  <EZInput label="Quantity" name="quantity" type="number" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <EZInput label="Price" name="price" type="number" />
                  <EZSelect
                    label="Currency"
                    name="currency"
                    options={CURRENCY_OPTIONS}
                  />
                </div>

                <EZTextArea label="Description" name="description" row={5} />

                {/* Car Specifications Section */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-4">
                    Car Specifications
                  </h3>

                  {/* Engine and Transmission */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <EZInput
                      label="Engine"
                      name="engine"
                      type="text"
                      placeholder="e.g. 2.0L Turbo"
                    />
                    <EZSelect
                      label="Transmission"
                      name="transmission"
                      options={TRANSMISSION_OPTIONS}
                    />
                  </div>

                  {/* Fuel Type and Drive Type */}
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <EZSelect
                      label="Fuel Type"
                      name="fuelType"
                      options={FUEL_TYPE_OPTIONS}
                    />
                    <EZSelect
                      label="Drive Type"
                      name="driveType"
                      options={DRIVE_TYPE_OPTIONS}
                    />
                  </div>

                  {/* Mileage and Horsepower */}
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <EZInput
                      label="Mileage (miles)"
                      name="mileage"
                      type="number"
                      placeholder="0"
                    />
                    <EZInput
                      label="Horsepower (HP)"
                      name="horsepower"
                      type="number"
                      placeholder="150"
                    />
                  </div>

                  {/* Color */}
                  <div className="mt-4">
                    <EZSelect
                      label="Car Color"
                      name="color"
                      options={COLOR_OPTIONS}
                    />
                  </div>

                  <EZFileInput
                    label="Product Image"
                    name="images"
                    maxFileCount={4}
                  />
                </div>
              </div>

              <CardFooter className="flex justify-between px-0 pt-6">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <EZButton>Update Product</EZButton>
              </CardFooter>
            </EZForm>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <DashboardPageWrapper pageHeading="Edit Product">
      {content}
    </DashboardPageWrapper>
  );
}
