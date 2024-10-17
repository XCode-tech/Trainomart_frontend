"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useState } from "react"; 
import { useRouter } from "next/navigation";
import API_URL from "@/data/config";

export default function HeroFour() {
  const router = useRouter();
  const [courseName, setCourseName] = useState(""); // State to store the course name input
  const [loading, setLoading] = useState(false); // State to handle loading state

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = courseName.trim();
    if (!trimmedName) {
      alert("Please enter a valid course name");
      return;
    }
    fetchCourseIdByName(trimmedName);
  };

  // Function to fetch course ID based on course name
  const fetchCourseIdByName = async (name) => {
    setLoading(true); // Set loading state to true
    try {
      const response = await fetch(`${API_URL}/courses/by-name/?name=${encodeURIComponent(name)}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch course ID");
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0 && data[0].id) { // Check if data is an array and has an ID
        router.push(`/courses/${data[0].id}`); // Redirect to the course detail page
      } else {
        alert("Course not found");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      alert("An error occurred while searching for the course");
    } finally {
      setLoading(false); // Reset loading state
    }
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
                Your Pursuit of <span className="text-purple-1">IT Excellence</span> starts here -
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
                      required
                      type="text"
                      placeholder="Find your courses by name"
                      value={courseName} // Bind the input value to state
                      onChange={(e) => setCourseName(e.target.value)} // Update state on input change
                      className="input-field"
                      aria-label="Course search input"
                    />

                    <button
                      className="button -purple-1 text-white ml-4"
                      type="submit" // Change button type to submit
                      disabled={loading} // Disable the button if loading
                      aria-label="Search for course"
                    >
                      {loading ? (
                        <i className="icon icon-loading"></i> // Loading icon
                      ) : (
                        <i className="icon icon-search"></i>
                      )}
                    </button>
                  </form>
                </div>

{/*                 <div className="masthead-search__searches mt-40">
                  <p>Trending Search: az900, azure devops certification, ethical hacking course, </p>
                </div> */}
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
                  src="/assets/img/home-4/masthead/1.png"
                  alt="Hero Image"
                />
              </div>

              {/* Decorative Element 1 */}
              <div className="masthead-image__el1">
                <div
                  data-move="40"
                  className="lg:d-none img-el -w-250 px-20 py-20 d-flex items-center bg-white rounded-8 js-mouse-move"
                >
                  <div className="size-50 d-flex justify-center items-center bg-red-2 rounded-full">
                    <Image
                      width={24}
                      height={23}
                      src="/assets/img/masthead/1.svg"
                      alt="Technical Courses Icon"
                    />
                  </div>
                  <div className="ml-20">
                    <div className="text-orange-1 text-16 fw-500 lh-1">
                      Expert
                    </div>
                    <div className="mt-3">Technical Trainer's</div>
                  </div>
                </div>
              </div>

              {/* Decorative Element 2 */}
              <div className="masthead-image__el2">
                <div
                  data-move="40"
                  className="shadow-4 img-el -w-260 px-40 py-20 d-flex items-center bg-white rounded-8 js-mouse-move"
                >
                  <div className="img-el__side">
                    <div className="size-50 d-flex justify-center items-center bg-dark-1 rounded-full">
                      <Image
                        width={20}
                        height={27}
                        src="/assets/img/masthead/2.svg"
                        alt="Admission Completed Icon"
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="text-purple-1 text-16 fw-500 lh-1">
                      Congrats!
                    </div>
                    <div className="mt-3">Your Admission is Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
