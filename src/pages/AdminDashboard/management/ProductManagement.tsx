import { ChangeEvent, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateProductMutation } from "../../../redux/api/productApi";
import { toast } from "sonner";

// Define form data interface
interface ProductFormData {
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
}

const ProductManagement = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ProductFormData>();

    const navigate = useNavigate();
    const location = useLocation();
    const product = location?.state?.product;
    const { _id, name, category, price, stock, description } = product || {};

    const [updateProduct, { data, isSuccess, isLoading, error }] = useUpdateProductMutation();

    const [photo, setPhoto] = useState<File | null>(null);

    // Photo handler
    const photoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
        if (file) {
            setPhoto(file);
        }
    };

    const productUpdateHandler: SubmitHandler<ProductFormData> = async (formData) => {
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("category", formData.category);
        formDataObj.append("price", formData.price.toString());
        formDataObj.append("stock", formData.stock.toString());
        formDataObj.append("description", formData.description);

        if (photo) {
            formDataObj.append("photo", photo);
        }

        try {
            await updateProduct({ id: _id, formData: formDataObj });
        } catch (error) {
            toast.error("Failed to update product");
            console.error("Product update failed:", error);
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
            toast.success(data?.message, { duration: 3000 });
            navigate("/admin/products");
        }
    }, [error, setError, isSuccess, data, navigate]);

    return (
        <div className="dashboard-container p-4 md:pl-0">
            {/* <main className="grid grid-cols-1 md:grid-cols-2 flex-col md:flex-row items-start justify-center gap-6"> */}
            {/* <section className="section-grant p-4">
                    <h2 className="heading">Product Preview </h2>
                    <p>{name}</p>
                    <span>
                        Stock:{" "}
                        {stock > 0 ? (
                            <span className="green">{stock} items available </span>
                        ) : (
                            <span className="red">not available right now</span>
                        )}
                    </span>
                    <p>Price: {price}$</p>
                </section> */}
            <h2 className="heading">Update Product</h2>

            <div className="section-grant p-4">
                <form
                    onSubmit={handleSubmit(productUpdateHandler)}
                    className="space-y-4"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                defaultValue={name}
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
                                defaultValue={category}
                                {...register("category", { required: "Category is required" })}
                                className="text-input"
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
                            <label htmlFor="product-price">Price</label>
                            <input
                                type="number"
                                placeholder="Price"
                                defaultValue={price}
                                className="text-input"
                                {...register("price", {
                                    required: "Price is required",
                                    min: { value: 0, message: "Price must be positive" },
                                })}
                            />
                            {errors.price && (
                                <span className="text-myRed font-semibold">
                                    {errors.price.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="product-stock">Stock</label>
                            <input
                                type="number"
                                placeholder="Stock"
                                defaultValue={stock}
                                className="text-input"
                                {...register("stock", {
                                    required: "Stock is required",
                                    min: { value: 0, message: "Stock must be non-negative" },
                                })}
                            />
                            {errors.stock && (
                                <span className="text-myRed font-semibold">
                                    {errors.stock.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="product-photo">Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={photoHandler}
                            className="text-input"
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="description">Description</label>
                        <textarea
                            rows={2}
                            defaultValue={description}
                            {...register("description", { required: "Description is required" })}
                            className="text-input"
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
                            <>
                                <div className="flex items-center justify-center">
                                    <div className="spinner"></div>
                                    <span>Product Updating</span>
                                </div>
                            </>
                        ) : (
                            "Update Product"
                        )}
                    </button>
                </form>
            </div>
            {/* </main> */}
        </div>
    );
};

export default ProductManagement;