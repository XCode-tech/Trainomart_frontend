"use client";

import React, { useState, useEffect } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API_URL from "@/data/config";

export default function Faq({ slug }) {
  const [faqs, setFaqs] = useState([]);
  const [activeFaq, setActiveFaq] = useState(0);

  // Fetch the FAQ data
  useEffect(() => {
    async function fetchFaqs() {
      try {
        const response = await fetch(`${API_URL}/courses/slug/${slug}`);
        const data = await response.json();
        
        if (data?.faq) {
          const faqList = parseFaqString(data.faq);
          setFaqs(faqList);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    }

    fetchFaqs();
  }, [slug]);

  // Parse the FAQ string into an array of question-answer objects
  const parseFaqString = (faqString) => {
    const faqArray = faqString.split("\r\n").reduce((acc, line) => {
      const [key, value] = line.split(": ", 2);
      if (key?.toLowerCase().startsWith("question")) {
        acc.push({ question: value, answer: "" });
      } else if (key?.toLowerCase().startsWith("answer")) {
        acc[acc.length - 1].answer = value;
      }
      return acc;
    }, []);
    return faqArray;
  };

  return (
    <section className="layout-pt-lg layout-pb-lg bg-light-4">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-xl-8 col-lg-9 col-md-11">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="accordion -block text-left pt-60 lg:pt-40 js-accordion">
              {faqs.map((elm, i) => (
                <div
                  onClick={() =>
                    setActiveFaq((prev) => (prev === i ? null : i)) // Toggle FAQ
                  }
                  key={i}
                  className={`accordion__item ${
                    activeFaq === i ? "is-active" : ""
                  }`}
                >
                  <div className="accordion__button">
                    <div className="accordion__icon">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="icon"
                      >
                        <FontAwesomeIcon
                          icon={activeFaq === i ? faMinus : faPlus}
                        />
                      </div>
                    </div>
                    <span className="text-17 fw-500 text-dark-1">
                      {elm.question}
                    </span>
                  </div>

                  <div
                    style={
                      activeFaq === i ? { maxHeight: "139px" } : { maxHeight: "0px", overflow: "hidden" }
                    }
                    className="accordion__content"
                  >
                    <div className="accordion__content__inner">
                      <p>{elm.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
