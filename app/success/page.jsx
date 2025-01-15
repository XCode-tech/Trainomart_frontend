"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import HeaderFour from '@/components/layout/headers/HeaderFour'
import Preloader from '@/components/common/Preloader'
import FooterFour from '@/components/layout/footers/FooterFour'

export default function Success() {
    return (
        <div className="main-content  ">
            <Preloader />

            <HeaderFour />
            <br />
            <br />

            <div className="content-wrapper js-content-wrapper overflow-hidden">
                <div className="flex mt-90 flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100">
                    <div className="bg-white mt-90 shadow-lg rounded-lg p-8 text-center max-w-lg">
                        {/* <FaCheckCircle className="text-green-500 text-6xl mb-4" /> */}
                        <img src="/assets/img/payment.png" alt="" width={100} height={100}/>
                        
                        <h1 className="text-3xl font-extrabold text-gray-800">
                            Thank You for Signing Up!
                        </h1>
                        <p className="text-gray-600 mt-4">
                            Our team will reach out to you shortly with more details. We're
                            excited to have you on board!
                        </p>
                        <a
                            href="/"
                            className="mt-6 inline-block bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-all"
                        >
                            Go to Homepage
                        </a>
                    </div>
                </div>
                <br />
                <br />            <br />
                <br />            <br />
                <br />
                <FooterFour />
            </div>
        </div>

    );
}
