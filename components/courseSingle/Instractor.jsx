"use client";

import React from "react";
import Image from "next/image";

export default function Instructor({ data }) {
  const { authorName, course_image, bio } = data;

  return (
    <div id="instructors" className="pt-60 lg:pt-40">
      <h4 className="text-20 mb-30">Instructor</h4>
      <div className="flex items-center space-x-5">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={course_image || "/default-author.jpg"}
            alt={`Profile image of ${authorName || "Instructor"}`}
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>
        <div>
          <h5 className="text-18 font-medium">{authorName || "Instructor Name"}</h5>
          <p className="text-14 text-gray-500">{bio || "No bio available."}</p>
        </div>
      </div>
    </div>
  );
}
