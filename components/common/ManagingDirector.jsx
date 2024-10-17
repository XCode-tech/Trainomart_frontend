import React from "react";
import Image from "next/image";
import { teamMembers } from "../../data/instractors";
import Link from "next/link";
export default function ManagingDirector({ backgroundColor }) {
    return (
        <section
            className={`layout-pt-lg layout-pb-lg ${backgroundColor ? backgroundColor : ""
                }`}
        >
            <div className="container">
                <div className="row y-gap-20 justify-between items-center">
                    <div className="col-lg-6">
                        <div className="sectionTitle ">
                            <h2 className="sectionTitle__title bold " data-aos="fade-left">
                                Message from Our Managing Director
                            </h2>


                        </div>
                    </div>

                    <div className="col-auto" data-aos="fade-left">
                        <Link
                            href="/contact"
                            className="button -icon -purple-3 text-purple-1"
                        >
                            Contact Us
                            <i className="icon-arrow-top-right text-13 ml-10"></i>
                        </Link>
                    </div>
                </div>

                {/* <div className="row y-gap-30 pt-50">
                    {teamMembers.slice(0, 4).map((elm, i) => (
                        <div
                            key={i}
                            className="col-lg-3 col-sm-6"
                            data-aos="fade-left"
                            data-aos-duration={(i + 1) * 500}
                        >
                            <div className="teamCard -type-1 -teamCard-hover">
                                <div className="teamCard__image">
                                    <Image
                                        width={600}
                                        height={700}
                                        style={{ height: "100%", width: "100%" }}
                                        src={elm.image}
                                        alt="image"
                                    />
                                    <div className="teamCard__socials">
                                        <div className="d-flex x-gap-20 y-gap-10 justify-center items-center h-100">
                                            {elm.socialProfile?.map((itm, i) => (
                                                <Link key={i} href={itm.url ? itm.url : "#"}>
                                                    <i className={`${itm.icon} text-white`}></i>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="teamCard__content">
                                    <h4 className="teamCard__title">
                                        <Link
                                            className="linkCustom"
                                            href={`/instructors/${elm.id}`}
                                        >
                                            {elm.name}
                                        </Link>
                                    </h4>
                                    <p className="teamCard__text">{elm.role}</p>

                                    <div className="row items-center y-gap-10 x-gap-10 pt-10">
                                        <div className="col-auto">
                                            <div className="d-flex items-center">
                                                <div className="icon-star text-yellow-1 text-11 mr-5"></div>
                                                <div className="text-14 lh-12 text-yellow-1 fw-500">
                                                    {elm.rating}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-auto">
                                            <div className="d-flex items-center">
                                                <div className="icon-online-learning text-light-1 text-11 mr-5"></div>
                                                <div className="text-14 lh-12">
                                                    {elm.students} Students
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-auto">
                                            <div className="d-flex items-center">
                                                <div className="icon-play text-light-1 text-11 mr-5"></div>
                                                <div className="text-14 lh-12">
                                                    {elm.courses} Course
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
                <div className="max-w-2xl p-6 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="">
                        {/* Left Image Container */}
                        <br />
                        <div className="md:w-1/2">
                            <Image
                                src="/assets/img/team/1.png"
                                alt="Trainomart representative"
                                width={300}
                                height={300}
                                className="h-48 w-full object-cover"
                            />
                        </div>
                        {/* Right Text Container */}
                        <div className="md:w-2/2 text-sm text-gray-600 ">
                            <p>
                                At Trainomart, we firmly assert that education serves as the most formidable
                                instrument for unlocking potential and sculpting the future. In a constantly
                                evolving digital landscape, the imperative for ongoing learning has never been
                                more pronounced. Through our expert-led courses, tailored training programs,
                                and industry-recognized certifications, we are committed to providing exceptional
                                learning experiences that yield tangible results.
                            </p>
                            <p>
                                I take immense pride in the team we have assembled and the strategic alliances
                                we have established with industry leaders. Together, we are not merely preparing
                                learners for what lies ahead—we are actively shaping it. As we continue to expand
                                and innovate, I encourage you to embark on this exhilarating journey of learning
                                and exploration with us.
                            </p>
                            <p>
                                Thank you for selecting Trainomart as your trusted partner in education.
                            </p>
                        </div>
                    </div>
                </div>






            </div>
        </section>
    );
}
