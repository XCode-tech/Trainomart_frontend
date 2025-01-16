"use client";

import React, { useEffect, useState } from "react";
import HeaderFour from "@/components/layout/headers/HeaderFour";
import Preloader from "@/components/common/Preloader";
import FooterFour from "@/components/layout/footers/FooterFour";
import axios from "axios"; // Import axios for API requests

// Set the correct base URL for axios globally
axios.defaults.baseURL = "https://test.trainomart.com/api";

export default function Success() {
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State for any potential errors

    useEffect(() => {
        // Extract leadId from the URL query parameter
        const params = new URLSearchParams(window.location.search);
        const leadId = params.get("leadId"); // Get leadId from URL query parameters

        if (leadId) {
            // Fetch the lead data from the backend using the leadId
            axios
                .get(`/leads/${leadId}/`) // Automatically prefixes the base URL
                .then((response) => {
                    const lead = response.data;
                    lead.payment_status = true; // Update payment_status to true

                    // Update the lead record in the database
                    axios
                        .put(`/leads/${leadId}/`, lead) // PUT request to update the lead record
                        .then(() => {
                            setLoading(false); // Set loading to false once the data is updated
                        })
                        .catch((error) => {
                            console.error("Update Error:", error); // Log the error
                            setError("Error updating payment status"); // Set error message
                            setLoading(false);
                        });
                })
                .catch((error) => {
                    console.error("Fetch Error:", error); // Log the error
                    setError("Error fetching lead data"); // Set error message
                    setLoading(false);
                });
        } else {
            setError("Lead ID not found");
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <Preloader />; // Show loading animation while the data is being processed
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-4">
                {error} {/* Display error message if any */}
            </div>
        );
    }

    return (
        <div className="main-content">
            <HeaderFour />
            <br />
            <br />
            <div className="content-wrapper js-content-wrapper overflow-hidden">
                <div className="flex mt-90 flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100">
                    <div className="bg-white mt-90 shadow-lg rounded-lg p-8 text-center max-w-lg">
                        <img
                            src="/assets/img/payment.png"
                            alt="Payment Successful"
                            width={100}
                            height={100}
                        />
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
                <br />
                <br />
                <br />
                <br />
                <FooterFour />
            </div>
        </div>
    );
}
