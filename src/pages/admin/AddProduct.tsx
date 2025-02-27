"use client";

import type React from "react";

import { useCreateCarMutation } from "@/redux/features/car/carApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { CarCategory } from "../../data/products";

export default function AddProduct() {
  const navigate = useNavigate();
  const [addProduct] = useCreateCarMutation();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    category: CarCategory.Sedan,
    description: "",
    quantity: 0,
    inStock: true,
    image: "/placeholder.jpg",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct(formData).unwrap();
      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to add the product:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  year: Number.parseInt(e.target.value),
                })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Number.parseInt(e.target.value),
                })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as CarCategory,
                })
              }
              className="w-full border rounded px-2 py-1"
              required
            >
              {Object.values(CarCategory).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: Number.parseInt(e.target.value),
                })
              }
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border rounded px-2 py-1"
            rows={4}
            required
          ></textarea>
        </div>
        <Button type="submit" className="mt-4">
          Add Product
        </Button>
      </form>
    </div>
  );
}
