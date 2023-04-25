import React, { useState } from "react";
import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import {
  AiFillDelete,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Index() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`https://mycosmetic-backend.onrender.com/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <div className="container mx-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col lg:flex-row w-full items-start lg:items-center ">
            <div className="w-full lg:w-2/3 px-10 lg:px-20 sm:px-10">
              {/* cart */}
              <div className="mt-16">
                <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <p className="text-sm pl-2 leading-none">Back</p>
                </div>
              </div>
              {cartItems.length === 0 ? (
                <MessageBox>
                  Cart is empty. <Link to="/">Go Shopping</Link>
                </MessageBox>
              ) : (
                <div className=" items-center my-5 py-10 border-t border-gray-200">
                  {cartItems.map((item) => (
                    <React.Fragment key={item._id}>
                      <div className="w-1/4 ">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full mt-5 h-full object-center object-cover"
                        />
                      </div>
                      <div className="md:pl-3 md:w-3/4">
                        <div className="flex items-center justify-between w-full pt-1">
                          <p className="text-2xl font-semibold leading-none text-gray-800">
                            <Link to={`/product/${item.slug}`}>
                              {item.name}
                            </Link>
                          </p>
                          <div className="py-1  px-1 border border-gray-200 mr-6 focus:outline-none">
                            <button
                            className="mx-2"
                              onClick={() =>
                                updateCartHandler(item, item.quantity - 1)
                              }
                              disabled={item.quantity === 1}
                            >
                              <AiFillMinusCircle className="text-lg mt-1"/>
                            </button>{" "}
                            <span>{item.quantity}</span>{" "}
                            <button
                            className="mx-2"
                              onClick={() =>
                                updateCartHandler(item, item.quantity + 1)
                              }
                              disabled={item.quantity === item.countInStock}
                            >
                              <AiFillPlusCircle className="text-lg" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs leading-3 text-gray-600 pt-2">
                          Height: 10 inches
                        </p>
                        <p className="text-xs leading-3 text-gray-600 py-4">
                          Color: Black
                        </p>
                        <p className="w-96 text-xs leading-3 text-gray-600">
                          Composition: 100% calf leather
                        </p>
                        <div className="flex items-center justify-between pt-5 pr-6">
                          <div className="flex itemms-center">
                            <p className="text-md leading-3 underline text-gray-800 cursor-pointer">
                              Continue Shipping
                            </p>
                            <button
                              onClick={() => removeItemHandler(item)}
                              className="text-xl leading-3 underline  pl-5 cursor-pointer"
                            >
                              <AiFillDelete />
                            </button>
                          </div>
                          <p className="text-xl font-semibold leading-none text-gray-800">
                            ${item.price}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/3 ">
              {/* checkout */}
              <div className="flex flex-col md:h-screen px-14 py-16 justify-between overflow-y-auto">
                <div>
                  <p className="text-4xl font-black leading-9 text-gray-800">
                    Summary
                  </p>
                  <div className="flex items-center justify-between pt-16">
                    <p className="text-base leading-none text-gray-800">
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) :
                    </p>
                    <p className="text-base leading-none text-gray-800">
                      ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base leading-none text-gray-800">$30</p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800">Tax</p>
                    <p className="text-base leading-none text-gray-800">$0</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center pb-6 justify-between lg:pt-5 pt-16">
                    <p className="text-2xl leading-normal text-gray-800">
                      Total
                    </p>
                    <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                      ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) :
                      ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </p>
                  </div>
                  <button
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                    className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
