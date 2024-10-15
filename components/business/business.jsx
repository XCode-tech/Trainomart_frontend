import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Business() {
  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Our Business Services</h1>
                </div>

                <div>
                  <p className="page-header__text">
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-50 justify-between items-center">
            <div className="col-lg-6 pr-50 sm:pr-15">
              <div className="composition -type-8">
                <div className="-el-1">
                  <Image
                    width={300}
                    height={400}
                    src="/assets/img/about-1/1.png"
                    alt="image"
                  />
                </div>
                <div className="-el-2">
                  <Image
                    width={200}
                    height={200}
                    src="/assets/img/about-1/2.png"
                    alt="image"
                  />
                </div>
                <div className="-el-3">
                  <Image
                    width={255}
                    height={250}
                    src="/assets/img/about-1/3.png"
                    alt="image"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              {/* <h2 className="text-30 lh-16">
                Areas of Expertise
              </h2> */}
              <p className="text-dark-1 mt-30">
                We offer instructors for a wide range of courses that cover various topics including advanced
                courses such as Open AI, Nvidia, Databricks, Copilot, Google Gemini and more. Our expert instructors are industry professionals with years of experience who bring real-world expertise to the classroom.
                <br />
                <br />
                Our training programs are designed to be flexible and customizable to meet the specific needs of our clients. We offer both in-person and online training options, and can create customized training solutions for businesses of all sizes.


              </p>
              <br />
              <p>We, at Trainomart, are committed to providing the highest quality training experience possible. We believe that learning should be engaging and fun, and we strive to create a supportive and collaborative environment that encourages learners to achieve their goals.
                <br />
                <br />
                We look forward to helping you succeed!</p>

              <div className="d-inline-block">
                <Link
                  href="/contact"
                  className="button -md -purple-1 text-white mt-30"
                >
                  Contact Us Today!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
