import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import BankOfBihar from "../../assets/BankOfBihar.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <img src={BankOfBihar} alt="Bank Logo" className="" />
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Bank Management System. All Rights
            Reserved.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="text-center md:text-left">
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-400"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-400"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p>
          Designed by CKumar | visit:{" "}
          <a href={`https://chhotupatel.netlify.app/`} target="_blank">
            https://chhotupatel.netlify.app
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
