"use client";

import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import EZButton from "@/components/form/EZButton";
import EZFileInput from "@/components/form/EZFileInput";
import { EZForm } from "@/components/form/EZForm";
import EZInput from "@/components/form/EZInput";
import EZSelect from "@/components/form/EZSelect";
import EZTextArea from "@/components/form/EZTextArea";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { useCreateCarMutation } from "@/redux/features/car/carApi";
import { PRODUCTS_PATH } from "@/routes/admin.route";
import { createCarSchema, TCreateCar } from "@/schema/add-car.schema";
import { CATEGORY_OPTIONS, CURRENCY_OPTIONS } from "@/types/car.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function AddProduct() {
  const navigate = useNavigate();
  const [addProduct] = useCreateCarMutation();
  const [error, setError] = useState<string | null>(null);

  const defaultValues = {
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    category: "Sedan",
    currency: "USD",
    description: "",
    quantity: 1,
    inStock: true,
    image: "",
    color: "Black",
    engine: "",
    transmission: "Automatic",
    fuelType: "Gasoline",
    mileage: 0,
    horsepower: 150,
    driveType: "FWD",
  };

  const handleSubmit = async (data: TCreateCar) => {
    setError(null);

    const toastId = toast.loading("Adding new product...");
    try {
      await addProduct(data).unwrap();
      toast.success("Product added successfully!", { id: toastId });
      navigate(PRODUCTS_PATH);
    } catch (error) {
      toast.dismiss(toastId);
      throw getErrorMessage(error);
    }
  };

  const handleCancel = () => {
    navigate(PRODUCTS_PATH);
  };

  return (
    <DashboardPageWrapper pageHeading="Add New Product">
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
          <CardTitle>Product Information</CardTitle>
          <CardDescription>
            Enter the details of the new product you want to add to your
            inventory.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <EZForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues as unknown as TCreateCar}
            resolver={zodResolver(createCarSchema)}
          >
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <EZInput
                  label="Brand"
                  name="brand"
                  type="text"
                  placeholder="e.g. Toyota"
                />
                <EZInput
                  label="Model"
                  name="model"
                  type="text"
                  placeholder="e.g. Corolla"
                />
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

              <EZTextArea
                label="Description"
                name="description"
                row={5}
                placeholder="Provide a detailed description of the product..."
              />

              {/* Car Specifications Section */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium mb-4">Car Specifications</h3>

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
              </div>

              <EZFileInput
                label="Product Image"
                name="images"
                maxFileCount={4}
              />
            </div>

            <CardFooter className="flex justify-between px-0 pt-6">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <EZButton>Add Car</EZButton>
            </CardFooter>
          </EZForm>
        </CardContent>
      </Card>
    </DashboardPageWrapper>
  );
}
