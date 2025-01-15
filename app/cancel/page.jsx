"use client";

import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import HeaderFour from '@/components/layout/headers/HeaderFour'
import Preloader from '@/components/common/Preloader'
import FooterFour from '@/components/layout/footers/FooterFour'

export default function Cancel() {
    return (
        <div className="main-content  ">
            <Preloader />

            <HeaderFour />
            <br />
            <br />
            <div className="content-wrapper js-content-wrapper overflow-hidden">

                <div className="flex flex-col mt-90 items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-red-100">
                    <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg">
                        {/* <FaTimesCircle className="text-red-500 text-6xl mb-4" /> */}
                        <img src="/assets/img/credit_card.png" alt="" width={100} height={100}/>
                        <h1 className="text-3xl font-extrabold text-gray-800">
                            Payment Not Completed
                        </h1>
                        <p className="text-gray-600 mt-4">
                            It seems like your payment didn’t go through. Please try again or
                            contact support if you need help.
                        </p>
                        <a
                            href="/"
                            className="mt-6 inline-block bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
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
