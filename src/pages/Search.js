import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { MdRemoveShoppingCart } from "react-icons/md";
import { getError } from "../utils";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { useContext } from "react";

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
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: "रु1 to रु50",
    value: "1-50",
  },
  {
    name: "रु51 to रु200",
    value: "51-200",
  },
  {
    name: "रु201 to रु1000",
    value: "201-1000",
  },
];

const Search = () => {
  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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

  const [showFilters, setShowfilters] = useState(true);
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://mycosmetic-backend.onrender.com/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`https://mycosmetic-backend.onrender.com/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <>
      <div className="2xl:container 2xl:mx-auto py-5">
        <div
          id="filterSection"
          className={
            "relative md:py-10 lg:px-20 md:px-6 py-9 px-8 bg-gray-50 sm:px-8 w-full " +
            (showFilters ? "block" : "hidden")
          }
        >
          {/* Cross button Code  */}
          <div
            onClick={() => setShowfilters(false)}
            className=" cursor-pointer absolute right-0 top-0 md:py-10 lg:px-20 md:px-6 py-9 px-4"
          >
            <svg
              className=" lg:w-6 lg:h-6 w-4 h-4"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 1L1 25"
                stroke="#1F2937"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 1L25 25"
                stroke="#27272A"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Colors Section */}
          <div>
            <div className=" flex space-x-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 3H15C14.4696 3 13.9609 3.21071 13.5858 3.58579C13.2107 3.96086 13 4.46957 13 5V17C13 18.0609 13.4214 19.0783 14.1716 19.8284C14.9217 20.5786 15.9391 21 17 21C18.0609 21 19.0783 20.5786 19.8284 19.8284C20.5786 19.0783 21 18.0609 21 17V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3Z"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.9994 7.35022L10.9994 5.35022C10.6243 4.97528 10.1157 4.76465 9.58539 4.76465C9.05506 4.76465 8.54644 4.97528 8.17139 5.35022L5.34339 8.17822C4.96844 8.55328 4.75781 9.06189 4.75781 9.59222C4.75781 10.1225 4.96844 10.6312 5.34339 11.0062L14.3434 20.0062"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.3 13H5C4.46957 13 3.96086 13.2107 3.58579 13.5858C3.21071 13.9609 3 14.4696 3 15V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H17"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 17V17.01"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
                Categorys
              </p>
            </div>
            <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
              <div className=" flex space-x-2 md:justify-center md:items-center items-center justify-start ">
                <div className=" w-4 h-4 rounded-full bg-white shadow"></div>
                <Link
                  className={"all" === category ? "font-bold" : ""}
                  to={getFilterUrl({ category: "all" })}
                >
                  <p className=" text-base leading-4 text-gray-600 font-normal">
                    Any
                  </p>
                </Link>
              </div>
              {categories.map((c) => (
                <div
                  key={c}
                  className=" flex space-x-2 md:justify-center md:items-center items-center justify-start "
                >
                  <div className=" w-4 h-4 rounded-full bg-white shadow"></div>
                  <Link
                    className={c === category ? "text-bold" : ""}
                    to={getFilterUrl({ category: c })}
                  >
                    <p className=" text-base leading-4 text-gray-600 font-normal">
                      {c}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

          {/* Price Section */}
          <div>
            <div className=" flex space-x-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5C3 13.0899 5.91015 16 9.5 16Z"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 10H12C10.8954 10 10 10.8954 10 12V19C10 20.1046 10.8954 21 12 21H19C20.1046 21 21 20.1046 21 19V12C21 10.8954 20.1046 10 19 10Z"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
                Price
              </p>
            </div>
            <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
              <div className=" flex space-x-2 md:justify-center md:items-center items-center justify-start ">
                <div className=" w-4 h-4 rounded-full bg-white shadow"></div>
                <Link
                  className={"all" === price ? "text-bold" : ""}
                  to={getFilterUrl({ price: "all" })}
                >
                  <p className=" text-base leading-4 text-gray-600 font-normal">
                    Any
                  </p>
                </Link>
              </div>
              {prices.map((p) => (
                <div
                  key={p.value}
                  className=" flex space-x-2 md:justify-center md:items-center items-center justify-start "
                >
                  <div className=" w-4 h-4 rounded-full bg-white shadow"></div>
                  <Link
                    to={getFilterUrl({ price: p.value })}
                    className={p.value === price ? "text-bold" : ""}
                  >
                    <p className=" text-base leading-4 text-gray-600 font-normal">
                      {p.name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Size Section */}

          {/* Collection Section */}

          <div className="px-0 mt-10 w-full md:w-auto md:mt-0 md:absolute md:right-0 md:bottom-0 md:py-10 lg:px-20 md:px-6"></div>
        </div>
      </div>

      <div className=" 2xl:container 2xl:mx-auto">
        <div className=" bg-gray-50 text-center lg:py-10 md:py-8 py-6">
          <p className=" w-10/12 mx-auto md:w-full  font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-center text-gray-800">
            Summer Collection Vol-1
          </p>
        </div>
        <div className=" py-6 lg:px-20 md:px-6 px-4">
        <p className=" font-normal text-sm leading-3 text-gray-600 ">
            Home / Shop by Category / Women
          </p>
          <hr className=" w-full bg-gray-200 my-6" />

          <div className=" flex justify-between ">
            <button
              onClick={() => setShowfilters(!showFilters)}
              className=" flex space-x-3 justify-center items-center"
            >
              <svg
                className=" cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 7.5H20.25"
                  stroke="#1F2937"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M3.75 12H20.25"
                  stroke="#1F2937"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M3.75 16.5H20.25"
                  stroke="#1F2937"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
              </svg>
              <p className=" font-normal text-base leading-4 text-gray-800">
                Filter
              </p>
            </button>
            <div>
              <select
                value={order}
                onChange={(e) => {
                  navigate(getFilterUrl({ order: e.target.value }));
                }}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
                <option value="toprated">Avg. Customer Reviews</option>
              </select>
            </div>
          </div>
          <div className="pt-5">
            <p className=" cursor-pointer hover:underline duration-100 font-normal text-base leading-4 text-gray-600">
            {countProducts === 0 ? "No" : countProducts} Results
            {query !== "all" && " : " + query}
            {category !== "all" && " : " + category}
            {price !== "all" && " : Price " + price}
            {query !== "all" ||
            category !== "all" ||
            price !== "all" ? (
              <button variant="light" onClick={() => navigate("/search")}>
                <i className="fas fa-times-circle"></i>
              </button>
            ) : null}
            </p>
          </div>
          {!products || products.length === 0 ? (
            <MessageBox>No Product Found</MessageBox>
          ) : (
            // render your products here
            <div className=" grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-2 lg:gap-y-12 lg:gap-x-5 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <MessageBox color="failure">{error}</MessageBox>
              ) : (
                products.map((product) => (
                  <div
                    key={product.slug}
                    className="group relative px-3 lg:px-3 sm:px-3 "
                  >
                    <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75 lg:aspect-none border-2 border-gray-200">
                      <Link to={`/product/${product.slug}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </Link>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <Link to={`/product/${product.slug}`}>
                            <span aria-hidden="true" className="absolute " />
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        <strong>${product.price}</strong>
                      </p>
                    </div>
                    <div>
                      {product.countInStock === 0 ? (
                        <button className="mx- my-1 flex items-center bg-gray-100 transition duration-150 ease-in-out rounded border border-gray-300 text-gray-600 pl-2 pr-4 py-1 text-sm">
                          <span className="h-4 w-4 mr-2" disabled>
                            <MdRemoveShoppingCart />
                          </span>
                          Stock Out
                        </button>
                      ) : (
                        <button
                          onClick={() => addToCartHandler(product)}
                          className="mx- my-1 flex items-center bg-gray-100 transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-gray-300 text-gray-600 pl-2 pr-4 py-1 text-sm"
                        >
                          <span className="h-4 w-4 mr-2">
                            <BsFillCartFill />
                          </span>
                          Cart
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          <div className=" flex justify-center items-center mt-16">
            {[...Array(pages).keys()].map((x) => (
              <Link
                key={x + 1}
                className="mx-3 border border-gray-500 bg-gray-100 shadow-md px-4 rounded-lg py-2"
                to={getFilterUrl({ page: x + 1 })}
              >
                <button
                  className={Number(page) === x + 1 ? "text-bold" : ""}
                  variant="light"
                >
                  {x + 1}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
