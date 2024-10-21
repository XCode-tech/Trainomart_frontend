"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

export default function CourseCard({ data, index, ...props }) {
  // Function to render star icons based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`full-${i}`}
          icon={solidStar}
          className="text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          key="half"
          icon={solidStar}
          className="text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      );
    }

    while (stars.length < 5) {
      stars.push(
        <FontAwesomeIcon
          key={`empty-${stars.length}`}
          icon={regularStar}
          className="text-yellow-400"
        />
      );
    }

    return stars;
  };

  return (
    <div className="col-lg-3 col-md-6">
      <div className="coursesCard -type-1">
        {/* Course Image */}
        <div className="relative">
          <div className="coursesCard__image overflow-hidden rounded-8">
            <Image
              width={500}
              height={500}
              className="w-full"
              src={data.course_image || "/default-course.jpg"}

              //{data.course_image || "/default-course.jpg"}
//              src="https://test.trainomart.com{{ data.course_image.url }}"
              alt={data.course_image || "Course Image"}
              objectFit="cover"
              priority={index < 4} // Prioritize images for the first few courses
            />
            {data.popular && (
              <div className="absolute top-2 left-2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Popular
              </div>
            )}
            {data.bestSeller && (
              <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Best Seller
              </div>
            )}
          </div>
        </div>

        {/* Course Details */}
        <div className="h-100 pt-15">
          {/* Rating */}
          {/* Uncomment if you want to display rating */}
          {/* 
          <div className="flex items-center">
            <span className="text-yellow-400 text-sm mr-2">{data.rating.toFixed(1)}</span>
            <div className="flex">{renderStars(data.rating)}</div>
            <span className="text-gray-600 text-sm ml-2">({data.ratingCount})</span>
          </div>
          */}

          {/* Course Title */}
          <h3 className="text-lg font-semibold text-gray-800 mt-3">
            <Link
              href={`/courses/${data.id}`}
              className="hover:text-purple-600 transition-colors duration-200"
            >
              {data.course_name || "Untitled Course"}
            </Link>
          </h3>

          {/* Course Meta */}
          <div className="flex items-center mt-2 space-x-4">
            {/* Lessons */}
            <div className="flex items-center text-gray-600 text-sm">
              <Image
                width={16}
                height={16}
                src="/assets/img/coursesCards/icons/1.svg" // Ensure this path is correct
                alt=""
              />
              <span className="ml-5">{data.lessons} Lessons</span>
            </div>

            {/* Duration */}
            <div className="flex items-center text-gray-600 text-sm">
              <Image
                width={16}
                height={16}
                src="/assets/img/coursesCards/icons/2.svg" // Ensure this path is correct
                alt="Duration Icon"
              />
              <span className="ml-5">{data.duration}</span>
            </div>

            {/* Skill Level */}
            <div className="flex items-center text-gray-600 text-sm">
              <Image
                width={16}
                height={16}
                src="/assets/img/coursesCards/icons/3.svg" // Ensure this path is correct
                alt="Skill Level Icon"
              />
              <span className="ml-5">{data.level || "Beginner"}</span>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
