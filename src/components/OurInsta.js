import React from "react";
import { Link } from "react-router-dom";

const OurInsta = () => {
  return (
    <>
      <div className="2xl:mx-auto 2xl:container flex justify-center items-center   md:py-24 py-10 xl:px-16 sm:px-6 px-4 lg:px-10 ">
        <div className=" xl:w-auto md:flex hidden flex-col space-y-6 xl:space-y-0 xl:flex-row justify-center items-center">
          <div className="flex  justify-between w-full   items-center space-x-6 xl:space-x-8 ">
            <div className="flex justify-center items-center">
              <img
                className
                src="https://i.ibb.co/YDKkv5H/heather-ford-5gk-Ysr-H-eb-Y-unsplash-1.png"
                alt="shoes and clothes"
              />
            </div>
            <div className="flex flex-col justify-between  xl:mt-0  items-center space-y-6  xl:space-y-8">
              <div className="flex flex-col xl:flex-row justify-between h-full xl:justify-center items-center space-y-8 xl:space-y-0 xl:space-x-8">
                <div className="md:w-72 mx-1 md:h-64 lg:mt-4 xl:mt-0  flex flex-col justify-center items-center text-center">
                  <p className=" text-3xl xl:text-4xl font-semibold  leading-7 xl:leading-9 text-center text-gray-800">
                    Our Instagram
                  </p>
                  <p className=" text-base leading-6 mt-3 text-center text-gray-600">
                    Follow us on instagram and tag us to get featured on our
                    timeline
                  </p>
                  <Link
                    to="/"
                    className="focus:outline-none mt-4 focus:underline text-base leading-4 hover:underline text-center text-gray-800"
                  >
                    @Ourinstaname
                  </Link>
                </div>
                <div className=" ">
                  <img
                    className="hidden xl:block"
                    src="https://i.ibb.co/XYPJ0pQ/nordwood-themes-Nv4-QHk-TVEa-I-unsplash-1.png"
                    alt="jewellery"
                  />
                  <img
                    className="xl:hidden"
                    src="https://i.ibb.co/b51F6gj/nordwood-themes-Nv4-QHk-TVEa-I-unsplash-1-1.png"
                    alt="shoes and clothes"
                  />
                </div>
              </div>
              <div className="hidden xl:flex flex-row justify-center  items-center space-x-6 xl:space-x-8">
                <div className>
                  <img
                    className
                    src="https://i.ibb.co/FD9ZHbF/camilla-carvalho-Y9dc-Qp-OIMHQ-unsplash-1.png"
                    alt="jewellery"
                  />
                </div>
                <div className>
                  <img
                    className
                    src="https://i.ibb.co/KxxFD8R/jonathan-francisca-YHbcum51-JB0-unsplash-1.png"
                    alt="watch"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" xl:hidden flex flex-row justify-between   space-x-6 xl:space-x-8">
            <div className>
              <img
                className
                src="https://i.ibb.co/FD9ZHbF/camilla-carvalho-Y9dc-Qp-OIMHQ-unsplash-1.png"
                alt="jewellery"
              />
            </div>
            <div className>
              <img
                className
                src="https://i.ibb.co/KxxFD8R/jonathan-francisca-YHbcum51-JB0-unsplash-1.png"
                alt="watch"
              />
            </div>
          </div>
        </div>
        {/* mobile responsive */}
        <div className="md:hidden flex justify-center items-center flex-col">
          <div className="w-80  flex flex-col justify-center items-center text-center">
            <p className=" text-3xl lg:text-4xl font-semibold  leading-7 lg:leading-9 text-center text-gray-800">
              Our Instagram
            </p>
            <p className=" text-base leading-6 mt-3 text-center text-gray-600">
              Follow us on instagram and tag us to get featured on our timeline
            </p>

            <Link
              to="/"
              className="focus:outline-none mt-4 focus:underline text-base leading-4 hover:underline text-center text-gray-800"
            >
              @Ourinstaname
            </Link>
          </div>
          <div className="mt-8 flex flex-col justify-center space-y-4">
            <img
              src="https://i.ibb.co/dpQZWPz/heather-ford-5gk-Ysr-H-eb-Y-unsplash-1.png"
              alt="shoes and clothes"
            />
            <img
              src="https://i.ibb.co/b51F6gj/nordwood-themes-Nv4-QHk-TVEa-I-unsplash-1-1.png"
              alt="shoes and clothes"
            />
            <img
              src="https://i.ibb.co/2c03gv4/camilla-carvalho-Y9dc-Qp-OIMHQ-unsplash-1.png"
              alt="jewellery"
            />
            <img
              src="https://i.ibb.co/PDMYNxh/jonathan-francisca-YHbcum51-JB0-unsplash-1.png"
              alt="watch"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OurInsta;
