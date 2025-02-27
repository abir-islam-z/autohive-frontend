import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function FeaturedProducts() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
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
        <div className="mt-8 text-center">
          <Link to="/products">
            <Button>View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
