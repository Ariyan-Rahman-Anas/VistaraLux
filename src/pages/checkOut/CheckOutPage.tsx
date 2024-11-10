import usePageTitle from "../../customHooks/usePageTitle";
import CheckOutForm from "./CheckOutForm";

const CheckOutPage = () => {
    usePageTitle("Checkout")

    return  <CheckOutForm />
}
export default CheckOutPage