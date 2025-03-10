"use client"

import Star from "../common/Star"
import { coursesData } from "@/data/courses"
import React, { useState, useEffect } from "react"
import PinContent from "./PinContent"
import Overview from "./Overview"
import CourseContent from "./CourseContent"
import Head from "next/head"
import API_URL from "@/data/config"
import { format, addDays, startOfMonth } from "date-fns"
import { faq } from "@/data/faq"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from "./Modal"

const menuItems = [
  { id: 1, href: "#overview", text: "Overview", isActive: true },
  { id: 2, href: "#course-content", text: "Course Content", isActive: false },
]

export default function CourseDetailsOne({ slug }) {
  const [pageItem, setPageItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFaq, setActiveFaq] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  const handleInquireNow = () => {
    console.log("Button clicked!")
    setIsModalOpen(true)
  }


  const handleSubmit = (email) => {
    console.log("Submitted email:", email)
    alert(`Thank you! We will contact you at ${email}`)
    setIsModalOpen(false)
  }

  const handleFormSubmit = (email) => {
    console.log("Submitted email:", email)
    alert(`Thank you! We will contact you at ${email}`)
    setIsModalOpen(false)
  }

  const calculateStartDate = () => {
    const now = new Date()
    const nextMonth = now.getMonth() + 1 === 12 ? 0 : now.getMonth() + 1
    const year = now.getMonth() + 1 === 12 ? now.getFullYear() + 1 : now.getFullYear()
    return new Date(year, nextMonth, 5)
  }

  const calculateEndDate = (startDate, duration) => {
    if (!duration || !startDate) return null

    const durationDays = Number.parseInt(duration, 10)

    if (isNaN(durationDays)) {
      return null
    }

    const endDate = addDays(startDate, durationDays - 1)
    return format(endDate, "do MMM yyyy")
  }

  const handleBuyNow = async (slug) => {
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: slug }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || "Something went wrong.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to initiate checkout.")
    }
  }

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_URL}/courses/slug/${slug}`)

        if (!response.ok) {
          throw new Error(`Error fetching course data: ${response.statusText}`)
        }

        const data = await response.json()
        setPageItem(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchCourseDetails()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading course details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    )
  }

  if (!pageItem) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Course not found.</p>
      </div>
    )
  }

  const courseStartDate = calculateStartDate()
  const courseEndDate = calculateEndDate(courseStartDate, pageItem.duration)

  console.log("pageItem_meta_title", pageItem.meta_title);
  console.log("pageItem_meta_Diss", pageItem.meta_description);

  return (
    <>
      <Head>
        <title>{pageItem.meta_title || pageItem.course_name || "Course Platform | Learn and Grow"}</title>
        <meta name="description" content={pageItem.meta_description || pageItem.description || "Learn the best courses to advance your career."} />
        <meta name="keywords" content={pageItem.meta_keywords || "course, online learning, education, training"} />
        <meta property="og:title" content={pageItem.meta_title || pageItem.course_name || "Course Platform | Learn and Grow"} />
        <meta property="og:description" content={pageItem.meta_description || pageItem.description || "Learn the best courses to advance your career."} />
        <meta property="og:image" content={pageItem.course_image || "/default-course.jpg"} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageItem.meta_title || pageItem.course_name || "Course Platform | Learn and Grow"} />
        <meta name="twitter:description" content={pageItem.meta_description || pageItem.description || "Learn the best courses to advance your career."} />
        <meta name="twitter:image" content={pageItem.course_image || "/default-course.jpg"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="js-pin-container" className="js-pin-container relative">
        <section className="page-header -type-5 bg-light-6">
          <div className="container">
            <div className="page-header__content pt-90 pb-90">
              <div className="row y-gap-30">
                <div className="col-xl-7 col-lg-8">
                  <div>
                    <h1 className="text-30 lh-14 pr-60 lg:pr-0">{pageItem.course_name || "Untitled Course"}</h1>
                  </div>

                  <div className="d-flex x-gap-30 y-gap-10 items-center flex-wrap pt-20">
                    <div className="d-flex items-center text-light-1">
                      <div className="icon icon-wall-clock text-13"></div>
                      <div className="text-14 ml-8">
                        <b>Duration: {pageItem.duration || "N/A"}</b> <br />
                      </div>
                    </div>

                    <div className="d-flex items-center text-light-1">
                      <div className="icon icon-wall-clock text-13"></div>
                      <div className="text-14 ml-8">
                        <b>
                          New Batch: Starts From{" "}
                          <span className="blinkingText">
                            {format(courseStartDate, "do MMM")} to {courseEndDate || "N/A"} (9AM-5PM EST)
                          </span>
                        </b>
                        <br />
                      </div>
                    </div>

                    <div className="d-flex items-center text-light-1">
                      <div className="icon icon-person-3 text-13"></div>
                      <div className="text-14 ml-8">
                        <b>Mode Of Training: Virtual</b> <br />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="">
                      <button type="button"
                        onClick={handleOpenModal}
                        className="button -md -outline-dark-1 text-dark-1 w-1/1 mt-10"

                      >
                        <b>Inquire Now</b>
                      </button>
                    </div>


                  </div>

                </div>
                {/* Modal Component */}
                <Modal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  onSubmit={handleSubmit}
                  pageItem={pageItem}
                  className="w-1/1 mt-10"
                />
              </div>

            </div>
          </div>
        </section>

        <PinContent pageItem={pageItem} />

        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="page-nav-menu -line">
                  <div className="d-flex x-gap-30">
                    {menuItems.map((item) => (
                      <div key={item.id}>
                        <a href={item.href} className={`pb-12 page-nav-menu__link ${item.isActive ? "is-active" : ""}`}>
                          {item.text}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-60">
                  <Overview data={pageItem} />
                  <CourseContent data={pageItem} />
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

