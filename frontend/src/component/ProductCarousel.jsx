import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-2 -translate-y-1/2 z-30 cursor-pointer text-white text-2xl"
    onClick={onClick}
  >
    ›
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-2 -translate-y-1/2 z-30 cursor-pointer text-white text-2xl"
    onClick={onClick}
  >
    ‹
  </div>
);

const ProductCarousel = ({ products = [] }) => {
  if (products.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No featured products to display.
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {dots}
      </div>
    ),
    customPaging: () => (
      <button className="w-2 h-2 rounded-full bg-white/40 hover:bg-white transition-all"></button>
    ),
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
      <Slider {...settings}>
        {products.map(product => (
          <div key={product._id} className="relative">
            <img
              src={product.images || product.image}
              alt={product.name}
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <h3 className="text-white font-bold text-lg truncate">{product.name}</h3>
              {product.description && (
                <p className="text-gray-200 text-sm mt-1 line-clamp-2">
                  {product.description}
                </p>
              )}
              <div className="flex justify-between items-center mt-2">
                <span className="text-pink-400 font-bold text-lg">
                  ₹{product.price}
                </span>
                <div className="flex items-center gap-1 text-white text-sm">
                  <FaStar className="text-yellow-400" />
                  {product.rating?.toFixed(1) || "N/A"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
