import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

const OrderListScreen = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, orders, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`https://mycosmetic-backend.onrender.com/api/orders`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const deleteHandler = async (order) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        dispatch({ type: "DELETE_REQUEST" });
        await axios.delete(`https://mycosmetic-backend.onrender.com/api/orders/${order._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("order deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  return (
    <>
    <Helmet>
        <title>Orders</title>
      </Helmet>
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-16">
        <div className="sm:flex items-center justify-between"></div>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
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
                        User
                      </p>
                    </div>
                  </td>
                  <td className="pl-5">
                    <div className="flex items-center">
                      <p className=" leading-none  ml-2 text-base font-bold text-gray-900">
                        Date
                      </p>
                    </div>
                  </td>
                  <td className="pl-5">
                    <div className="flex items-center">
                      <p className=" leading-none  ml-2 text-base font-bold text-gray-900">
                        Total
                      </p>
                    </div>
                  </td>
                  <td className="pl-5">
                    <p className="py-3 px-3  leading-none text-base font-bold text-gray-900">
                      Paid
                    </p>
                  </td>
                  <td className="pl-4">
                    <p className=" py-3 px- leading-none text-base font-bold text-gray-900">
                      Deliverd
                    </p>
                  </td>
                  <td className="pl-4">
                    <p className=" py-3 px- leading-none text-base font-bold text-gray-900">
                      Actions
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
                          {order.user ? order.user.name : "DELETED USER"}
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
                      <p className="py-3 px-3 text-sm text-gray-600 leading-none ">
                        {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                      </p>
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
                        type="button"
                        onClick={() => {
                          navigate(`/order/${order._id}`);
                        }}
                        className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                      >
                        Detail
                      </button>
                      &nbsp;
                      <button
                        type="button"
                        onClick={() => deleteHandler(order)}
                        className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="h-3" />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderListScreen;
