import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";

const PaymentMethodScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <div className="mx-auto py-12 flex justify-center overflow-hidden">
        {/* Code block starts */}
        <form onSubmit={submitHandler}>
          <div className="flex items-center py-2">
            <div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
              <input
                checked={paymentMethodName === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                id="PayPal"
                label="PayPal"
                value="PayPal"
                type="radio"
                name="radio"
                className="checkbox appearance-none focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
              />
              <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1" />
            </div>
            <p className="ml-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100">
              Paypal
            </p>
          </div>
          {/* Code block ends */}
          {/* Code block starts */}
          <div className="flex items-center  py-3">
            <div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
              <input
                checked={paymentMethodName === "RayzorPay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                id="RayzorPay"
                label="RayzorPay"
                value="RayzorPay"
                type="radio"
                name="radio"
                className="checkbox appearance-none focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
              />
              <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1" />
            </div>
            <p className="ml-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100">
              Rayzore Pay
            </p>
          </div>
          {/* Code block ends */}
          {/* Code block starts */}
          <div className="flex items-center py-3">
            <div className="rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
              <input
                checked={paymentMethodName === "Cash on delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                id="Cash on delivery"
                label="Cash on delivery"
                value="Cash on delivery"
                type="radio"
                name="radio"
                className="checkbox appearance-none focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
              />
              <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1" />
            </div>
            <p className="ml-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100">
              Cash On delivery
            </p>
          </div>

          {/* Code block Start */}
          <div className="flex flex-wrap items-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Continue
            </button>
          </div>
        </form>

        {/* Code block ends */}
        <style>
          {`  .checkbox:checked {
                        border: none;
                    }
                    .checkbox:checked + .check-icon {
                        display: flex;
                    }`}
        </style>
      </div>
    </>
  );
};

export default PaymentMethodScreen;
