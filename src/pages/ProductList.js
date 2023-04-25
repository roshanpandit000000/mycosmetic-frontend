import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Store } from "../Store";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
};

const ProductList = () => {
  const [
    {
      loading,
      error,
      products,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://mycosmetic-backend.onrender.com/api/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {}
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm("Are you sure to create?")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          "https://mycosmetic-backend.onrender.com/api/products",
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success("product created successfully");
        dispatch({ type: "CREATE_SUCCESS" });
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    }
  };

  const deleteHandler = async (product) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`https://mycosmetic-backend.onrender.com/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("product deleted successfully");
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
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-16">
        {loadingCreate && <LoadingBox></LoadingBox>}
        {loadingDelete && <LoadingBox></LoadingBox>}
        <div className="sm:flex items-center justify-between"></div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <button
              type="button"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              onClick={createHandler}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Create Product
              </span>
            </button>
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
                        Name
                      </p>
                    </div>
                  </td>
                  <td className="pl-5">
                    <div className="flex items-center">
                      <p className=" leading-none  ml-2 text-base font-bold text-gray-900">
                        Price
                      </p>
                    </div>
                  </td>
                  <td className="pl-5">
                    <div className="flex items-center">
                      <p className=" leading-none  ml-2 text-base font-bold text-gray-900">
                        Category
                      </p>
                    </div>
                  </td>
                  <td className="pl-5">
                    <p className="py-3 px-3  leading-none text-base font-bold text-gray-900">
                      Brand
                    </p>
                  </td>
                  <td className="pl-4">
                    <p className=" py-3 px- leading-none text-base font-bold text-gray-900">
                      ACTIONS
                    </p>
                  </td>
                </tr>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="h-16 border border-gray-100 rounded"
                  >
                    <td className>
                      <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">
                          {product._id}
                        </p>
                      </div>
                    </td>

                    <td className="pl-5">
                      <div className="flex items-center">
                        <p className="text-sm leading-none text-gray-600 ml-2">
                          {product.name}
                        </p>
                      </div>
                    </td>
                    <td className="pl-5">
                      <div className="flex items-center">
                        <p className="text-sm leading-none text-gray-600 ml-2">
                          {product.price}
                        </p>
                      </div>
                    </td>
                    <td className="pl-5">
                      <div className="flex items-center">
                        <p className="text-sm leading-none text-gray-600 ml-2">
                          {product.category}
                        </p>
                      </div>
                    </td>
                    <td className="pl-5">
                      <p className="py-3 px-3 text-sm text-gray-600 leading-none ">
                        {product.brand}
                      </p>
                    </td>
                    <td className="pl-4">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/product/${product._id}`)
                        }
                        className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                      >
                        Edit
                      </button>
                      &nbsp;
                    <button
                      type="button"
                      className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                    </td>
                  </tr>
                ))}
                <tr className="h-3" />
              </tbody>
            </table>
            <div className="mt-10">
              {[...Array(pages).keys()].map((x) => (
                <Link
                  className={
                    x + 1 === Number(page)
                      ? "mx-3 border border-gray-500 bg-gray-100 shadow-md px-4 rounded-lg py-2"
                      : "mx-3 border border-gray-500 bg-gray-100 shadow-md px-4 rounded-lg py-2"
                  }
                  key={x + 1}
                  to={`/admin/products?page=${x + 1}`}
                >
                  {x + 1}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
