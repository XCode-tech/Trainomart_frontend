"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
// import 'swiper/swiper.min.css';
import { testimonials2 } from "../../data/tesimonials";
import { counters } from "../../data/count";
import axios from 'axios';
// SwiperCore.use([Pagination]);

export default function TestimonialsTwo() {
    const [showSlider, setShowSlider] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        designation: '',
        email: '',
        phone_number: ''
    });

    useEffect(() => {
        setShowSlider(true);
    }, []);


    const toggleModal = () => {
        setIsOpen(!isOpen);
    };


    const [errors, setErrors] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors(null);

        try {
            const response = await axios.post('http://localhost:8000/api/quote/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                alert('Form submitted successfully');
                setFormData({
                    name: '',
                    organization: '',
                    designation: '',
                    email: '',
                    phone_number: ''
                });
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Error data:', error.response.data);
                setErrors(error.response.data);
                alert(`Error: ${JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Error request:', error.request);
                alert('No response received from the server.');
            } else {
                // Something else caused the error
                console.error('Error message:', error.message);
                alert(`Error: ${error.message}`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="layout-pt-lg mt-80 layout-pb-lg bg-purple-1">
            <div className="container ">
                <div className="row justify-center text-center">
                    <div className="col-auto">
                        <div className="sectionTitle ">
                            <h2 className="sectionTitle__title text-green-1">
                                Instructors by Technology
                            </h2>

                            <p className="sectionTitle__text text-white">
                                We champion education that extends beyond theoretical concepts.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="js-section-slider pt-50">
                    {showSlider && (
                        <Swiper
                            className="overflow-visible"
                            // {...setting}
                            modules={[Navigation, Pagination]}
                            navigation={{
                                nextEl: ".icon-arrow-right",
                                prevEl: ".icon-arrow-left",
                            }}
                            loop={true}
                            spaceBetween={30}
                            slidesPerView={1}
                            breakpoints={{
                                // when window width is >= 576px
                                450: {
                                    slidesPerView: 1,
                                },
                                // when window width is >= 768px
                                768: {
                                    slidesPerView: 2,
                                },
                                1200: {
                                    // when window width is >= 992px
                                    slidesPerView: 3,
                                },
                            }}
                        >
                            {testimonials2.map((elm, i) => (
                                <SwiperSlide key={i} className="swiper-slide">
                                    <div
                                        className="testimonials -type-1 text-center"
                                        data-aos="fade-left"
                                        data-aos-duration={(i + 1) * 550}
                                    >
                                        <div className="testimonials__content">

                                            <div className="">
                                                <Image
                                                    width={180}
                                                    height={120}
                                                    src={elm.imageSrc}
                                                    alt="image"
                                                />
                                            </div>
                                            <p className="testimonials__text">
                                                {`${elm.description}`}
                                            </p>

                                            <div className="">
                                                <h4 className="testimonials__title">
                                                    <b>
                                                        {elm.comment}</b></h4>
                                                <div className="testimonials-footer__content">
                                                    <div className="testimonials-footer__title">
                                                        {elm.name}
                                                    </div>
                                                    <div className="testimonials-footer__text">
                                                        {elm.position}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}

                    <div className="d-flex x-gap-20 items-center justify-end pt-60 lg:pt-40">
                        <div className="col-auto">
                            <button className="button -outline-white text-white size-50 rounded-full d-flex justify-center items-center js-prev">
                                <i className="icon icon-arrow-left text-24"></i>
                            </button>
                        </div>
                        <div className="col-auto">
                            <button className="button -outline-white text-white size-50 rounded-full d-flex justify-center items-center js-next">
                                <i className="icon icon-arrow-right text-24"></i>
                            </button>
                        </div>
                    </div>
                </div>


                <div className="text-center">
                    <a onClick={toggleModal}>
                        <h1>
                            <Image
                                src="/assets/img/gif/fast-forward.gif"
                                alt="GIF before text"
                                width={48}
                                height={24}
                                className="mr-2"
                            />
                            <span className="text-center text-green-1 cursor-pointer">Get Quote Today!</span>
                            <Image
                                src="/assets/img/gif/fast-backward.gif"
                                alt="GIF before text"
                                width={48}
                                height={24}
                                className="mr-2"
                            />
                        </h1>
                    </a>

                    {isOpen && (
                        // <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 ml-82">
                                <h2 className="text-2xl font-bold mb-4 text-center">Get Your Quote</h2>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="mb-4">
                                        <label className="block text-gray-700"><b>Name:</b></label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700"><b>Organization:</b></label>
                                        <input
                                            type="text"
                                            name="organization"
                                            value={formData.organization}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700"><b>Designation:</b></label>
                                        <input
                                            type="text"
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700"><b>Email ID:</b></label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700"><b>Phone Number:</b></label>
                                        <input
                                            type="text"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-center mt-6">
                                    <button className="button -md -outline-dark-1 text-dark-1 w-1/1 mt-10">
                                        <b>Submit</b>
                                    </button>
                                    </div>
                                </form>
                            </div>
                        // </div>
                    )}

                </div>
            </div>
        </section>
    );
}
