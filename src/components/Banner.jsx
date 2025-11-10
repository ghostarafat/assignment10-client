import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const navigate = useNavigate();

  // Custom arrows
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-3 sm:right-5 z-10 cursor-pointer text-white bg-black/30 p-2 sm:p-3 rounded-full hover:bg-black/50 transition"
      onClick={onClick}
    >
      <ChevronRightIcon className="w-5 sm:w-6 h-5 sm:h-6" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-3 sm:left-5 z-10 cursor-pointer text-white bg-black/30 p-2 sm:p-3 rounded-full hover:bg-black/50 transition"
      onClick={onClick}
    >
      <ChevronLeftIcon className="w-5 sm:w-6 h-5 sm:h-6" />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="absolute bottom-3 sm:bottom-5 w-full flex justify-center">
        <ul className="flex space-x-2 sm:space-x-3">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/60 hover:bg-yellow-400 transition"></div>
    ),
  };

  const slides = [
    {
      image: "https://i.postimg.cc/jSR9dfxs/slider1.png",
      tagline: "Find Your Furry Friend Today!",
    },
    {
      image: "https://i.postimg.cc/HkZCqzQZ/slider2.png",
      tagline: "Adopt, Don’t Shop — Give a Pet a Home.",
    },
    {
      image: "https://i.postimg.cc/cCMpXBxT/slider3.png",
      tagline: "Because Every Pet Deserves Love and Care.",
    },
  ];

  return (
    <section className="relative w-full max-w-[1440px] mx-auto overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-[230px] sm:h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden"
          >
            {/* Parallax image */}
            <motion.img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5 }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10">
              <motion.h1
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg"
              >
                {slide.tagline}
              </motion.h1>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                  boxShadow: "0 0 15px rgba(255,255,0,0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/pets-supplies")}
                className="bg-yellow-400 text-black font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded shadow-lg hover:bg-yellow-500 transition-all text-sm sm:text-base md:text-lg"
              >
                Adopt Now
              </motion.button>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
