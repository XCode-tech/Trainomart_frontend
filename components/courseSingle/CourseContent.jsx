"use client";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useMemo } from "react";
import ModalVideoComponent from "../common/ModalVideo";
import { parseCourseContent } from "@/utils/parseCourseContent";

export default function CourseContent({ data }) {
  const [activeItemId, setActiveItemId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const modules = useMemo(() => {
    if (data && data.course_content) {
      return parseCourseContent(data.course_content);
    }
    return [];
  }, [data]);

  return (
    <>
      <div id="course-content" className="pt-60 lg:pt-40">
        <h2 className="text-20 fw-500">Course Content</h2>

        <div className="d-flex justify-between items-center mt-30">
          <div className="">
            {modules.length} sections •{" "}
            {modules.reduce((total, module) => total + module.lessons.length, 0)} lectures
          </div>
          <a href="#" className="underline text-purple-1">
            Expand All Sections
          </a>
        </div>

        <div className="mt-10">
          <div className="accordion -block-2 text-left js-accordion">
            {modules.map((module) => (
              <div
                key={module.id}
                className={`accordion__item ${activeItemId === module.id ? "is-active" : ""}`}
              >
                <div
                  onClick={() =>
                    setActiveItemId((prev) => (prev === module.id ? null : module.id))
                  }
                  className="accordion__button py-20 px-30 bg-light-4 cursor-pointer"
                >
                  <div className="d-flex items-center">
                    <div className="accordion__icon mr-10">
                      <FontAwesomeIcon
                        icon={activeItemId === module.id ? faChevronUp : faChevronDown}
                      />
                    </div>
                    <span className="text-17 fw-500 text-dark-1">
                      {module.title}
                    </span>
                  </div>

                  <div>
                    {module.lessons.length} lectures
                  </div>
                </div>

                <div
                  className="accordion__content overflow-hidden transition-all duration-500"
                  style={
                    activeItemId === module.id
                      ? { maxHeight: `${module.lessons.length * 60}px` }
                      : { maxHeight: "0" }
                  }
                >
                  <div className="accordion__content__inner px-30 py-30">
                    <div className="y-gap-20">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="d-flex justify-between items-center">
                          <div className="d-flex items-center">
                            <div className="d-flex justify-center items-center size-30 rounded-full bg-purple-3 mr-10">
                              <div className="icon-play text-9"></div>
                            </div>
                            <div>{lesson.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalVideoComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        videoId={"LlCwHnp3kL4"}
      />
    </>
  );
}
