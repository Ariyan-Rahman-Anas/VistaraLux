import usePageTitle from "../../customHooks/usePageTitle";
import CheckOutForm from "./CheckOutForm";

const CheckOutPage = () => {
    usePageTitle("Checkout-Stripe")

    return  <CheckOutForm />
}
export default CheckOutPage