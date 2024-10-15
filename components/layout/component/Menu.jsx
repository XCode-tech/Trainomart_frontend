"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MobileFooter from "./MobileFooter";
import Image from "next/image";
import { menuList } from "@/data/menu";
import { usePathname } from "next/navigation";
import API_URL from "@/data/config";

export default function Menu({ allClasses, headerPosition }) {
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
  const pathname = usePathname();

  // State for courses in Courses dropdown
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the first five courses from the API
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/courses/limited/?limit=5`); // Corrected URL
        if (!response.ok) {
          throw new Error("Failed to fetch courses.");
        }
        const data = await response.json();
        console.log("Fetched Courses:", data); // Debug log
        setCourses(data); // Assuming the API returns a list
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err); // Debug log
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split('/')[1] === pathname.split('/')[1]) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.forEach((elm3) => {
            if (elm3.href?.split('/')[1] === pathname.split('/')[1]) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, [pathname]);

  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        headerPosition ? headerPosition : ""
      }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        <div className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light">
          <Link href="/login" className="text-dark-1">
            Log in
          </Link>
          <Link href="/signup" className="text-dark-1 ml-30">
            Sign Up
          </Link>
        </div>

        <div className="menu js-navList">
          <ul className={`${allClasses ? allClasses : ""}`}>
            {/* Home Menu Item */}
            <li className="menu-item-has-children">
              <Link
                data-barba
                href="/"
                className={menuItem === "Home" ? "activeMenu" : ""}
              >
                Home
              </Link>
            </li>

            {/* Courses Menu Item */}
            <li className="menu-item-has-children -has-mega-menu">
              <Link
                data-barba
                href="/courses"
                className={menuItem === "Courses" ? "activeMenu" : ""}
              >
                Courses
              </Link>

              <div className="subnav">
                <div className="row x-gap-40">
                  <div className="">
                    <h4 className="text-17 fw-500 mb-20">Popular Courses</h4>

                    {/* Handle Loading State */}
                    {isLoading && <p>Loading courses...</p>}

                    {/* Handle Error State */}
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Display Courses */}
                    {!isLoading && !error && courses.length > 0 && (
                      <ul className="mega__list">
                        {courses.map((course) => (
                          <li key={course.id} className="inActiveMegaMenu">
                            <Link data-barba href={`/courses/${course.id}`}>
                              {course.course_name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Fallback if no courses are available */}
                    {!isLoading && !error && courses.length === 0 && (
                      <p>No courses available.</p>
                    )}
                  </div>

                  <div className="col">
                    {/* Add additional dropdown content here if needed */}
                  </div>
                </div>
              </div>
            </li>

            {/* About Us Menu Item */}
            <li className="menu-item-has-children">
              <Link
                href="/about"
                className={
                  submenu === "About Us" ? "activeMenu" : "inActiveMenu"
                }
              >
                About Us
              </Link>
            </li>
            
            {/* Contact Menu Item */}
            <li>
              <Link
                data-barba
                href="/contact"
                className={
                  pathname === "/contact" ? "activeMenu" : "inActiveMenuTwo"
                }
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Footer */}
        <MobileFooter />
      </div>

      {/* Close Button for Mobile Menu */}
      <div
        className="header-menu-close"
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div className="header-menu-bg"></div>
    </div>
  );
}
