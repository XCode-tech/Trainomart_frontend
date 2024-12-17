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
        <div style={{ position: 'fixed', inset: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Popup Container */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', maxWidth: '900px', width: '100%', margin: '20px', overflow: 'hidden', position: 'relative' }}>
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', color: 'gray', background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}
              aria-label="Close popup"
            >
              <X size={24} />
            </button>

            {/* Content Container */}
            <div style={{ display: 'flex' }}>
              {/* Left Side - Image */}
              <div style={{ flex: 1 }}>
                <Image
                  src="/assets/img/home-4/masthead/1.jpg"
                  alt="Popup Image"
                  width={500} // Adjust as needed
                  height={500} // Adjust as needed
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Right Side - Text and Form */}
              <div style={{ flex: 1, padding: '20px' }}>
                {/* Text Section */}
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Welcome to Our Course Platform!</h2>
                  <p style={{ color: 'gray', marginBottom: '24px' }}>
                    Sign up now to get exclusive access to our latest courses and special offers.
                  </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handlePopupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }}
                  />
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#6d28d9', color: 'white', fontSize: '16px', cursor: 'pointer', border: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
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
