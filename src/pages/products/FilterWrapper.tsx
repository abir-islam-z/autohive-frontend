import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CURRENCY } from "@/lib/const";
import { CAR_CATEGORIES, TCarCategory } from "@/types/car.type";
import { X } from "lucide-react";
import React from "react";
import FilterSection from "./FilterSection";

type FilterWrapperProps = {
  setFilterOpen: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;

  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;

  selectedModels: string[];
  setSelectedModels: React.Dispatch<React.SetStateAction<string[]>>;

  selectedCategories: TCarCategory[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<TCarCategory[]>>;

  availability: string;
  setAvailability: React.Dispatch<
    React.SetStateAction<"all" | "inStock" | "outOfStock">
  >;

  setPage: React.Dispatch<React.SetStateAction<number>>;
  brands?: string[];
  models?: string[];
  priceRangeStart: number;
  priceRangeEnd: number;
};

export default function FilterWrapper({
  setFilterOpen,
  searchTerm,
  setSearchTerm,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedModels,
  setSelectedModels,
  selectedCategories,
  setSelectedCategories,
  availability,
  setAvailability,
  setPage,
  brands,
  models,
  priceRangeStart,
  priceRangeEnd,
}: FilterWrapperProps) {
  return (
    <div className="md:sticky md:top-24 space-y-6 bg-white md:bg-gray-50 p-4 rounded-lg border border-gray-100 md:shadow-sm">
      <div className="flex justify-between items-center md:hidden mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setFilterOpen(false)}
        >
          <X size={18} />
        </Button>
      </div>

      <div className="space-y-5">
        {/* Search */}
        <div>
          <Label
            htmlFor="search"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Search
          </Label>
          <Input
            id="search"
            type="text"
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="w-full"
          />
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium text-gray-700 block mb-2">
            Price Range
          </Label>
          <DualRangeSlider
            min={priceRangeStart}
            max={priceRangeEnd}
            step={1000}
            value={priceRange}
            onValueChange={(value: [number, number]) => {
              setPriceRange(value);
              setPage(1);
            }}
            className="my-4"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{CURRENCY + priceRange[0].toLocaleString()}</span>
            <span>{CURRENCY + priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Brand Filter */}
        <FilterSection
          title="Brand"
          items={brands!}
          selectedItems={selectedBrands}
          handleChange={(brand) => {
            setSelectedBrands((prev) =>
              prev.includes(brand)
                ? prev.filter((b) => b !== brand)
                : [...prev, brand]
            );

            setPage(1);
          }}
        />

        {/* Model Filter */}
        <FilterSection
          title="Model"
          items={models!}
          selectedItems={selectedModels}
          handleChange={(model) => {
            setSelectedModels((prev) =>
              prev.includes(model)
                ? prev.filter((m) => m !== model)
                : [...prev, model]
            );

            setPage(1);
          }}
        />

        {/* Category Filter */}

        <FilterSection
          title="Category"
          items={CAR_CATEGORIES}
          selectedItems={selectedCategories}
          handleChange={(category) => {
            setSelectedCategories((prev) =>
              prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
            );

            setPage(1);
          }}
        />

        {/* Availability */}
        <FilterSection
          title="Availability"
          items={["all", "inStock", "outOfStock"]}
          selectedItems={[availability]}
          getLabel={(option) => {
            return option === "all"
              ? "All"
              : option === "inStock"
              ? "In Stock"
              : "Out of Stock";
          }}
          handleChange={(option) => {
            setAvailability(option as "all" | "inStock" | "outOfStock");
            setPage(1);
          }}
        />
      </div>

      {/* Mobile apply filter button */}
      <div className="mt-8 md:hidden">
        <Button className="w-full" onClick={() => setFilterOpen(false)}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
