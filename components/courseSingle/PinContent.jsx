"use client";

import React, { useState, useEffect } from "react";
import { useContextElement } from "@/context/Context";
import ModalVideoComponent from "../common/ModalVideo";
import Image from "next/image";
import API_URL from "@/data/config";

export default function PinContent({ pageItem }) {
  const { isAddedToCartCourses, addCourseToCart } = useContextElement();
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  // Define form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    time_to_call: "",
    course_name: pageItem.course_name, // Include course name in the form data
  });

  const [isLoading, setIsLoading] = useState(false); // Define isLoading state

  // Initialize screenWidth to window.innerWidth on mount
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  // Update screen width on window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when the form is submitted

    try {
      const response = await fetch(`${API_URL}/leads/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
      setIsLoading(false); // Set loading to false after submission
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        id="js-pin-content"
        className={`courses-single-info js-pin-content ${screenWidth < 991 ? "h-fit right-0" : "h-full right-7 pt-20"
          }`}
      >
        <div
          style={{ position: "sticky", top: "100px" }}
          className="bg-white shadow-2 rounded-8 border-light py-10 px-10"
        >
          <div className="relative">
            <Image
              width={368}
              height={238}
              className="w-1/1 h-auto"
              src={pageItem.course_image || "/default-course.jpg"}
              alt="Course Image"
              priority
            />
          </div>

          <div className="courses-single-info__content scroll-bar-1 pt-5 pb-20 px-5 md:px-10">
            <div className="text-20 leading-none text-center text-dark-1 font-bold">
              <span className="line-through inline-block">${pageItem.orignal_price}</span> <b>${pageItem.price}</b>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ outline: "groove 2px", width: "-webkit-fill-available" }}
                    className="w-full p-2 border-b-2 border-red-500 focus:border-indigo-500 focus:ring-0"
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Phone Number
                  </label>
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="text"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    style={{ outline: "groove 2px", width: "-webkit-fill-available" }}
                    className="w-full p-2 border-b-2 border-red-500 focus:border-indigo-500 focus:ring-0"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ outline: "groove 2px", width: "-webkit-fill-available" }}
                    className="w-full p-2 border-none border-b-2 border-red-500 focus:border-indigo-500 focus:ring-0 focus:outline-none transition-colors duration-300"
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="time_to_call" className="block text-sm font-medium text-gray-700 mb-2">
                    Good time to call you ( EST ) 
                  </label>
                  <input
                    id="time_to_call"
                    name="time_to_call"
                    type="datetime-local"
                    value={formData.time_to_call}
                    onChange={handleChange}
                    style={{ outline: "groove 2px", width: "-webkit-fill-available" }}
                    className="w-full p-2 border-b-2 border-red-500 focus:border-indigo-500 focus:ring-0"
                  />
                </div>
              </div>

              <input
                type="hidden"
                name="course_name"
                value={formData.course_name} // Hidden field for course name
              />

              <button
                type="submit"
                className="button -md -outline-dark-1 text-dark-1 w-1/1 mt-10"
                disabled={isLoading} // Disable button when loading
              >
                <b>{isLoading ? "Submitting..." : "Show Interest"}</b>
              </button>
            </form>

            {/* <div className="mt-5">
              {[
                { label: "Lessons", value: pageItem.lessons || 20, icon: "icon-video-file" },
                { label: "Duration", value: pageItem.duration || "13 Hours", icon: "icon-clock-2" },
                { label: "Skill level", value: pageItem.skill_level || "Beginner", icon: "icon-bar-chart-2" },
                { label: "Language", value: pageItem.language || "English", icon: "icon-translate" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-t border-gray-200">
                  <div className="flex items-center text-dark-1">
                    <div className={item.icon}></div>
                    <div className="ml-2">{item.label}</div>
                  </div>
                  <div>{item.value}</div>
                </div>
              ))}
            </div> */}
            <div className="mt-25">
              <div className="d-flex justify-between py-8">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-video-file"></div>
                  <div className="ml-8">Lessons</div>
                </div>
                <div>{pageItem.lessons || 20}</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-clock-2"></div>
                  <div className="ml-10">Duration</div>
                </div>
                <div>{pageItem.duration || "13 Hours"}</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-bar-chart-2"></div>
                  <div className="ml-10">Skill level</div>
                </div>
                <div>{pageItem.skill_level || "Beginner"}</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-translate"></div>
                  <div className="ml-10">Language</div>
                </div>
                <div>{pageItem.language || "English"}</div>
              </div>
            </div>

            <div className="d-flex justify-center pt-15">
              <a
                href="https://www.facebook.com/profile.php?id=61566279315276"
                className="d-flex justify-center items-center size-40 rounded-full"
                target="_blank"
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/trainomart-com/"
                className="d-flex justify-center items-center size-40 rounded-full"
                target="_blank"
              >
                <i className="fa fa-linkedin"></i>
              </a>
              <a
                href="https://www.instagram.com/trainomart?utm_source=qr"
                className="d-flex justify-center items-center size-40 rounded-full"
                target="_blank"
              >
                <i className="fa fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
