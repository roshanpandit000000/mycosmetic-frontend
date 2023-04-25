import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const OrderHistoryScreen = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `https://mycosmetic-backend.onrender.com/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <div>
        <div className="sm:px-6 w-full">
          <div className="px-4 md:px-10 py-4 md:py-7">
            <div className="flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Tasks
              </p>
            </div>
          </div>
          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div className="sm:flex items-center justify-between"></div>
            <div className="mt-7 overflow-x-auto">
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <table className="w-full whitespace-nowrap">
                  <tbody>
                    <tr className="h-16 border border-gray-100 rounded">
                      <td className>
                        <div className="flex items-center pl-5">
                          <p className="text-base font-bold leading-none text-gray-900 mr-2">
                            ID
                          </p>
                        </div>
                      </td>

                      <td className="pl-5">
                        <div className="flex items-center">
                          <p className="leading-none ml-2 text-base font-bold text-gray-900">
                            DATE
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <p className=" leading-none  ml-2 text-base font-bold text-gray-900">
                            TOTAL
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <p className=" leading-none  ml-2 text-base font-bold text-gray-900">
                            PAID
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <p className="py-3 px-3  leading-none text-base font-bold text-gray-900">
                          DELIVERED
                        </p>
                      </td>
                      <td className="pl-4">
                        <p className=" py-3 px- leading-none text-base font-bold text-gray-900">
                          ACTIONS
                        </p>
                      </td>
                    </tr>
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="h-16 border border-gray-100 rounded"
                      >
                        <td className>
                          <div className="flex items-center pl-5">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">
                              {order._id}
                            </p>
                          </div>
                        </td>

                        <td className="pl-5">
                          <div className="flex items-center">
                            <p className="text-sm leading-none text-gray-600 ml-2">
                              {order.createdAt.substring(0, 10)}
                            </p>
                          </div>
                        </td>
                        <td className="pl-5">
                          <div className="flex items-center">
                            <p className="text-sm leading-none text-gray-600 ml-2">
                              {order.totalPrice.toFixed(2)}
                            </p>
                          </div>
                        </td>
                        <td className="pl-5">
                          <div className="flex items-center">
                            <p className="text-sm leading-none text-gray-600 ml-2">
                              {order.isPaid
                                ? order.paidAt.substring(0, 10)
                                : "No"}
                            </p>
                          </div>
                        </td>
                        <td className="pl-5">
                          <p className="py-3 px-3 text-sm text-gray-600 leading-none ">
                            {order.isDelivered
                              ? order.deliveredAt.substring(0, 10)
                              : "No"}
                          </p>
                        </td>
                        <td className="pl-4">
                          <button
                            onClick={() => {
                              navigate(`/order/${order._id}`);
                            }}
                            className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="h-3" />
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <style>
          {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
        </style>
      </div>
    </>
  );
};

export default OrderHistoryScreen;
