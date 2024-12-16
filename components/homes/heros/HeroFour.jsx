"use client";

import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function HeroWithPopup() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(true); // State to control popup visibility
  const [name, setName] = useState(""); // State for name input
  const [email, setEmail] = useState(""); // State for email input

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
            <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col-xl-5 col-lg-6 col-md-10 order-2 order-lg-1">
            <div className="about-content">
              <h2
                className="about-content__title customSized"
                data-aos="fade-up"
              >
                <span>Our platform</span> is designed to immerse you in a captivating learning experience:
              </h2>
              <div className="y-gap-20 pt-30">
                {featureOne.map((elm, i) => (
                  <div
                    key={i}
                    className="d-flex items-center"
                    data-aos="fade-up"
                  >
                    <div className="about-content-list__icon">
                      <span
                        className="text-white"
                        style={{
                          
                          fontSize: "10px",
                          fontWeight: "300",
                        }}
                        aria-hidden="true"
                      >
                        <FontAwesomeIcon icon={faCheck} />

                      </span>
                    </div>
                    <div className="about-content-list__title">{elm.title}</div>
                  </div>
                ))}
              </div>

              <div className="d-inline-block mt-30">
                <Link href="/signup" className="button -md -dark-1 text-white">
                  Register Now
                </Link>
              </div>
            </div>
          </div>

          <div
            className="col-xl-5 col-lg-6 order-1 order-lg-2"
            data-aos="fade-up"
          >
            <div className="about-image">
              <Image
                width={750}
                height={850}
                style={{ height: "100%", width: "100%" }}
                src="/assets/img/about/1.png"
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
      
        // <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        //   <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 overflow-hidden flex">
        //     {/* Left Side: Image */}
        //     <div className="w-1/2">
        //       <Image
        //         src="/assets/img/home-4/masthead/1.jpg"
        //         alt="Popup Image"
        //         layout="fill"
        //         objectFit="cover"
        //       />
        //     </div>

        //     {/* Right Side: Text and Form */}
        //     <div className="w-1/2 p-8 flex flex-col justify-between">
        //       {/* Close Button */}
        //       <button
        //         onClick={() => setShowPopup(false)}
        //         className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        //         aria-label="Close popup"
        //       >
        //         <X size={24} />
        //       </button>

        //       {/* Text Section */}
        //       <div>
        //         <h2 className="text-2xl font-bold mb-4">Welcome to Our Course Platform!</h2>
        //         <p className="text-gray-600 mb-6">
        //           Sign up now to get exclusive access to our latest courses and special offers.
        //         </p>
        //       </div>

        //       {/* Form Section */}
        //       <form onSubmit={handlePopupSubmit} className="space-y-4">
        //         <input
        //           type="text"
        //           placeholder="Your Name"
        //           value={name}
        //           onChange={(e) => setName(e.target.value)}
        //           required
        //           className="w-full border border-gray-300 rounded-lg p-3"
        //         />
        //         <input
        //           type="email"
        //           placeholder="Your Email"
        //           value={email}
        //           onChange={(e) => setEmail(e.target.value)}
        //           required
        //           className="w-full border border-gray-300 rounded-lg p-3"
        //         />
        //         <button
        //           type="submit"
        //           className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition"
        //         >
        //           Sign Up
        //         </button>
        //       </form>
        //     </div>
        //   </div>
        // </div>
      )}


      
      {/* Main Section */}
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
                Become the <span className="text-purple-500">Innovator of Tomorrow</span>
              </h1>
              <p className="masthead__text text-17 text-gray-800 mt-6">
                Join our mission to provide affordable, high-quality education for
                everyone, anywhere.
              </p>
              <div className="masthead-search mt-8">
                <form
                  className="flex items-center border rounded-lg overflow-hidden shadow-sm"
                >
                  <input
                    type="text"
                    placeholder="Search courses"
                    className="flex-grow px-4 py-2 focus:outline-none"
                  />
                  <button
                    className="bg-purple-500 text-white px-6 py-2"
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
            className="col-xl-5 col-lg-7 relative z-2"
            data-aos="fade-up"
            data-aos-delay="750"
          >
            <div className="masthead-image">
              <div className="masthead-image__img1">
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
