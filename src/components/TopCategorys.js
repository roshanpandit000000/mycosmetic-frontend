import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "",
        borderRadius: "25px",
        marginRight: "10px",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        borderRadius: "25px",
        marginLeft: "10px",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
      }}
      onClick={onClick}
    />
  );
}

const Categorys = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const products = [
    {
      id: 1,
      name: "Face-Care",
      href: "#",
      imageSrc: "./category/1.png",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    // More products...
    {
        id: 1,
        name: "Skin-Care",
        href: "#",
        imageSrc: "./category/2.png",
        imageAlt: "Front of men's Basic Tee in black.",
        price: "$35",
        color: "Black",
      },
      {
        id: 1,
        name: "Lips Care",
        href: "#",
        imageSrc: "./category/3.png",
        imageAlt: "Front of men's Basic Tee in black.",
        price: "$35",
        color: "Black",
      },
      {
        id: 1,
        name: "Mens Care",
        href: "#",
        imageSrc: "./category/6.png",
        imageAlt: "Front of men's Basic Tee in black.",
        price: "$35",
        color: "Black",
      },
      {
        id: 1,
        name: "Eyes Care",
        href: "#",
        imageSrc: "./category/5.png",
        imageAlt: "Front of men's Basic Tee in black.",
        price: "$35",
        color: "Black",
      },
      {
        id: 1,
        name: "Brushes",
        href: "#",
        imageSrc: "./category/6.png",
        imageAlt: "Front of men's Basic Tee in black.",
        price: "$35",
        color: "Black",
      },
      {
        id: 1,
        name: "Hair Special",
        href: "#",
        imageSrc: "./category/1.png",
        imageAlt: "Front of men's Basic Tee in black.",
        price: "$35",
        color: "Black",
      },
      {
        id: 1,
        name: "Bath & Body",
        href: "#",
        imageSrc: "./category/2.png",
        imageAlt: "Front of men's Basic Tee in black.",
        price: "$35",
        color: "Black",
      },
      {
        id: 1,
        name: "Mackeups",
        href: "#",
        imageSrc: "./category/6.png",
        imageAlt: "Front of men's Basic Tee in black.",
        price: "$35",
        color: "Black",
      },
    
  ];

  return (
    <>
      <div className="container mx-auto px-5 lg:px-24 sm:px-5 pt-10">
        <div className="">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="px-2.5 lg:px- sm:px-2.5 ">
                <div className="">
                  <Link to="/search?category=Lips">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-24"
                  />
                  </Link>
                </div>
                <div className="mt-3 mr-4 text-center">
                  <div>
                    <h3 className="sm:text-xs text-xs lg:text-sm text-gray-700 ">
                      <a href={product.href}>
                        <span aria-hidden="true" className=" " />
                        {product.name}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
         
        </div>
      </div>
    </>
  );
};

export default Categorys;
