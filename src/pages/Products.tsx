"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { CarCategory, products, type CarProduct } from "../data/products";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CarCategory[]>(
    []
  );
  const [availability, setAvailability] = useState<
    "all" | "inStock" | "outOfStock"
  >("all");
  const [filteredProducts, setFilteredProducts] =
    useState<CarProduct[]>(products);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesModel =
        selectedModels.length === 0 || selectedModels.includes(product.model);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesAvailability =
        availability === "all" ||
        (availability === "inStock" && product.inStock) ||
        (availability === "outOfStock" && !product.inStock);

      return (
        matchesSearch &&
        matchesPrice &&
        matchesBrand &&
        matchesModel &&
        matchesCategory &&
        matchesAvailability
      );
    });

    setFilteredProducts(filtered);
  }, [
    searchTerm,
    priceRange,
    selectedBrands,
    selectedModels,
    selectedCategories,
    availability,
  ]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleModelChange = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const handleCategoryChange = (category: CarCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        All Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="space-y-6">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                type="text"
                placeholder="Search by brand, model, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label>Price Range</Label>
              <Slider
                min={0}
                max={100000}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
            </div>
            <div>
              <Label>Brand</Label>
              {Array.from(new Set(products.map((p) => p.brand))).map(
                (brand) => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="mr-2"
                    />
                    <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                  </div>
                )
              )}
            </div>
            <div>
              <Label>Model</Label>
              {Array.from(new Set(products.map((p) => p.model))).map(
                (model) => (
                  <div key={model} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`model-${model}`}
                      checked={selectedModels.includes(model)}
                      onChange={() => handleModelChange(model)}
                      className="mr-2"
                    />
                    <Label htmlFor={`model-${model}`}>{model}</Label>
                  </div>
                )
              )}
            </div>
            <div>
              <Label>Category</Label>
              {Object.values(CarCategory).map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
            <div>
              <Label>Availability</Label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="availability-all"
                  checked={availability === "all"}
                  onChange={() => setAvailability("all")}
                  className="mr-2"
                />
                <Label htmlFor="availability-all">All</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="availability-inStock"
                  checked={availability === "inStock"}
                  onChange={() => setAvailability("inStock")}
                  className="mr-2"
                />
                <Label htmlFor="availability-inStock">In Stock</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="availability-outOfStock"
                  checked={availability === "outOfStock"}
                  onChange={() => setAvailability("outOfStock")}
                  className="mr-2"
                />
                <Label htmlFor="availability-outOfStock">Out of Stock</Label>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.brand} ${product.model}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {product.brand} {product.model}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Category: {product.category}
                  </p>
                  <p className="text-gray-600 mb-2">
                    {product.inStock ? (
                      <span className="text-green-600">
                        In Stock ({product.quantity})
                      </span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </p>
                  <p className="text-gray-600 mb-4">
                    ${product.price.toLocaleString()}
                  </p>
                  <Link to={`/products/${product.id}`}>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
