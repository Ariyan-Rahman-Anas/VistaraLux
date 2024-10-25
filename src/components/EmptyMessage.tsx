import { Link } from "react-router-dom";
import emptyCart from "./../assets/images/emptyCart.svg";

interface EmptyMessageProps {
  btnText: string;
  redirectTo: string;
  message: string;
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({ btnText, redirectTo, message }) => {
  return (
    <div className="flex items-center justify-center text-center min-h-[85vh] ">
      <div className="space-y-2">
        <div className="w-1/4 mx-auto ">
          <img src={emptyCart} alt="your cart is empty" className="w-full h-full" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Oops!</h1>
          <p className="text-base font-semibold mb-4">{message}.</p>
          <Link to={redirectTo} className="primary-btn">
            {btnText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyMessage;