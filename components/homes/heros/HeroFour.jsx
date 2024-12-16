"use client";

import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ArrowRight } from 'lucide-react';

export default function HeroWithPopup() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Popup form submitted", { name, email });
    setShowPopup(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const containers = document.querySelectorAll<HTMLElement>(".js-mouse-move-container");
      containers.forEach((container) => {
        const rect = container.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        const targets = container.querySelectorAll<HTMLElement>(".js-mouse-move");
        targets.forEach((el) => {
          const movement = parseFloat(el.getAttribute("data-move") || "0");
          const x = ((relX - rect.width / 2) / rect.width) * movement;
          const y = ((relY - rect.height / 2) / rect.height) * movement;
          gsap.to(el, { x, y, duration: 0.2, ease: "power1.out" });
        });
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="masthead -type-3 bg-light-6 js-mouse-move-container relative">
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden flex flex-col md:flex-row">
            {/* Left Side: Text and Form */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-between relative bg-gradient-to-br from-purple-50 to-indigo-100">
              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label="Close popup"
              >
                <X size={24} />
              </button>

              {/* Text Section */}
              <div>
                <h2 className="text-3xl font-bold mb-4 text-purple-800">Welcome to Our Course Platform!</h2>
                <p className="text-gray-600 mb-6">
                  Sign up now to get exclusive access to our latest courses and special offers.
                </p>
              </div>

              {/* Form Section */}
              <form onSubmit={handlePopupSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition duration-200 flex items-center justify-center"
                >
                  Sign Up
                  <ArrowRight className="ml-2" size={20} />
                </button>
              </form>
            </div>

            {/* Right Side: Image */}
            <div className="w-full md:w-1/2 relative h-64 md:h-auto">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Popup Image"
                layout="fill"
                objectFit="cover"
                className="rounded-b-lg md:rounded-r-lg md:rounded-bl-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center">
          {/* Left Column: Text and Search Form */}
          <div
            className="w-full xl:w-7/12 lg:w-11/12 relative z-10"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="masthead__content lg:pl-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Become the <span className="text-purple-500">Innovator of Tomorrow</span>
              </h1>
              <p className="text-xl text-gray-800 mb-8">
                Join our mission to provide affordable, high-quality education for
                everyone, anywhere.
              </p>
              <div className="masthead-search">
                <form
                  className="flex items-center border-2 border-purple-500 rounded-lg overflow-hidden shadow-lg"
                >
                  <input
                    type="text"
                    placeholder="Search courses"
                    className="flex-grow px-6 py-4 focus:outline-none text-lg"
                  />
                  <button
                    className="bg-purple-500 text-white px-8 py-4 text-lg font-semibold hover:bg-purple-600 transition duration-200"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: Images and Decorative Elements */}
          <div
            className="w-full xl:w-5/12 lg:w-7/12 relative z-0 mt-12 lg:mt-0"
            data-aos="fade-up"
            data-aos-delay="750"
          >
            <div className="masthead-image">
              <div className="masthead-image__img1 relative">
                <Image
                  width={587}
                  height={656}
                  data-move="20"
                  className="js-mouse-move"
                  src="/placeholder.svg?height=656&width=587"
                  alt="Hero Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

