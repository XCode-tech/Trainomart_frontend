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
                                Our Vision
                            </h2>

                            <p className="sectionTitle__text text-white">
                                We champion education that extends beyond theoretical concepts.
                            </p>
                        </div>
                    </div>
                </div>

                <div className=" pt-20">
                    <div style={{ borderRadius: '25px' }} className="bg-white p-8 pb-40 pt-40 pl-50 pr-50 rounded-[25px] shadow-md">
                        <p className="sectionTitle__text text-20 text-black text-center">
                            As we continue to grow, we are excited to expand our offerings, that will allow our learners to earn industry-recognized certifications.
                        </p>
                        <p className="sectionTitle__text text-20 text-black text-center">
                            Trainomart is dedicated to becoming a global leader in technical education, helping individuals and businesses thrive in the ever-evolving world of technology.
                        </p>
                        <p className="sectionTitle__text text-20 text-black text-center">
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
