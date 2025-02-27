"use client";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { products } from "../data/products";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        Product not found
      </div>
    );
  }

  const handleBuyNow = () => {
    // In a real application, you would add the product to the cart here
    // For now, we'll just redirect to the checkout page
    navigate("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image || "/placeholder.svg"}
            alt={`${product.brand} ${product.model}`}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            {product.brand} {product.model}
          </h1>
          <p className="text-gray-600 mb-4">
            {product.year} | {product.category}
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-6">
            ${product.price.toLocaleString()}
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Brand: {product.brand}</li>
              <li>Model: {product.model}</li>
              <li>Year: {product.year}</li>
              <li>Category: {product.category}</li>
            </ul>
          </div>
          <p className="text-gray-600 mb-6">
            {product.inStock ? (
              <span className="text-green-600">
                In Stock ({product.quantity} available)
              </span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>
          {product.inStock && (
            <div className="flex items-center mb-6">
              <label htmlFor="quantity" className="mr-4 font-medium">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-md px-2 py-1 w-16"
              />
            </div>
          )}
          <Button
            onClick={handleBuyNow}
            className="w-full mb-4"
            disabled={!product.inStock}
          >
            {product.inStock ? "Buy Now" : "Out of Stock"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/products")}
          >
            Back to Products
          </Button>
        </div>
      </div>
    </div>
  );
}
