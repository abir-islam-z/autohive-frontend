import {
  useDeleteCarMutation,
  useGetCarsQuery,
} from "@/redux/features/car/carApi";
import { useNavigate } from "react-router-dom";
import {
  AddButton,
  DeleteButton,
  EditButton,
} from "../../components/ui/global-buttons";

export default function ManageProducts() {
  const navigate = useNavigate();
  const { data: products, isLoading, isError } = useGetCarsQuery();
  const [deleteProduct] = useDeleteCarMutation();

  const handleAddProduct = () => {
    navigate("/admin/products/add");
  };

  const handleEditProduct = (productId: string) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId).unwrap();
    } catch (error) {
      console.error("Failed to delete the product:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>
      <div className="mb-4">
        <AddButton onClick={handleAddProduct} />
      </div>
      <div className="space-y-4">
        {products?.map((product) => (
          <div
            key={product?._id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <p className="font-medium">
                {product.brand} {product.model}
              </p>
              <p className="text-sm text-gray-600">
                Price: ${product.price} | Stock: {product.quantity}
              </p>
            </div>
            <div>
              <EditButton
                onClick={() => handleEditProduct(product?._id)}
                className="mr-2"
              />
              <DeleteButton onClick={() => handleDeleteProduct(product?._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
