import { ReactElement, useState } from "react";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity, removeCartItem } from "../../redux/reducers/cartReducer";
import ModularTableWithSkeleton from "../../components/adminDashboard/ModularTable";
import EmptyMessage from "../../components/EmptyMessage";

interface DataType {
  _id: string;
  photo: ReactElement;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  action: ReactElement;
}

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState<string>("");
  const [isDiscounted, setIsDiscounted] = useState<boolean>(false);

  const { cartItems, total, tax, shippingCharge } = useSelector((state: { cart: any }) => state.cart);

  const itemIncrementHandler = (itemId: string) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item) {
      if (item.quantity < item.stock) {
        dispatch(incrementQuantity(itemId));
      } else {
        toast.error("Sorry, this product is out of stock.");
      }
    }
  };

  const itemDecrementHandler = (itemId: string) => {
    dispatch(decrementQuantity(itemId));
  };

  const itemRemoveHandler = (itemId: string) => {
    dispatch(removeCartItem(itemId));
  };

  const columns: Column<DataType>[] = [
    { Header: "Photo", accessor: "photo" },
    { Header: "Name", accessor: "name" },
    { Header: "Price", accessor: "price" },
    {
      Header: "Quantity",
      accessor: "quantity",
      Cell: ({ row }) => (
        <div className="border border-gray-400 flex items-center justify-center gap-3 w-fit px-3 py-1.5 rounded-md">
          <Minus size={15} onClick={() => itemDecrementHandler(row.original._id)} className="cursor-pointer" />
          <b>{row.original.quantity}</b>
          <Plus size={15} onClick={() => itemIncrementHandler(row.original._id)} className="cursor-pointer" />
        </div>
      ),
    },
    {
      Header: "Sub-Total",
      accessor: "subtotal",
      Cell: ({ row }) => <b>{row.original.subtotal}</b>,
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => <Trash size={17} onClick={() => itemRemoveHandler(row.original._id)} className="cursor-pointer hover:text-myRed"></Trash>,
    },
  ];

  const discount = isDiscounted ? ((total + tax + shippingCharge) / 100) * 14 : 0;

  // Handle coupon apply and calculation of final amount
  const couponApplyHandler = (e) => {
    e.preventDefault();
    if (coupon === "FirstCoupon1") {
      toast.success("Congrats! You've got the discount 🎉");
      setIsDiscounted(true);
    } else {
      toast.error("Oops! This is an invalid coupon.");
      setIsDiscounted(false);
    }
  };

  // Calculate the final total including shipping, tax, and discount
  const finalTotal = Math.round(total + shippingCharge + tax - discount);

  return (
    <>
      {cartItems?.length >= 1 ? (
        <div className="w-full md:w-[90%] mx-auto spacey-20 pb-16 ">
          {/* coupon informer */}
          <div className="my-10 bg-white w-fit mx-auto py-3 p-6 font-semibold tracking-wide shadow hover:shadow-md duration-500 rounded-full">
            <div className="animate-pulse">
              Apply coupon <span className="text-myBlue">"FirstCoupon1"</span> to get <span className="text-myBlue">14% discount</span> on your total payment
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <main className="col-span-5 section-grant p-4 ">
              <h1 className="heading">Cart Items</h1>
              <ModularTableWithSkeleton columns={columns} data={cartItems} containerClassName="my-table-container" heading="Shopping Cart" showPagination={true} />
            </main>

            <aside className="col-span-2 md:col-span-2 section-grant p-4 w-full">
              <h1 className="heading">Cart Total</h1>
              {/* payment calculating */}
              <div className="text-sm text-gray-600 space-y-6 px-3">
                <div className="flex items-center justify-between">
                  <p>Sub-total</p>
                  <p className="font-semibold text-black">{total.toFixed(2)} Tk</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Discount (-14%)</p>
                  <p className="font-semibold text-black">{discount.toFixed(2)} Tk</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Shipping (+6%)</p>
                  <p className="font-semibold text-black">{shippingCharge.toFixed(2)} Tk</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Tax (+4%)</p>
                  <p className="font-semibold text-black">{tax.toFixed(2)} Tk</p>
                </div>
              </div>
              <hr className="hr mt-5 mb-2" />

              {/* coupon applying form */}
              <form onSubmit={couponApplyHandler} className="flex flex-col items-center gap-2 mb-4 w-full">
                <input
                  required
                  type="text"
                  placeholder="Enter the coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="text-input w-full"
                />
                <button disabled={isDiscounted} type="submit" className="primary-btn">
                  Apply Coupon
                </button>
              </form>

              <div className="mt-8 flex items-end justify-between text-gray-700">
                <b>Total</b>
                <b>
                  {isDiscounted ? (
                    <span className="flex flex-col items-end justify-between">
                      <span className="line-through text-gray-500 ">{(total + shippingCharge + tax).toFixed(2)} Tk</span>
                      <span>{finalTotal.toFixed(2)} Tk</span>
                    </span>
                  ) : (
                    <span>{(total + shippingCharge + tax).toFixed(2)} Tk</span>
                  )}
                </b>
              </div>
              <Link to={"/checkout"} state={{ cartItems, total, finalTotal, tax, discount, shippingCharge }}>
                <button className="full-w-btn my-5">Proceed to checkout →</button>
              </Link>
            </aside>
          </div>
        </div>
      ) : (
        <EmptyMessage
          btnText={"Shop now"}
          redirectTo={"/products"}
          message="Your shopping cart is empty" />
      )}
    </>
  );
};

export default ShoppingCartPage;