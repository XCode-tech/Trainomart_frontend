import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export const metadata = {
  title: "About Trainomart - Empowering Careers with Expert Training",
  description:
    "Discover Trainomart’s mission to provide top-tier online training & certification courses. Learn from industry experts & boost your career with us!",
  alternates: {
    canonical: "https://www.trainomart.com/about",
  },
};

export default function About() {
  return (
    <>
      <Head>
        <title>About Trainomart - Empowering Careers with Expert Training</title>
        <meta
          name="description"
          content="Discover Trainomart’s mission to provide top-tier online training & certification courses. Learn from industry experts & boost your career with us!"
        />
        <link rel="canonical" href="https://www.trainomart.com/about" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

              
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">About Us</h1>
                </div>

                <div>
                  <p className="page-header__text">
                     Our mission is simple: To establish a global brand renowned for delivering cutting-edge courses that help our clients stay ahead in today’s fast-paced technical landscape.
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
                    src="/assets/img/about-1/5.png"
                    alt="image"
                  />
                </div>
                <div className="-el-2">
                  <Image
                    width={200}
                    height={200}
                    src="/assets/img/about-1/4.png"
                    alt="image"
                  />
                </div>
                <div className="-el-3">
                  <Image
                    width={255}
                    height={250}
                    src="/assets/img/about-1/6.png"
                    alt="image"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-5">
{/*               <h2 className="text-30 lh-16">
                Areas of Expertise
              </h2> */}
              <p className="text-dark-1 mt-15">
              At Trainomart, we believe in empowering learners and businesses through innovative, affordable, and customizable technical training solutions. As a subsidiary of Xcode Tech LLC, we specialize in delivering a wide range of courses designed to meet the evolving needs of both individuals and organizations.
              </p>
              <p className="text-dark-1 mt-15">We are committed to providing exceptional training solutions, ensuring excellence for both B2B and B2C clients worldwide. 
              </p>
              <p className="text-dark-1 mt-15">
              From small and medium-sized enterprises to large corporations, from students to career changers, Trainomart offers tailored training that bridges skill gaps and enhances professional capabilities.
              </p>
              <div className="d-inline-block">
                <Link href="#we-offer-section" className="button -md -purple-1 text-white mt-30">
                  Explore our services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
