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


                <section className="layout-pt-md layout-pb-lg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                            <Image
                                            width={300}
                                            height={400}
                                            src="/assets/img/team/1.png"
                                            alt="image"
                                        />
                                {/* <div className="composition -type-8">
                                    <div className="-el-1">
                                       
                                    </div>
                                    
                                </div> */}
                            </div>

                            <div className="col-lg-9">
                                <p className="text-dark-1 text-16 mt-15">
                                <b>At Trainomart,</b> we firmly assert that education serves as the most formidable
                                instrument for unlocking potential and sculpting the future. In a constantly
                                evolving digital landscape, the imperative for ongoing learning has never been
                                more pronounced. Through our expert-led courses, tailored training programs,
                                and industry-recognized certifications, we are committed to providing exceptional
                                learning experiences that yield tangible results.
                            </p>
                            <p className="text-dark-1 text-16 mt-15">
                                I take immense pride in the team we have assembled and the strategic alliances
                                we have established with industry leaders. Together, we are not merely preparing
                                learners for what lies ahead—we are actively shaping it. As we continue to expand
                                and innovate, I encourage you to embark on this exhilarating journey of learning
                                and exploration with us.
                            </p>
                            <p className="text-dark-1 text-16 mt-15">
                                Thank you for selecting Trainomart as your trusted partner in education.
                            </p>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </section>
    );
}
