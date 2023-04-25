import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddressScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [number, setNumber] = useState(shippingAddress.number || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || "");
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
        number,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
        number, 
      })
    );
    navigate("/payment");
  };

  return (
    <>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <div className="overflow-y-hidden">
        <form onSubmit={submitHandler}>
          <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
            <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
              <div className="flex w-full  flex-col justify-start items-start">
                <div className>
                  <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                    Check out
                  </p>
                </div>
                <div className="mt-2">
                  <a
                    href="#"
                    className="text-base leading-4 underline  hover:text-gray-800 text-gray-600"
                  >
                    Back to my bag
                  </a>
                </div>
                <div className="mt-12">
                  <p className="text-xl font-semibold leading-5 text-gray-800">
                    Shipping Details
                  </p>
                </div>

                <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                  <input
                    className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                  />
                  <input
                    className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                    type="text"
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                  <input
                    className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                    type="text"
                    placeholder="city"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                  <input
                    className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                    type="text"
                    placeholder="Postal Code"
                    onChange={(e) => setPostalCode(e.target.value)}
                    value={postalCode}
                  />
                  <input
                    className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                    type="text"
                    placeholder="Country"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  />

                  <input
                    className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full"
                    type="text"
                    placeholder="Phone Number"
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                  />
                </div>
                <button
                  type="submit"
                  className="focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800"
                >
                  Proceed to payment
                </button>

                <div className="mt-4 flex justify-start items-center w-full">
                  <a
                    href="javascript:void(0)"
                    className="text-base leading-4 underline focus:outline-none focus:text-gray-500  hover:text-gray-800 text-gray-600"
                  >
                    Back to my bag
                  </a>
                </div>
              </div>

              <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-2 md:p-5">
                <img
                  src="https://i.ibb.co/wMd2Q4B/new.png"
                  alt="Purple flowers on a book"
                  className="md:w-full sm:w-1/2 w-full"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShippingAddressScreen;
