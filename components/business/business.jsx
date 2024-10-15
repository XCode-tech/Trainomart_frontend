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
                    Sub Title for business Page
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
              <h2 className="text-30 lh-16">
                Areas of Expertise
              </h2>
              <p className="text-dark-1 mt-30">
                Whether you're an IT Professional
                seeking Advanced Skill Development or
                An Executive in need of Experienced Trainers,
                Our Expertise is tailored to meet your needs with
                Hands-On Practical Solutions.
              </p>
              <br />
              <p>Services we provide to the industry are:</p>
              <ul className="list-disc list-inside pl-4"> {/* Tailwind CSS classes for styling the list */}
                <li> - Contract Trainers</li>
                <li> - Consulting IT Projects</li>
                <li> - Instructor-led Courses</li>
                <li> - Learning at Scale</li>
              </ul>
              <div className="d-inline-block">
                <Link
                  href="/signup"
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
