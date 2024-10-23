"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
// import 'swiper/swiper.min.css';
import { testimonials } from "../../data/tesimonials";
import { counters } from "../../data/count";
// SwiperCore.use([Pagination]);

export default function TestimonialsThree() {
    const [showSlider, setShowSlider] = useState(false);
    useEffect(() => {
        setShowSlider(true);
    }, []);
    return (
        <section className="layout-pt-lg mt-80 layout-pb-lg bg-purple-1">
            <div className="container ">
                <div className="row justify-center text-center">
                    <div className="col-auto">
                        <div className="sectionTitle ">
                            <h2 className="sectionTitle__title text-green-1">
                                Our Mission
                            </h2>

                            <p className="sectionTitle__text text-white">
                                We champion education that extends beyond theoretical concepts.
                            </p>
                        </div>
                    </div>
                </div>

                <div className=" pt-20">
                    <div style={{ borderRadius: '25px', outlineStyle:"solid" }} className="p-8 pb-40 pt-40 pl-50 pr-50 rounded-[25px] shadow-md text-white">
                        {/* <p className="sectionTitle__text text-20 text-white text-center">
                            As we continue to grow, we are excited to expand our offerings, that will allow our learners to earn industry-recognized certifications.
                        </p> */}
                        <p className="sectionTitle__text text-20 text-white text-center">
                        Our Mission is to establish a global brand renowned for delivering cutting-edge courses that empower individuals and businesses to thrive in the ever-evolving technical landscape. We are committed to providing exceptional training solutions to both B2B and B2C clients, fostering growth, innovation, and excellence across international markets. Through our diverse, affordable, and customizable offerings, we aim to bridge skill gaps, enhance professional capabilities, and contribute to the success of our clients worldwide.
                        </p>
                        <br />
                        <p className="sectionTitle__text text-20 text-white text-center">
                            Explore the possibilities with Trainomart—where your learning potential is unlocked, and your future is empowered.
                        </p>
                    </div>
                </div>
                <br />
                
                <div>      
                    <a href="/contact">              
                    <button className="button -md -green-1 ml-90 text-white ">

                        Get in Touch
                    </button>
                    </a>
                </div>




                <div className="row y-gap-30  counter__row">
                    {counters.map((elm, i) => (
                        <div
                            key={i}
                            className="col-lg-3 col-sm-6"
                            data-aos="fade-left"
                            data-aos-duration={(i + 1) * 350}
                        >
                            <div className="counter -type-1">
                                <div className="counter__number">{elm.number}</div>
                                <div className="counter__title">{elm.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
