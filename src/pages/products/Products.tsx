"use client";

import CarCards from "@/components/common/CarCards";
import { EmptyState } from "@/components/common/EmptyState";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PaginationModel from "@/components/common/PaginationModel";
import ErrorState from "@/components/errors/ErrorState";
import { Button } from "@/components/ui/button";
import { CURRENCY } from "@/lib/const";
import { cn } from "@/lib/utils";
import {
  useGetBrandsQuery,
  useGetCarsQuery,
} from "@/redux/features/car/carApi";
import { TCarCategory } from "@/types/car.type";
import { Filter, Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import FilterHandler from "./FilterHandler";
import FilterWrapper from "./FilterWrapper";

export default function Products() {
  const [priceRangeStart, priceRangeEnd] = [0, 8000000];
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue] = useDebounce(searchTerm, 300);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    priceRangeStart,
    priceRangeEnd,
  ]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<TCarCategory[]>(
    []
  );
  const [availability, setAvailability] = useState<
    "all" | "inStock" | "outOfStock"
  >("all");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  // Create query parameters for the API call
  const queryParams = {
    search: searchValue || undefined,
    brand: selectedBrands.length > 0 && selectedBrands.join(","),
    model: selectedModels.length > 0 && selectedModels.join(","),
    category: selectedCategories.length > 0 && selectedCategories.join(","),
    minPrice: priceRange[0] > priceRangeStart ? priceRange[0] : undefined,
    maxPrice: priceRange[1] < priceRangeEnd ? priceRange[1] : undefined,
    availability: availability !== "all" ? availability : undefined,
    page,
    limit: 12,
  };

  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useGetCarsQuery(queryParams);

  const { data: brandsModelData } = useGetBrandsQuery();
  const { models, brands } = brandsModelData?.data || {};
  const products = productsData?.data || [];
  const totalPage = productsData?.meta?.totalPage || 1;

  // Handle filters
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setPage(1);
  };

  const handleModelChange = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
    setPage(1);
  };

  const handleCategoryChange = (category: TCarCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([priceRangeStart, priceRangeEnd]);
    setSelectedBrands([]);
    setSelectedModels([]);
    setSelectedCategories([]);
    setAvailability("all");
    setPage(1);
  };

  // Close filter sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setFilterOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mx-auto px-5 md:px-10 py-12 bg-accent min-h-screen">
      {/* Header with title and mobile filter toggle */}
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          className="md:hidden flex items-center gap-2"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <Filter size={16} />
          {filterOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Selected filters display */}
      {(selectedBrands.length > 0 ||
        selectedCategories.length > 0 ||
        selectedModels.length > 0 ||
        availability !== "all" ||
        (priceRange[0] > priceRangeStart && priceRange[1] < priceRangeEnd)) && (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>

          {selectedBrands.map((brand) => (
            <FilterHandler
              name={brand}
              clearFilter={() => handleBrandChange(brand)}
            />
          ))}

          {selectedModels.map((model) => (
            <FilterHandler
              name={model}
              clearFilter={() => handleModelChange(model)}
            />
          ))}

          {selectedCategories.map((category) => (
            <FilterHandler
              name={category}
              clearFilter={() => handleCategoryChange(category)}
            />
          ))}

          {availability !== "all" && (
            <FilterHandler
              name={availability === "inStock" ? "In Stock" : "Out of Stock"}
              clearFilter={() => setAvailability("all")}
            />
          )}

          {priceRange[0] > priceRangeStart && priceRange[1] < priceRangeEnd && (
            <>
              <FilterHandler
                className="bg-amber-50 text-amber-700"
                name={`${CURRENCY + priceRange[0].toLocaleString()} - ${
                  CURRENCY + priceRange[1].toLocaleString()
                }`}
                clearFilter={() => {
                  setPriceRange([priceRangeStart, priceRangeEnd]);
                  setPage(1);
                }}
              />
            </>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-gray-500 hover:text-gray-800"
          >
            Clear All
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-full md:w-auto md:relative md:blocktransform transition-transform duration-300 ease-in-out bg-white md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 overflow-y-auto -translate-x-full md:translate-x-0 no-scrollbar",
            { "translate-x-0": filterOpen }
          )}
        >
          <FilterWrapper
            brands={brands ?? []}
            models={models ?? []}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedModels={selectedModels}
            setSelectedModels={setSelectedModels}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            availability={availability}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            setPage={setPage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setAvailability={setAvailability}
            setFilterOpen={setFilterOpen}
            priceRangeStart={priceRangeStart}
            priceRangeEnd={priceRangeEnd}
          />
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <ErrorState
              title="Error"
              message="Error loading products. Please try again later."
              onRetry={() => refetch()}
            />
          ) : products.length === 0 ? (
            <EmptyState
              icon={Layers}
              title="No vehicles found"
              description="Try adjusting your filters or search criteria"
              actionLabel="Reset Filters"
              onAction={resetFilters}
            />
          ) : (
            <>
              {/* Product cards grid */}
              <CarCards carsData={products} />

              <PaginationModel
                page={page}
                totalPage={totalPage}
                setPage={setPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
