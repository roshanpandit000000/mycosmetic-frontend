import React from "react";
import { BsCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown } from "flowbite-react";
import SearchBox from "./SearchBox";
import CaregorySection from "./CaregorySection";

const NavBar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/login";
  };
  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <nav className="bg-white border-gray-200 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-4">
          <Link to="/">
            <span className="self-center text-md font-semibold whitespace-nowrap text-white pt-1 sm:text-md lg:text-xl">
              Mycosmetic
            </span>

            {/* Search */}
          </Link>

          <div className="flex items-center">
            <Link
              to="/cart"
              className="mr-4 text-lg font-medium text-white dark:text-white hover:underline"
            >
              <BsCartFill />
              {cart.cartItems.length > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white absolute">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
            </Link>
            {userInfo ? (
              <div className="text-sm font-medium text-white dark:text-blue-500 hover:underline text-center pl-1">
                <Dropdown label={userInfo.name} inline={true}>
                  <Link to="/profile">
                    <Dropdown.Item>User Profile</Dropdown.Item>
                  </Link>
                  <Link to="/orderhistory">
                    <Dropdown.Item>Order History</Dropdown.Item>
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    <Dropdown.Item>Sign out</Dropdown.Item>
                  </Link>
                </Dropdown>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-white dark:text-blue-500 hover:underline"
              >
                Login
              </Link>
            )}
            <div className="pl-3 text-white">
              {userInfo && userInfo.isAdmin && (
                <Dropdown label="Admin" inline={true}>
                  <Link to="/admin/dashboard">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                  <Link to="/admin/products">
                    <Dropdown.Item>Products</Dropdown.Item>
                  </Link>
                  <Link to="/admin/orders">
                    <Dropdown.Item>Order</Dropdown.Item>
                  </Link>
                  <Link to="/admin/users">
                    <Dropdown.Item>Users</Dropdown.Item>
                  </Link>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </nav>
      <nav className="bg-gradient-to-r from-cyan-500 to-blue-500 ... dark:bg-gray-700 pt-4">
        <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
          <div className="flex items-center">
            <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Shop
                </Link>
              </li>

              <li>
                <div className="text-gray-900 dark:text-white hover:underline">
                  <CaregorySection />
                </div>
              </li>
            </ul>
          </div>
          {/* search box */}
          <SearchBox />
        </div>
      </nav>

      {/* <!-- drawer init and toggle --> */}
    </>
  );
};

export default NavBar;
