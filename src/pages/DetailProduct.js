import React, { useState } from "react";
// import CandiesGums from "../components/Categorys/Candies & Gums";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "flowbite-react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";
import DetailSubProduct from "../components/DetailSubProduct";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const DetailProduct = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `https://mycosmetic-backend.onrender.com/api/products/slug/${slug}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(
      `https://mycosmetic-backend.onrender.com/api/products/${product._id}`
    );
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox color="failure">{error}</MessageBox>
  ) : (
    <>
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
        <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
          {/* <!-- Description Div --> */}

          <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
            <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
              Home / Furniture / Wooden Stool
            </p>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
              {product.name}
            </h2>
            <div className=" flex flex-row justify-between  mt-5">
              <div className=" flex flex-row space-x-3">
                <svg
                  className=" cursor-pointer"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                    fill="#1F2937"
                  />
                </svg>
                <svg
                  className=" cursor-pointer"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                    fill="#1F2937"
                  />
                </svg>
                <svg
                  className=" cursor-pointer"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                    fill="#1F2937"
                  />
                </svg>
                <svg
                  className=" cursor-pointer"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                    fill="#1F2937"
                  />
                </svg>
                <svg
                  className=" cursor-pointer"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20ZM9.99976 15.1C10.1601 15.0959 10.3186 15.1338 10.4598 15.21L14.2298 17.21L13.5098 13C13.4818 12.8392 13.4936 12.6741 13.5442 12.5189C13.5947 12.3638 13.6825 12.2234 13.7998 12.11L16.7998 9.17996L12.5998 8.55996C12.4457 8.52895 12.3012 8.46209 12.1778 8.3648C12.0545 8.2675 11.9558 8.14251 11.8898 7.99996L9.99976 4.24996L8.10976 7.99996C8.03741 8.14366 7.93145 8.26779 7.80089 8.3618C7.67032 8.45581 7.51899 8.51692 7.35976 8.53996L3.15976 9.15996L6.15976 12.09C6.27704 12.2034 6.36478 12.3438 6.41533 12.4989C6.46588 12.6541 6.4777 12.8192 6.44976 12.98L5.72976 17.14L9.49976 15.14C9.65951 15.0806 9.83261 15.0667 9.99976 15.1Z"
                    fill="#1F2937"
                  />
                </svg>
              </div>
              <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer">
                22 reviews
              </p>
            </div>

            <p className=" font-normal text-base leading-6 text-gray-600 mt-7">
              {product.description}{" "}
            </p>
            <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">
              Rupee {product.price}/-
            </p>

            <div className="mt-5 ">
              {product.countInStock > 0 ? (
                <Badge color="warning">In Stock</Badge>
              ) : (
                <Badge color="warning">Out Of Stock</Badge>
              )}
            </div>
            {product.countInStock > 0 && (
              <button
                onClick={addToCartHandler}
                className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-12 mt-6"
              >
                Add to Cart
              </button>
            )}
          </div>

          <div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4 grid ">
            <div className=" w-full lg:w-9/12 lg:ml-5 flex justify-center items-center">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={selectedImage || product.image}
                  alt={product.image}
                />
              </div>
            </div>

            <div className=" grid grid-cols-5 gap-4">
              {[product.image, ...product.images].map((x) => (
                <div key={x} className=" flex justify-center items-center py-">
                  <button
                    className="thumbnail"
                    type="button"
                    variant="light"
                    onClick={() => setSelectedImage(x)}
                  >
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={x}
                      alt="product"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto container my-8 lg:mt-24">
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 border">
            <div className="flex justify-center w-full lg:border-r border-gray-300 py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="69"
                viewBox="0 0 64 69"
                fill="none"
              >
                <path
                  d="M31.5 37C41.165 37 49 29.165 49 19.5C49 9.83502 41.165 2 31.5 2C21.835 2 14 9.83502 14 19.5C14 29.165 21.835 37 31.5 37Z"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2 67V61C2 57.8174 4.10714 54.7652 7.85786 52.5147C11.6086 50.2643 16.6957 49 22 49H42C47.3043 49 52.3914 50.2643 56.1421 52.5147C59.8929 54.7652 62 57.8174 62 61V67"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="text-gray-800 pl-12 w-1/2">
                <h1 className="font-bold text-2xl lg:text-4xl tracking-1px">450</h1>
                <h2 className="text-base lg:text-lg mt-4 leading-8 tracking-wide">
                  Happy Clients.
                </h2>
              </div>
            </div>
            <div className="flex justify-center w-full lg:border-r border-gray-300 py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="72"
                height="57"
                viewBox="0 0 72 57"
                fill="none"
              >
                <path
                  d="M54.9999 54.9998C59.1815 54.9998 62.5713 51.6099 62.5713 47.4283C62.5713 43.2468 59.1815 39.8569 54.9999 39.8569C50.8183 39.8569 47.4285 43.2468 47.4285 47.4283C47.4285 51.6099 50.8183 54.9998 54.9999 54.9998Z"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M39.8571 47.4285H9.57142H2V5.78571C2 4.78168 2.39885 3.81877 3.10881 3.10881C3.81877 2.39885 4.78168 2 5.78571 2H39.8571V24.7142M39.8571 47.4285V24.7142M39.8571 47.4285H62.5713H70.1427V24.7142M24.7142 47.4285H47.4285M70.1427 24.7142H39.8571M70.1427 24.7142L58.7856 5.78571H39.8571"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M20.9285 13.3569V28.4998M13.3571 20.9283H28.5H13.3571Z"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M17.1427 54.9998C21.3243 54.9998 24.7142 51.6099 24.7142 47.4283C24.7142 43.2468 21.3243 39.8569 17.1427 39.8569C12.9612 39.8569 9.57133 43.2468 9.57133 47.4283C9.57133 51.6099 12.9612 54.9998 17.1427 54.9998Z"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="text-gray-800 w-1/2 pl-12">
                <h1 className="font-bold text-2xl lg:text-4xl tracking-1px">10+</h1>
                <h2 className="text-base lg:text-lg mt-4 leading-8 tracking-wide">
                  Insurance Solutions
                </h2>
              </div>
            </div>
            <div className="flex justify-center w-full lg:border-r border-gray-300 py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
              >
                <path
                  d="M36 70C54.7777 70 70 54.7777 70 36C70 17.2223 54.7777 2 36 2C17.2223 2 2 17.2223 2 36C2 54.7777 17.2223 70 36 70Z"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M36 17.1108V35.9997L47.3333 47.3331"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="text-gray-800 w-1/2 pl-12">
                <h1 className="font-bold text-2xl lg:text-4xl tracking-1px">35</h1>
                <h2 className="text-base lg:text-lg mt-4 leading-8 tracking-wide">
                  Years of Experience
                </h2>
              </div>
            </div>
            <div className="flex justify-center w-full py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="72"
                height="79"
                viewBox="0 0 72 79"
                fill="none"
              >
                <path
                  d="M10.5 63.1375L2 58.5312V48.0625"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2 31.3123V20.8435L10.5 16.2373"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M27.5 6.60624L36 2L44.5 6.60624"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M61.5 16.2373L70 20.8435V31.3123"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M70 48.0625V58.5312L61.5 63.2212"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M44.5 72.7686L36 77.3748L27.5 72.7686"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M36.0001 39.6873L44.5001 35.0811"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M61.5 25.45L70 20.8438"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M36.0001 39.6875V50.1562"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M36.0001 66.9062V77.375"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M36 39.6875L27.5 34.9976"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M10.5 25.45L2 20.8438"
                  stroke="#805AD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="text-gray-800 w-1/2 pl-12">
                <h1 Name="font-bold text-2xl lg:text-4xl tracking-1px">530</h1>
                <h2 className="text-base lg:text-lg mt-4 leading-8 tracking-wide">
                  Projects Completed
                </h2>
              </div>
            </div>
          </div>
        </div>

        <DetailSubProduct />
      </div>

      {/* /* // releted product */}
    </>
  );
};

export default DetailProduct;
