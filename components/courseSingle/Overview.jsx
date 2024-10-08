"use client";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Overview({ data }) {
  const [showMore, setShowMore] = useState(false);

  // Destructure necessary fields from data with alias for Requirements
  const { description, targetAudience, you_will_learn_list, Requirements: requirements } = data;

  // Convert requirements string to an array
  const requirementsArray = requirements
    ? requirements.split("\r\n").map(item => item.trim()).filter(item => item)
    : [];

  return (
    <div id="overview" className="pt-60 lg:pt-40 to-over">
      <h4 className="text-18 font-medium">Description</h4>

      <div className={`show-more mt-30 ${showMore ? "is-active" : ""}`}>
        <div
          className="show-more__content"
          style={showMore ? { maxHeight: "370px" } : {}}
        >
          <p>
            {description || "No description available."}
            <br />
            <br />
            {/* Additional dynamic content if available */}
            {targetAudience && (
              <>
                {targetAudience}
                <br />
                <br />
              </>
            )}
            {/* You can include more dynamic content as needed */}
          </p>
        </div>

        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="show-more__button text-purple-1 font-medium underline mt-30"
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>

      <div className="mt-60">
        <h4 className="text-20 mb-30">What you'll learn</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 list-disc list-inside">
          {/* Split you_will_learn_list by \r\n and map to display each item as a bullet point */}
          {you_will_learn_list
            ? you_will_learn_list
                .split("\r\n")
                .map((item, index) => (
                  <li key={index} className="ml-5 flex items-center">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-purple-1 mr-2 flex-shrink-0"
                    />
                    {item.trim()}
                  </li>
                ))
            : <li>No learning points available.</li>}
        </ul>
      </div>

      <div className="mt-60">
        <h4 className="text-20">Requirements</h4>
        <ul className="list-disc list-inside mt-5 space-y-3">
          {requirementsArray.length > 0 ? (
            requirementsArray.map((elm, i) => (
              <li key={i}>{elm}</li>
            ))
          ) : (
            <li>No requirements listed.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
