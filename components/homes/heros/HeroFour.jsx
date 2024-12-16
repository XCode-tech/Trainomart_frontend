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
      <div className="flex items-center justify-between w-full">
        <div className="w-1/2 bg-red-500 p-4">
          Left Side
        </div>
        <div className="w-1/2 bg-blue-500 p-4">
          Right Side
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

