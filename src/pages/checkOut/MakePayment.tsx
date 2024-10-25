import { useEffect, useState } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'sonner';
import { Link, useLocation } from 'react-router-dom';
import { useCreateNewOrderMutation } from '../../redux/api/OrderApi';
import { useDispatch } from 'react-redux';
import { resetCart } from '../../redux/reducers/cartReducer';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentSucceeded, setPaymentSucceeded] = useState(false);

    const location = useLocation()
    const dispatch = useDispatch()


    const billingInfo = location.state?.billingInfo
    const shippingInfo = location.state?.shippingInfo
    const orderedItems = location.state?.orderedItems
    const tax = location.state?.tax
    const shippingCharge = location.state?.shippingCharge
    const discount = location.state?.discount
    const subtotal = location.state?.subtotal
    const total = location.state?.total
    const status = "Processing"

    const order = {
        billingInfo,
        orderedItems,
        shippingInfo,
        tax,
        shippingCharge,
        discount,
        subtotal,
        total,
        status
    }

    const [createNewOrder, {data, isSuccess, error }] = useCreateNewOrderMutation()

    // Handle form submission for payment
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;
        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // return_url: 'http://localhost:5173/make-payment',
                return_url: window.location.origin,
            },
            redirect:"if_required"
        });

        if (error) {
            setIsProcessing(false);
            setErrorMessage(error?.message);
            toast.error(`Payment failed: ${error.message}`);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setPaymentSucceeded(true);
            toast.success("Payment successful!");

            // Call createNewOrder after successful payment
            try {
                await createNewOrder(order); // Unwraps the promise to handle response directly
                dispatch(resetCart())
                toast.success("Order placed successfully!");

            } catch (err) {
                console.error("Failed to create order:", err);
                toast.error("Failed to create order");
            }
        }

        setIsProcessing(false);
    };

    useEffect(() => {
        if (error?.data) {
            toast.error(error.data?.message)
        }

        if (isSuccess) {
            toast.success(data?.message)
        }
    }, [data?.message, error?.data, isSuccess])


    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='w-[95%] md:w-[80%] mx-auto  flex flex-col md:flex-row items-start  justify-between gap-10 '>
                <div className='w-full md:w-[50%]'>
                    <Link to={"/"} className='font-bold text-3xl text-myBlue italic ' >VistaraLux</Link>
                    <p className='mt-4 md:mt-8 font-semibold text-lg '>You're just one step away! </p>
                    <p>Complete your payment now to secure your order and enjoy a seamless shopping experience!</p>
                    <p className='mt-3 font-semibold text-gray-600 '>Your payment amount</p>
                    <p className='text-5xl font-semibold ' >${total}.00</p>
                </div>
                <form onSubmit={handleSubmit} className='p-8 w-full md:w-[50%] section-grant flex flex-col  items-center justify-center'>
                    <div className='w-full'>
                        <PaymentElement />
                    </div>

                    {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message if any */}

                    <button
                        type="submit"
                        className="primary-btn mt-6 w-full"
                        disabled={isProcessing || !stripe || paymentSucceeded}
                    >
                        {isProcessing ? (
                            <div className='flex items-center justify-center gap-2'>
                                <div className="spinner"></div>
                                <p>Processing..</p>
                            </div>
                        ) : (
                            "Pay Now"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

const MakePayment = () => {
    const location = useLocation()

    const billingInfo = location.state?.billingInfo
    const shippingInfo = location.state?.shippingInfo
    const orderedItems = location.state?.orderedItems
    const tax = location.state?.tax
    const shippingCharge = location.state?.shippingCharge
    const discount = location.state?.discount
    const subtotal = location.state?.subtotal
    const total = location.state?.total
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Fetch the clientSecret from the server
        fetch("http://localhost:3001/api/v1/payment/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: total }), // Replace with the actual amount
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setClientSecret(data.clientSecret)
            })
            .catch((err) => {
                toast.error("Failed to fetch clientSecret");
                console.log("Error fetching clientSecret:", err);
            });
    }, [total]);

    const options = {
        clientSecret,
    };

    return clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    ) : (
        <div className='flex items-center justify-center'>
            <div className="spinner"></div>
        </div>
    );
};
export default MakePayment;







// const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements)  return;

//     setIsProcessing(true);

//     const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//             return_url: 'http://localhost:5173/products',
//         },
//     });

//     if (error) {
//         setErrorMessage(error.message);
//         toast.error(`Payment failed: ${error.message}`);
//     } else if (paymentIntent && paymentIntent.status === 'succeeded') {
//         setPaymentSucceeded(true);
//         toast.success("Payment successful!");
//     }

//     setIsProcessing(false);
// };