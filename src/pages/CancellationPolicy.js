import React from "react";

const CancellationPolicy = () => {
  return (
    <>
      <div>
        <div className="2xl:mx-auto 2xl:container py-12 lg:px-20 md:px-6 px-4 ">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center text-center space-y-4">
              <h1 className="text-3xl lg:text-4xl font-semibold leading-9 md:leading-7 lg:leading-9 text-gray-800">
                Cancellation Policy
              </h1>
              <p className="text-base leading-6 text-center text-gray-600 w-full md:w-10/12">
                We understand that sometimes you may need to cancel an order.
                Please carefully read our cancellation policy below to ensure
                that you understand the terms and conditions surrounding order
                cancellations.
              </p>
            </div>

            <div className="mt-16 flex justify-start flex-col items-start w-full text-left space-y-8">
              <div className=" flex justify-start items-start flex-col text-left w-full xl:w-8/12">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  Cancellation before shipment{" "}
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  If you wish to cancel an order before it has been shipped,
                  please contact us as soon as possible. If the order has not
                  yet been processed, we will cancel it and issue a full refund.
                  If the order has already been processed, we may not be able to
                  cancel it, but we will do our best to assist you.
                </p>{" "}
              </div>
              <hr className="border border-gray-100 w-full" />
              <div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12 ">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  Cancellation after shipment
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  If you wish to cancel an order after it has been shipped, you
                  may refuse delivery of the package or return it to us in
                  accordance with our return policy. Please note that you will
                  be responsible for any shipping charges associated with the
                  return of the item.
                </p>{" "}
                <br />
              </div>
              <hr className="border border-gray-100 w-full" />
              <div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  Return policy
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  Our return policy is detailed on our Return Policy page.
                  Please refer to that page for further information about
                  returning items.
                </p>
              </div>
              <hr className="border border-gray-100 w-full" />
              <div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  Refunds
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  If your order is cancelled before shipment or returned in
                  accordance with our return policy, we will issue a refund
                  within [number of days] days of receiving the returned item.
                  Please note that the original shipping charges will not be
                  refunded.{" "}
                </p>
              </div>
              <hr className="border border-gray-100 w-full" />
              <div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  Changes to our cancellation policy
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  We reserve the right to modify or update our cancellation
                  policy at any time without prior notice. Any changes to our
                  policy will be posted on this page.
                </p>
              </div>

              <hr className="border border-gray-100 w-full" />
              <p className="mt-6 text-base leading-6 text-gray-600">
              If you have any questions about our cancellation policy, please contact us.
                </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancellationPolicy;
