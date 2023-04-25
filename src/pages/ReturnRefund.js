import React from "react";

const ReturnRefund = () => {
  return (
    <>
      <div>
        <div className="2xl:mx-auto 2xl:container py-12 lg:px-20 md:px-6 px-4 ">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center text-center space-y-4">
              <h1 className="text-3xl lg:text-4xl font-semibold leading-9 md:leading-7 lg:leading-9 text-gray-800">
                Refund and Return Policy
              </h1>
              <p className="text-base leading-6 text-center text-gray-600 w-full md:w-10/12">
                Thank you for shopping with us. We want you to be completely
                satisfied with your purchase. If you're not satisfied, please
                review our return policy below.
              </p>
            </div>

            <div className="mt-16 flex justify-start flex-col items-start w-full text-left space-y-8">
              <div className=" flex justify-start items-start flex-col text-left w-full xl:w-8/12">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  Returns{" "}
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  We accept returns within 30 days of the purchase date. To be
                  eligible for a return, the item must be unused and in the same
                  condition that you received it. It must also be in the
                  original packaging.
                </p>{" "}
              </div>
              <hr className="border border-gray-100 w-full" />
              <div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12 ">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  What we do with the information we gather
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  We require this information to understand your needs and
                  provide you with a better service, and in particular for the
                  following reasons:
                </p>{" "}
                <br />
                <p className="mt-6 text-base leading-6 text-gray-600">
                  To initiate a return, please email us at [insert email
                  address] with your order number and reason for the return. We
                  will provide you with a return shipping label and
                  instructions.
                </p>{" "}
                <p className="mt-6 text-base leading-6 text-gray-600">
                  Once we receive your returned item, we will inspect it and
                  notify you of the status of your refund. If your return is
                  approved, we will initiate a refund to your original method of
                  payment. You will receive the credit within a certain amount
                  of days, depending on your card issuer's policies.
                </p>{" "}
              </div>
              <hr className="border border-gray-100 w-full" />
              <div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  Exchanges
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  We do not offer exchanges at this time. If you need a
                  different size or color, please return the item and place a
                  new order.
                </p>
              </div>
              <hr className="border border-gray-100 w-full" />
              <div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  Damaged or Defective Items
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  If your item is damaged or defective, please email us at
                  [insert email address] within 48 hours of receiving the item.
                  We will provide you with a return shipping label and
                  instructions. Once we receive the item, we will inspect it and
                  notify you of the status of your refund or replacement.{" "}
                </p>
              </div>
              <hr className="border border-gray-100 w-full" />
              <div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  Contact Us
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  If you have any questions about our refund and return policy,
                  please contact us at [insert email address].
                </p>
              </div>

              <hr className="border border-gray-100 w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnRefund;
