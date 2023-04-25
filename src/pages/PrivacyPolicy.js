import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <>
      {/* Our Story */}

      <div>
        <div className="2xl:mx-auto 2xl:container py-12 lg:px-20 md:px-6 px-4 ">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center text-center space-y-4">
              <h1 className="text-3xl lg:text-4xl font-semibold leading-9 md:leading-7 lg:leading-9 text-gray-800">
                Privacy Policy
              </h1>
              <p className="text-base leading-6 text-center text-gray-600 w-full md:w-10/12">
                This privacy policy sets out how we use and protect any
                information that you give us when you use our website. We are
                committed to ensuring that your privacy is protected. Should we
                ask you to provide certain information by which you can be
                identified when using this website, then you can be assured that
                it will only be used in accordance with this privacy statement.
              </p>
              <p className="text-base leading-6 text-center text-gray-600 w-full md:w-10/12">
                We may change this policy from time to time by updating this
                page. You should check this page regularly to ensure that you
                are happy with any changes.{" "}
              </p>
            </div>

            <div className="mt-16 flex justify-start flex-col items-start w-full text-left space-y-8">
              <div className=" flex justify-start items-start flex-col text-left w-full xl:w-8/12">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  What we collect{" "}
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  We may collect the following information:
                </p>{" "}
                <br />
                <ul class="max-w-2xl space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  <li>Name and contact information including email address</li>
                  <li>
                    Demographic information such as postcode, preferences, and
                    interests
                  </li>
                  <li>
                    Other information relevant to customer surveys and/or offers
                  </li>
                </ul>
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
                <ul class="max-w-2xl space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  <li>Internal record keeping</li>
                  <li>
                    We may use the information to improve our products and
                    services
                  </li>
                  <li>
                    We may periodically send promotional emails about new
                    products, special offers, or other information which we
                    think you may find interesting using the email address which
                    you have provided
                  </li>
                  <li>
                    From time to time, we may also use your information to
                    contact you for market research purposes. We may contact you
                    by email, phone, fax, or mail. We may use the information to
                    customize the website according to your interests.
                  </li>
                </ul>
              </div>
              <hr className="border border-gray-100 w-full" />
              <div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  Security
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  We are committed to ensuring that your information is secure.
                  In order to prevent unauthorized access or disclosure, we have
                  put in place suitable physical, electronic, and managerial
                  procedures to safeguard and secure the information we collect
                  online.
                </p>
              </div>
              <hr className="border border-gray-100 w-full" />
              <div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  How we use cookies
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  A cookie is a small file which asks permission to be placed on
                  your computer's hard drive. Once you agree, the file is added,
                  and the cookie helps analyze web traffic or lets you know when
                  you visit a particular site. Cookies allow web applications to
                  respond to you as an individual. The web application can
                  tailor its operations to your needs, likes, and dislikes by
                  gathering and remembering information about your preferences.{" "}
                </p>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  We use traffic log cookies to identify which pages are being
                  used. This helps us analyze data about webpage traffic and
                  improve our website in order to tailor it to customer needs.
                  We only use this information for statistical analysis purposes
                  and then the data is removed from the system.
                </p>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  Overall, cookies help us provide you with a better website, by
                  enabling us to monitor which pages you find useful and which
                  you do not. A cookie in no way gives us access to your
                  computer or any information about you, other than the data you
                  choose to share with us.
                </p>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  You can choose to accept or decline cookies. Most web browsers
                  automatically accept cookies, but you can usually modify your
                  browser setting to decline cookies if you prefer. This may
                  prevent you from taking full advantage of the website.
                </p>
              </div>
              <hr className="border border-gray-100 w-full" />
              <div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  Links to other websites
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  Our website may contain links to other websites of interest.
                  However, once you have used these links to leave our site, you
                  should note that we do not have any control over that other
                  website. Therefore, we cannot be responsible for the
                  protection and privacy of any information which you provide
                  whilst visiting such sites, and such sites are not governed by
                  this privacy statement. You should exercise caution and look
                  at the privacy statement applicable to the website in
                  question.{" "}
                </p>
              </div>

              <hr className="border border-gray-100 w-full" />
              <div className="flex justify-start items-start flex-col text-left w-full xl:w-6/12">
                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">
                  Controlling your personal information
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-600">
                  You may choose to restrict the collection or use of your
                  personal information in the following ways:
                </p>
                <ul class="max-w-2xl space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 mt-7">
                  <li>
                    Whenever you are asked to fill in a form on the website,
                    look for the box that you can click to indicate that you do
                    not want the information to be used by anybody for direct
                    marketing purposes
                  </li>
                  <li>
                    If you have previously agreed to us using your personal
                    information for direct marketing purposes, you may change
                    your mind at any time by writing to
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
