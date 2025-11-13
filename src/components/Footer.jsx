import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white mt-16">
      {/* Wavy Gradient Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,0 L0,0 Z"
            className="fill-gradient-to-r from-pink-400 via-yellow-300 to-pink-400"
          ></path>
        </svg>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="grid gap-10 md:grid-cols-3 sm:grid-cols-1">
          {/* Logo & Description */}
          <div className="flex flex-col space-y-3 text-center md:text-left animate-fadeIn">
            <Link
              to="/"
              className=" text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 flex items-center gap-1"
            >
              <span>Paw</span>
              <span className="text-white">Mart</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-200">
              Connecting local pet owners and buyers for adoption and pet care
              products. Every paw deserves love!
            </p>
          </div>

          {/* Useful Links */}
          <div className="text-center md:text-left animate-fadeIn delay-150">
            <h2 className="text-xl font-semibold mb-4">Useful Links</h2>
            <ul className="space-y-2">
              {[
                { name: "Home", link: "/" },
                { name: "Pets & Supplies", link: "/pets-supplies" },
                { name: "Contact", link: "/contact" },
                { name: "Terms", link: "/terms" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className="hover:text-pink-400 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left animate-fadeIn delay-300">
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-5">
              {[
                {
                  icon: <FaFacebookF size={24} />,
                  link: "https://facebook.com",
                  color: "hover:text-blue-500",
                },
                {
                  icon: <FaXTwitter size={24} />,
                  link: "https://twitter.com",
                  color: "hover:text-sky-400",
                },
                {
                  icon: <FaInstagram size={24} />,
                  link: "https://instagram.com",
                  color: "hover:text-pink-500",
                },
                {
                  icon: <FaLinkedinIn size={24} />,
                  link: "https://linkedin.com",
                  color: "hover:text-blue-600",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} transform hover:scale-125 transition duration-300 shadow-lg hover:shadow-pink-400/50 rounded-full p-2`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} PawMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
