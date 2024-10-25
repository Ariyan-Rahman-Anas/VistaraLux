// import { useForm } from "react-hook-form";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Order } from "../../types/types";

// const CheckOutForm = () => {
//     const navigate = useNavigate()
//     const location = useLocation()

//     const cartItems = location.state.cartItems
//     const tax = location.state.tax
//     const shippingCharge = location.state.shippingCharge
//     const discount = location.state.discount
//     const subtotal = location.state.total
//     const finalTotal = location.state.finalTotal

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setError
//     } = useForm<Order>();

//     const submitHandler = async (formData) => {
//         // finish this functions
//         console.log("Form Data:", formData);
//     };

//     const proceedToPaymentHandler = () => {
//         navigate("/make-payment")
//     }

//     return (
//         <div className="px-2 pt-8 pb-12 w-full md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-7 gap-4 ">
//             {/* Main Form Section */}
//             <main className="section-grant col-span-7 md:col-span-5 p-4 md:p-8 ">
//                 <form id="checkout-form" onSubmit={handleSubmit(submitHandler)}>
//                     <div className="space-y-4">
//                         <h1 className="mb-3 font-semibold text-lg">Billing Information</h1>
//                         <div className="flex flex-col md:flex-row gap-4 w-full ">
//                             <div className="flex flex-col w-full gap-1 ">
//                                 <label htmlFor="billingInfo.userId.name" className="text-sm">Name</label>
//                                 <input
//                                     type="text"
//                                     placeholder="John Doe"
//                                     className="text-input"
//                                     {...register("billingInfo.userId.name", { required: "Name is required" })}
//                                 />
//                                 {errors.billingInfo?.userId?.name && <span className="text-myRed font-semibold">{errors.billingInfo.userId?.name.message}</span>}
//                             </div>
//                             <div className="flex flex-col w-full gap-1 ">
//                                 <label htmlFor="billingInfo.userId.email" className="text-sm">Email</label>
//                                 <input
//                                     type="email"
//                                     placeholder="example@doe.com"
//                                     className="text-input"
//                                     {...register("billingInfo.userId.email", { required: "Email is required" })}
//                                 />
//                                 {errors.billingInfo?.userId?.email && <span className="text-myRed font-semibold">{errors.billingInfo.userId?.email.message}</span>}
//                             </div>
//                         </div>
//                         <div className="flex flex-col w-full gap-1">
//                             <label htmlFor="billingInfo.additionalInfo" className="text-sm">Additional Information</label>
//                             <input
//                                 type="text"
//                                 placeholder="Gift message, Special delivery, Instructions, etc."
//                                 className="text-input"
//                                 {...register("billingInfo.anyMessage")}
//                             />
//                             {errors.billingInfo?.anyMessage && <span className="text-myRed font-semibold">{errors.billingInfo?.anyMessage.message}</span>}
//                         </div>
//                     </div>

//                     <div>
//                         <h1 className="mb-3 font-semibold text-lg mt-10">Shipping Information</h1>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="flex flex-col w-full gap-1">
//                                 <label htmlFor="shippingInfo.address" className="text-sm">Address</label>
//                                 <input
//                                     type="text"
//                                     placeholder="e.g. Khulshi, Nasirabad, Chattogram"
//                                     className="text-input"
//                                     {...register("shippingInfo.address", { required: "Address is required" })}
//                                 />
//                                 {errors.shippingInfo?.address && <span className="text-myRed font-semibold">{errors.shippingInfo?.address.message}</span>}
//                             </div>
//                             <div className="flex flex-col w-full gap-1">
//                                 <label htmlFor="shippingInfo.city" className="text-sm">City</label>
//                                 <input
//                                     type="text"
//                                     placeholder="e.g. Chattogram"
//                                     className="text-input"
//                                     {...register("shippingInfo.city", { required: "City is required" })}
//                                 />
//                                 {errors.shippingInfo?.city && <span className="text-myRed font-semibold">{errors.shippingInfo?.city.message}</span>}
//                             </div>
//                             <div className="flex flex-col w-full gap-1">
//                                 <label htmlFor="shippingInfo.state" className="text-sm">State</label>
//                                 <input
//                                     type="text"
//                                     placeholder="e.g. Chattogram"
//                                     className="text-input"
//                                     {...register("shippingInfo.state", { required: "State is required" })}
//                                 />
//                                 {errors.shippingInfo?.state && <span className="text-myRed font-semibold">{errors.shippingInfo?.state.message}</span>}
//                             </div>
//                             <div className="flex flex-col w-full gap-1">
//                                 <label htmlFor="shippingInfo.zipCode" className="text-sm">Zip code</label>
//                                 <input
//                                     type="number"
//                                     placeholder="e.g. 3582"
//                                     className="text-input"
//                                     {...register("shippingInfo.zipCode", { required: "Zip code is required" })}
//                                 />
//                                 {errors.shippingInfo?.zipCode && <span className="text-myRed font-semibold">{errors.shippingInfo?.zipCode.message}</span>}
//                             </div>
//                             <div className="flex flex-col w-full gap-1">
//                                 <label htmlFor="shippingInfo.country" className="text-sm">Country</label>
//                                 <input
//                                     type="text"
//                                     placeholder="e.g. Bangladesh"
//                                     className="text-input"
//                                     {...register("shippingInfo.country", { required: "Country is required" })}
//                                 />
//                                 {errors.shippingInfo?.country && <span className="text-myRed font-semibold">{errors.shippingInfo?.country.message}</span>}
//                             </div>
//                             <div className="flex flex-col w-full gap-1">
//                                 <label htmlFor="shippingInfo.mobile" className="text-sm">Mobile</label>
//                                 <input
//                                     type="tel"
//                                     placeholder="e.g. +8801610-195968"
//                                     className="text-input"
//                                     {...register("shippingInfo.mobile", { required: "Mobile is required" })}
//                                 />
//                                 {errors.shippingInfo?.mobile && <span className="text-myRed font-semibold">{errors.shippingInfo?.mobile.message}</span>}
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h1 className="mb-3 font-semibold text-lg mt-10">Payment Info</h1>
//                         <p className="text-sm font-semibold text-myRed">
//                             (I am using free tier of Stripe payment gateway as it's a personal project. There is some limitation of it, like user has to click on 'success' button to pay. When it will be a paid project, I will use paid tier of Stripe and everything will work like a charm. Thanks for understanding.)
//                         </p>
//                         <div className="mt-4">
//                             <input
//                                 type="radio"
//                                 id="stripe"
//                                 name="paymentMethod"
//                                 defaultChecked
//                             />
//                             <label htmlFor="stripe" className="ml-2 font-semibold text-sm">
//                                 Paying with Stripe
//                             </label>
//                         </div>
//                     </div>
//                 </form>
//             </main>

            // {/* Aside Section with the Submit Button */}
            // <aside className="section-grant col-span-7 md:col-span-2 p-4 md:p-8 relative ">
            //     <h1 className="mb-3 font-semibold text-lg">Order Summary</h1>
            //     {/* Order Summary Component */}
            //     <div className="space-y-4 mb-6 ">
            //         {
            //             cartItems?.map(item => <div key={item._id} className="text-sm flex items-center gap-3 " >
            //                 <div>
            //                     <img src={item.photo} alt="" />
            //                 </div>
            //                 <div>
            //                     <h1 className="font-semibold">{item.name} </h1>
            //                     <p><span>{item.quantity}</span> x <span>{item.price}</span> </p>
            //                 </div>
            //             </div> )
            //         }
            //     </div>

            //     <div className="text-sm space-y-1.5 ">
            //         <div className="flex items-center justify-between">
            //             <p>Sub-total</p>
            //             <p className="font-semibold" >{subtotal}.00</p>
            //         </div>
            //         <div className="flex items-center justify-between">
            //             <p>Tax</p>
            //             <p className="font-semibold">{tax.toFixed(2)}.00</p>
            //         </div>
            //         <div className="flex items-center justify-between">
            //             <p>Shipping</p>
            //             <p className="font-semibold">{shippingCharge.toFixed(2)}.00</p>
            //         </div>
            //         <div className="flex items-center justify-between">
            //             <p>Discount</p>
            //             <p className="font-semibold">{discount.toFixed(2)}.00</p>
            //         </div>
            //         <hr className="hr mt-3 " />
            //         <div className="flex items-center justify-between font-semibold ">
            //             <p>Total</p>
            //             <p>{finalTotal}.00</p>
            //         </div>
            //     </div>

            //     {/* Proceed to Payment button moved to the aside section */}
            //     <button
            //         // it will work only when all required fields are fill upped
            //         onClick={proceedToPaymentHandler}
            //         type="submit"
            //         form="checkout-form" // Link the button to the form by id
            //         className="primarybtn full-w-btn mt-6 absolute bottom-0 left-0 right4 "
            //     >
            //         Proceed to Payment →
            //     </button>
            // </aside>
//         </div>
//     );
// };

// export default CheckOutForm;




import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Order } from "../../types/types";
import { toast } from 'sonner';
import { useSelector } from "react-redux";
import { selectAuthenticatedUser } from "../../redux/reducers/userReducer";

const CheckOutForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(selectAuthenticatedUser)
    console.log("use id" , user._id)

    const cartItems = location.state.cartItems;
    const tax = location.state.tax;
    const shippingCharge = location.state.shippingCharge;
    const discount = location.state.discount;
    const subtotal = location.state.total;
    const finalTotal = location.state.finalTotal;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm<Order>();

    const submitHandler = async (formData) => {
        console.log("Form Data:", formData);
        navigate("/make-payment", {
            state: {
                billingInfo: { userId: user._id },
                shippingInfo: formData.shippingInfo,
                orderedItems: cartItems,
                tax, 
                shippingCharge, 
                discount,
                subtotal,
                total: finalTotal,
                status:"Processing"
            },
        });
    };

    const proceedToPaymentHandler = () => {
        // Check for required fields
        const requiredFields = [
            'billingInfo.userId.name',
            'billingInfo.userId.email',
            'shippingInfo.address',
            'shippingInfo.city',
            'shippingInfo.state',
            'shippingInfo.zipCode',
            'shippingInfo.country',
            'shippingInfo.mobile',
        ];

        // Check for errors
        let hasError = false;

        requiredFields.forEach((field) => {
            const fieldErrors = errors[field];
            if (!fieldErrors) {
                clearErrors(field); // Clear previous error if exists
            } else {
                hasError = true; // Set flag if there's an error
                setError(field, { type: "manual", message: fieldErrors.message || "This field is required" });
            }
        });

        // Show toast message if any required field is missing
        if (hasError) {
            toast.error("Please fulfill all the shipping info properly"); // Show single toast message
        } else {
            handleSubmit(submitHandler)(); // Proceed with form submission if no errors
        }
    };

    return (
        <div className="px-2 pt-8 pb-12 w-full md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-7 gap-4 ">
            {/* Main Form Section */}
            <main className="section-grant col-span-7 md:col-span-5 p-4 md:p-8 ">
                <form id="checkout-form" onSubmit={handleSubmit(submitHandler)}>
                    <div className="space-y-4">
                        <h1 className="mb-3 font-semibold text-lg">Billing Information</h1>
                        <div className="flex flex-col md:flex-row gap-4 w-full ">
                            <div className="flex flex-col w-full gap-1 ">
                                <label htmlFor="billingInfo.userId.name" className="text-sm">Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="text-input"
                                    {...register("billingInfo.userId.name", { required: "Name is required" })}
                                />
                                {errors.billingInfo?.userId?.name && <span className="text-myRed font-semibold">{errors.billingInfo.userId?.name.message}</span>}
                            </div>
                            <div className="flex flex-col w-full gap-1 ">
                                <label htmlFor="billingInfo.userId.email" className="text-sm">Email</label>
                                <input
                                    type="email"
                                    placeholder="example@doe.com"
                                    className="text-input"
                                    {...register("billingInfo.userId.email", { required: "Email is required" })}
                                />
                                {errors.billingInfo?.userId?.email && <span className="text-myRed font-semibold">{errors.billingInfo.userId?.email.message}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="billingInfo.additionalInfo" className="text-sm">Additional Information</label>
                            <input
                                type="text"
                                placeholder="Gift message, Special delivery, Instructions, etc."
                                className="text-input"
                                {...register("billingInfo.anyMessage")}
                            />
                            {errors.billingInfo?.anyMessage && <span className="text-myRed font-semibold">{errors.billingInfo?.anyMessage.message}</span>}
                        </div>
                    </div>

                    <div>
                        <h1 className="mb-3 font-semibold text-lg mt-10">Shipping Information</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="shippingInfo.address" className="text-sm">Address</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Khulshi, Nasirabad, Chattogram"
                                    className="text-input"
                                    {...register("shippingInfo.address", { required: "Address is required" })}
                                />
                                {errors.shippingInfo?.address && <span className="text-myRed font-semibold">{errors.shippingInfo?.address.message}</span>}
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="shippingInfo.city" className="text-sm">City</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Chattogram"
                                    className="text-input"
                                    {...register("shippingInfo.city", { required: "City is required" })}
                                />
                                {errors.shippingInfo?.city && <span className="text-myRed font-semibold">{errors.shippingInfo?.city.message}</span>}
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="shippingInfo.state" className="text-sm">State</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Chattogram"
                                    className="text-input"
                                    {...register("shippingInfo.state", { required: "State is required" })}
                                />
                                {errors.shippingInfo?.state && <span className="text-myRed font-semibold">{errors.shippingInfo?.state.message}</span>}
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="shippingInfo.zipCode" className="text-sm">Zip code</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 3582"
                                    className="text-input"
                                    {...register("shippingInfo.zipCode", { required: "Zip code is required" })}
                                />
                                {errors.shippingInfo?.zipCode && <span className="text-myRed font-semibold">{errors.shippingInfo?.zipCode.message}</span>}
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="shippingInfo.country" className="text-sm">Country</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Bangladesh"
                                    className="text-input"
                                    {...register("shippingInfo.country", { required: "Country is required" })}
                                />
                                {errors.shippingInfo?.country && <span className="text-myRed font-semibold">{errors.shippingInfo?.country.message}</span>}
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="shippingInfo.mobile" className="text-sm">Mobile</label>
                                <input
                                    type="tel"
                                    placeholder="e.g. +8801610-195968"
                                    className="text-input"
                                    {...register("shippingInfo.mobile", { required: "Mobile is required" })}
                                />
                                {errors.shippingInfo?.mobile && <span className="text-myRed font-semibold">{errors.shippingInfo?.mobile.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className="mb-3 font-semibold text-lg mt-10">Payment Info</h1>
                        <p className="text-sm font-semibold text-myRed">
                            (I am using free tier of Stripe payment gateway as it's a personal project. There is some limitation of it, like user has to click on 'success' button to pay. When it will be a paid project, I will use paid tier of Stripe and everything will work like a charm. Thanks for understanding.)
                        </p>
                        <div className="mt-4">
                            <input
                                type="radio"
                                id="stripe"
                                name="paymentMethod"
                                defaultChecked
                            />
                            <label htmlFor="stripe" className="ml-2 font-semibold text-sm">
                                Paying with Stripe
                            </label>
                        </div>
                    </div>
                </form>
            </main>

            {/* Aside Section with the Submit Button */}
            {/* <aside className="section-grant col-span-7 md:col-span-2 p-4 md:p-8 relative ">
                <h1 className="mb-3 font-semibold text-lg">Order Summary</h1>
                Order Summary Component
                <div className="space-y-4 mb-6 ">
                    {
                        cartItems?.map(item => <div key={item._id} className="text-sm flex items-center gap-3 " >
                            <div>
                                <img src={item.photo} alt="" />
                            </div>
                            <div>
                                <h1 className="font-semibold">{item.name} </h1>
                                <p className="text-gray-500 text-xs">Quantity: {item.quantity}</p>
                            </div>
                        </div>)
                    }
                    <div className="flex items-center justify-between">
                        <p>Subtotal</p>
                        <p className="font-semibold">{subtotal.toFixed(2)}.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Tax</p>
                        <p className="font-semibold">{tax.toFixed(2)}.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Shipping</p>
                        <p className="font-semibold">{shippingCharge.toFixed(2)}.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Discount</p>
                        <p className="font-semibold">{discount.toFixed(2)}.00</p>
                    </div>
                    <hr className="hr mt-3 " />
                    <div className="flex items-center justify-between font-semibold ">
                        <p>Total</p>
                        <p>{finalTotal}.00</p>
                    </div>
                </div>

                Proceed to Payment button moved to the aside section
                <button
                    onClick={proceedToPaymentHandler}
                    type="button" // Change type to button
                    className="primarybtn full-w-btn mt-6 absolute bottom-0 left-0 right-0"
                >
                    Proceed to Payment →
                </button>
            </aside> */}
            {/* Aside Section with the Submit Button */}
            <aside className="section-grant col-span-7 md:col-span-2 p-4 md:p-8 relative ">
                <h1 className="mb-3 font-semibold text-lg">Order Summary</h1>
                {/* Order Summary Component */}
                <div className="space-y-4 mb-6 ">
                    {
                        cartItems?.map(item => <div key={item._id} className="text-sm flex items-center gap-3 " >
                            <div>
                                <img src={item.photo} alt="" />
                            </div>
                            <div>
                                <h1 className="font-semibold">{item.name} </h1>
                                <p><span>{item.quantity}</span> x <span>{item.price}</span> </p>
                            </div>
                        </div>)
                    }
                </div>

                <div className="text-sm space-y-1.5 ">
                    <div className="flex items-center justify-between">
                        <p>Sub-total</p>
                        <p className="font-semibold" >{subtotal}.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Tax</p>
                        <p className="font-semibold">{tax.toFixed(2)}.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Shipping</p>
                        <p className="font-semibold">{shippingCharge.toFixed(2)}.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Discount</p>
                        <p className="font-semibold">{discount.toFixed(2)}.00</p>
                    </div>
                    <hr className="hr mt-3 " />
                    <div className="flex items-center justify-between font-semibold ">
                        <p>Total</p>
                        <p>{finalTotal}.00</p>
                    </div>
                </div>

                {/* Proceed to Payment button moved to the aside section */}
                <button
                    // it will work only when all required fields are fill upped
                    onClick={proceedToPaymentHandler}
                    type="submit"
                    form="checkout-form" // Link the button to the form by id
                    className="primarybtn full-w-btn mt-6 absolute bottom-0 left-0 right4 "
                >
                    Proceed to Payment →
                </button>
            </aside>


        </div>
    );
};

export default CheckOutForm;
