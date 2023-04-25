import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Helmet } from "react-helmet-async";
import { RxCross1 } from "react-icons/rx";
import { Dropdown } from "flowbite-react";

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

const SearchScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
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

  const [showFilters, setShowfilters] = useState(true);

  return (
    <>
      {/* filter */}

      <div className="2xl:container 2xl:mx-auto">
        <div className=" md:py-12 lg:px-20 md:px-6 py-9 px-4">
          {/*  filters Button (md and plus Screen) */}

          {/* Filters Button (Small Screen)  */}

          <button
            onClick={() => setShowfilters(!showFilters)}
            className="cursor-pointer mt-6 block sm:hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2 w-full bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center"
          >
            <svg
              className=" mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 4V8"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 12V20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 4V14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18V20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 4V5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 9V20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Filters
          </button>
        </div>

        <div
          id="filterSection"
          className={
            "relative md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full " +
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

          {/* Material Section */}
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

          <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

          {/* Size Section */}
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
                <p className=" text-base leading-4 text-gray-600 font-normal">
                  {countProducts === 0 ? "No" : countProducts} Results
                  {query !== "all" && " : " + query}
                  {category !== "all" && " : " + category}
                  {price !== "all" && " : Price " + price}
                  {query !== "all" || category !== "all" || price !== "all" ? (
                    <button variant="light" onClick={() => navigate("/search")}>
                      <RxCross1 />
                    </button>
                  ) : null}
                </p>
              </div>
            </div>
          </div>

          <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

          {/* Collection Section */}
        </div>
      </div>

      {/* product render */}

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

          <div className=" flex justify-between items-center">
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

            <p className=" cursor-pointer hover:underline duration-100 font-normal text-base leading-4 text-gray-600">
              Showing 18 products
            </p>
            <Dropdown
              label=" Sort by"
              value={order}
              onChange={(e) => {
                navigate(getFilterUrl({ order: e.target.value }));
              }}
              dismissOnClick={false}
            >
              <Dropdown.Item value="newest">Newest Arrivals</Dropdown.Item>
              <Dropdown.Item value="lowest">Price: Low to High</Dropdown.Item>
              <Dropdown.Item value="highest">Price: High to Low</Dropdown.Item>
              <Dropdown.Item value="toprated">
                Avg. Customer Reviews
              </Dropdown.Item>
            </Dropdown>
          </div>
         
          <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox color="failure">{error}</MessageBox>
            ) : (
              products.map((product) => (
                <div key={product.slug} className="relative group">
                  <div className=" flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                  <Link to={`/product/${product.slug}`}>
                    <img
                      className=" w-full"
                      src={product.image}
                      alt={product.name}
                    />
                  </Link>
                  <div className=" absolute bottom-0 p-8 w-full opacity-0 group-hover:opacity-100">
                    <button className=" font-medium text-base leading-4 text-gray-800 bg-white py-3 w-full">
                      Add to bag
                    </button>
                    <Link to={`/product/${product.slug}`}>
                      <button className=" bg-transparent font-medium text-base leading-4 border-2 border-white py-3 w-full mt-2 text-white">
                        Quick View
                      </button>
                    </Link>
                  </div>
                  <p className=" font-normal text-xl leading-5 text-gray-800 md:mt-6 mt-4">
                    <Link to={`/product/${product.slug}`}>{product.name}</Link>
                  </p>
                  <p className=" font-semibold text-xl leading-5 text-gray-800 mt-4">
                    <strong>${product.price}</strong>
                  </p>
                  <p className=" font-normal text-base leading-4 text-gray-600 mt-4">
                    {product.color}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className=" flex justify-center items-center">
            {[...Array(pages).keys()].map((x) => (
              <Link
                key={x + 1}
                className="mx-1"
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

export default SearchScreen;
