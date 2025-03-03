import { DataTable } from "@/components/tables/DataTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import {
  AddButton,
  DeleteButton,
  EditButton,
} from "@/components/ui/global-buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteCarMutation,
  useGetCarsQuery,
} from "@/redux/features/car/carApi";
import { ADD_PRODUCT_PATH, PRODUCTS_PATH } from "@/routes/admin.route";
import { CAR_BRANDS, CAR_CATEGORIES, TCar } from "@/types/car.type";
import { ColumnDef } from "@tanstack/react-table";
import { FilterX, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";


export default function ManageProducts() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [searchValue] = useDebounce(searchTerm, 300);

  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || "All"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice") || 0),
    Number(searchParams.get("maxPrice") || 100000),
  ]);
  const [availability, setAvailability] = useState(
    searchParams.get("availability") || "All"
  );
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  // Create query parameters for the API call
  const queryParams = {
    search: searchValue || undefined,
    brand: selectedBrand !== "All" ? selectedBrand : undefined,
    category: selectedCategory !== "All" ? selectedCategory : undefined,
    minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
    maxPrice: priceRange[1] < 100000 ? priceRange[1] : undefined,
    availability: availability !== "All" ? availability : undefined,
    page,
    limit: 10,
  };

  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetCarsQuery(queryParams);
  const [deleteProduct] = useDeleteCarMutation();

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedBrand !== "All") params.set("brand", selectedBrand);
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < 100000)
      params.set("maxPrice", priceRange[1].toString());
    if (availability !== "All") params.set("availability", availability);
    params.set("page", page.toString());
    setSearchParams(params);
  }, [
    searchTerm,
    selectedBrand,
    selectedCategory,
    priceRange,
    availability,
    page,
    setSearchParams,
  ]);

  const handleAddProduct = () => {
    navigate(ADD_PRODUCT_PATH);
  };

  const handleEditProduct = (productId: string) => {
    navigate(PRODUCTS_PATH + `/${productId}`);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId).unwrap();
    } catch (error) {
      console.error("Failed to delete the product:", error);
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setPage(1); // Reset to first page on search
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBrand("All");
    setSelectedCategory("All");
    setPriceRange([0, 100000]);
    setAvailability("All");
    setPage(1);
    setSearchParams({});
  };

  const columns: ColumnDef<TCar>[] = [
    {
      accessorKey: "brand",
      header: "Brand",
    },
    {
      accessorKey: "model",
      header: "Model",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original.category || "N/A"}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>${row.original.price.toLocaleString()}</span>,
    },
    {
      accessorKey: "quantity",
      header: "Stock",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span>{row.original.quantity}</span>
          {row.original.quantity > 0 ? (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              In Stock
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-red-50 text-red-700 border-red-200"
            >
              Out of Stock
            </Badge>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <EditButton
            onClick={() => {
              handleEditProduct(row.original._id);
            }}
          />
          <DeleteButton onClick={() => handleDeleteProduct(row.original._id)} />
        </div>
      ),
    },
  ];

  if (isLoading) return <div>Loading products...</div>;
  if (isError)
    return <div>Error loading products. Please try again later.</div>;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <AddButton onClick={handleAddProduct} />
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by brand, model, or category..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {/* Filters section */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="filters">
          <AccordionTrigger className="text-lg font-medium">
            Filters
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
              {/* Brand filter */}
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Select
                  value={selectedBrand}
                  onValueChange={(value) => {
                    setSelectedBrand(value);
                    setPage(1); // Reset to first page on filter change
                  }}
                >
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAR_BRANDS.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category filter */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                    setPage(1); // Reset to first page on filter change
                  }}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAR_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Availability filter */}
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select
                  value={availability}
                  onValueChange={(value) => {
                    setAvailability(value);
                    setPage(1); // Reset to first page on filter change
                  }}
                >
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price range slider */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <Label>Price Range</Label>
                <span className="text-sm">
                  ${priceRange[0].toLocaleString()} - $
                  {priceRange[1].toLocaleString()}
                </span>
              </div>
              <DualRangeSlider
                value={[priceRange[0], priceRange[1]]}
                min={0}
                max={100000}
                step={1000}
                onValueChange={(values) => {
                  setPriceRange(values);
                  setPage(1); // Reset to first page on filter change
                }}
                className="w-full"
              />
            </div>

            {/* Reset filters button */}
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={resetFilters}
            >
              <FilterX className="h-4 w-4" />
              Reset Filters
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Results count */}
      <div className="text-sm text-muted-foreground mb-2">
        Found {productsData?.meta?.total || 0} product
        {productsData?.meta?.total !== 1 ? "s" : ""}
      </div>

      <DataTable
        columns={columns}
        data={productsData?.data || []}
        serverPagination={{
          pageCount: productsData?.meta?.totalPage || 1,
          currentPage: page,
        }}
        onPaginationChange={(pagination) => {
          setPage(pagination.pageIndex + 1);
        }}
      />
    </div>
  );
}
