"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { CarCategory } from "../data/products";
import { useGetCarsQuery } from "../redux/features/car/carApi";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue] = useDebounce(searchTerm, 300);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CarCategory[]>(
    []
  );
  const [availability, setAvailability] = useState<
    "all" | "inStock" | "outOfStock"
  >("all");
  const [page, setPage] = useState(1);

  // Create query parameters for the API call
  const queryParams = {
    search: searchValue || undefined,
    brand: selectedBrands.length === 1 ? selectedBrands[0] : undefined,
    category:
      selectedCategories.length === 1 ? selectedCategories[0] : undefined,
    minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
    maxPrice: priceRange[1] < 100000 ? priceRange[1] : undefined,
    availability: availability !== "all" ? availability : undefined,
    page,
    limit: 12, // Show more products on the main page
  };

  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetCarsQuery(queryParams);
  const products = productsData?.data || [];
  const totalPage = productsData?.meta?.totalPage || 1;

  // Handle filters
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setPage(1); // Reset to first page on filter change
  };

  const handleModelChange = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
    setPage(1);
  };

  const handleCategoryChange = (category: CarCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setPage(1);
  };

  // Get unique brands and models from the API data
  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));
  const uniqueModels = Array.from(new Set(products.map((p) => p.model)));

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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1); // Reset page when search changes
                }}
              />
            </div>
            <div>
              <Label>Price Range</Label>
              <Slider
                min={0}
                max={100000}
                step={1000}
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange(value);
                  setPage(1);
                }}
              />
              <div className="flex justify-between mt-2">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
            </div>
            <div>
              <Label>Brand</Label>
              {uniqueBrands.map((brand) => (
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
              ))}
            </div>
            <div>
              <Label>Model</Label>
              {uniqueModels.map((model) => (
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
              ))}
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
                  onChange={() => {
                    setAvailability("all");
                    setPage(1);
                  }}
                  className="mr-2"
                />
                <Label htmlFor="availability-all">All</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="availability-inStock"
                  checked={availability === "inStock"}
                  onChange={() => {
                    setAvailability("inStock");
                    setPage(1);
                  }}
                  className="mr-2"
                />
                <Label htmlFor="availability-inStock">In Stock</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="availability-outOfStock"
                  checked={availability === "outOfStock"}
                  onChange={() => {
                    setAvailability("outOfStock");
                    setPage(1);
                  }}
                  className="mr-2"
                />
                <Label htmlFor="availability-outOfStock">Out of Stock</Label>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading products...</p>
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center h-64">
              <p>Error loading products. Please try again later.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p>No products found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product?._id}
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
                        {product.quantity > 0 ? (
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
                      <Link to={`/products/${product?._id}`}>
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination controls */}
              <div className="flex justify-center mt-8 gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page <= 1}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4">
                  Page {page} of {totalPage}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
                  disabled={page >= totalPage}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
