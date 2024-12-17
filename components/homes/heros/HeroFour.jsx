"use client"; 

import gsap from "gsap"; 
import Image from "next/image"; 
import React, { useEffect, useState } from "react"; 
import { useRouter } from "next/navigation"; 
import API_URL from "@/data/config";
import { X } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

export default function HeroFour() {
  const router = useRouter();
  const [tags, setTags] = useState(""); // State to store the tags input
  const [loading, setLoading] = useState(false); // State to handle loading state
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(true); // State to control popup visibility
  const [name, setName] = useState(""); // State for name input
  const [email, setEmail] = useState(""); // State for email input

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect to search results page with the search query
      router.push(`/courses-list/?search=${searchTerm}`);
    }
  };

  // Handle popup form submission
  const handlePopupSubmit = (e) => {
    e.preventDefault();

    console.log("Popup form submitted", { name, email });
    setShowPopup(false); // Close the popup after submission
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const containers = document.querySelectorAll(".js-mouse-move-container");

      containers.forEach((container) => {
        const rect = container.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;

        const targets = container.querySelectorAll(".js-mouse-move");

        targets.forEach((el) => {
          const movement = parseFloat(el.getAttribute("data-move")) || 0;
          const x = ((relX - rect.width / 2) / rect.width) * movement;
          const y = ((relY - rect.height / 2) / rect.height) * movement;

          gsap.to(el, {
            x: x,
            y: y,
            duration: 0.2,
            ease: "power1.out",
          });
        });
      });
    };

    // Throttle the mousemove event handler to improve performance
    let throttleTimeout;
    const throttleDelay = 16; // Approximately 60fps

    const throttledMouseMove = (e) => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          handleMouseMove(e);
          throttleTimeout = null;
        }, throttleDelay);
      }
    };

    document.addEventListener("mousemove", throttledMouseMove);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousemove", throttledMouseMove);
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, []);

  return (
    <section className="masthead -type-3 bg-light-6 js-mouse-move-container">
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="w-1/2 relative">
                <Image
                  src="data:image/jpeg;base64,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"
                  alt="Popup Image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
          <div className="w-1/2 p-8">
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  aria-label="Close popup"
                >
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4">Welcome to Our Course Platform!</h2>
                <p className="text-gray-600 mb-6">
                  Sign up now to get exclusive access to our latest courses and special offers.
                </p>
                <form onSubmit={handlePopupSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="w-full">
                    Sign Up
                  </button>
                </form>
              </div>
        </div>
      )}
      
      <div className="container">
        <div className="row y-gap-30 items-center justify-center">
          {/* Left Column: Text and Search Form */}
          <div
            className="col-xl-7 col-lg-11 relative z-5"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="masthead__content pl-32 lg:pl-0">
              <h1 className="masthead__title">
                Become the <span className="text-purple-1">Innovator of Tomorrow </span>with Our Advanced Courses!
              </h1>

              <p className="masthead__text text-17 text-dark-1 mt-25">
                A Technical Training Solutions Company providing Instructors and
                <br className="lg:d-none" />
                delivering Tech Courses at affordable prices.
              </p>

              <div className="masthead-search mt-30">
                <div className="masthead-search__form">
                  <form onSubmit={handleSubmit} className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search courses by tags"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border p-2 rounded pl-10"
                    />
                    <button
                      className="button -purple-1 text-white ml-4"
                      type="submit"
                      disabled={loading}
                      aria-label="Search for course"
                    >
                      {loading ? (
                        <i className="icon icon-loading"></i>
                      ) : (
                        <i className="icon icon-search"></i>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Images and Decorative Elements */}
          <div
            className="col-xl-5 col-lg-7 relative z-2"
            data-aos="fade-up"
            data-aos-delay="750"
          >
            <div className="masthead-image">
              {/* Main Image */}
              <div className="masthead-image__img1">
                <div className="masthead-image__shape xl:d-none">
                  <Image
                    width={800}
                    height={800}
                    src="/assets/img/home-4/masthead/shape.svg"
                    alt="Shape Illustration"
                  />
                </div>
                <Image
                  width={587}
                  height={656}
                  data-move="20"
                  className="js-mouse-move"
                  src="/assets/img/home-4/masthead/G-1.png"
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

