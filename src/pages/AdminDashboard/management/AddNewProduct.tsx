import { ChangeEvent, useEffect, useState } from "react";
import { useCreateProductMutation } from "../../../redux/api/productApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ProductFormData {
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}
const AddNewProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ProductFormData>();
  const navigate = useNavigate()

  const [createProduct, { data, isSuccess, isLoading, error }] =
    useCreateProductMutation();

  const [photo, setPhoto] = useState<File | null>(null);

  // Photo handler
  const photoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  // Handle form submission
  const productCreateHandler: SubmitHandler<ProductFormData> = async (formData) => {
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("category", formData.category);
    formDataObj.append("price", formData.price.toString());
    formDataObj.append("stock", formData.stock.toString());
    formDataObj.append("description", formData.description);

    if (photo) {
      formDataObj.append("photo", photo); // Add the photo to the FormData object
    }

    try {
      await createProduct({ formData: formDataObj });
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  useEffect(() => {
    if (error?.data) {
      toast.error(error?.data?.message, { duration: 3000 });
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error?.data?.message}`,
      });
    }

    if (isSuccess) {
      console.log("isSuccess ", isSuccess);
      toast.success(data?.message, { duration: 3000 });
      navigate("/admin/products")
    }
  }, [error, setError, isSuccess, data, navigate]);

  return (
    <div className="dashboard-container p-4 md:pl-0 md:pt-4">
      <h2 className="heading">Add new Product</h2>
      <div className="section-grant p-4">
        <form
          onSubmit={handleSubmit(productCreateHandler)}
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="text-input"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-myRed font-semibold">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="category">Category</label>
              <select
                className="text-input"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select a Category</option>
                <option value="electronics">Electronics</option>
                <option value="groceries">Groceries</option>
                <option value="household">Household</option>
                <option value="gents">Gents</option>
                <option value="Ladies">Ladies</option>
                <option value="baby care">Baby Care</option>
              </select>
              {errors.category && (
                <span className="text-myRed font-semibold">
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                placeholder="Price"
                className="text-input"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && (
                <span className="text-myRed font-semibold">
                  {errors.price.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                placeholder="Stock"
                className="text-input"
                {...register("stock", { required: "Stock is required" })}
              />
              {errors.stock && (
                <span className="text-myRed font-semibold">
                  {errors.stock.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="photo">Photo</label>
              <input
                type="file"
                accept="image/*"
                className="text-input"
                onChange={photoHandler}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="description">Description</label>
            <textarea
              rows={2}
              className="text-input"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <span className="text-myRed font-semibold">
                {errors.description.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="full-w-btn"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="spinner"></div>
                <span>Product Creating</span>
              </div>
            ) : (
              "Create Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
