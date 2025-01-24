"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { contactData } from "@/data/contactLinks";
import dynamic from "next/dynamic";
import API_URL from "@/data/config";

const MapComponent = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function ContactOne() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState(null);

  useEffect(() => {
    // Load reCAPTCHA script dynamically
    const loadRecaptchaScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?render=6LfSCsIqAAAAAJ2XQfrnSP7zLpAU3TVOUr6COP4Y";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    loadRecaptchaScript();
  }, []);

  const handleCaptcha = async () => {
    if (window.grecaptcha) {
      const token = await window.grecaptcha.execute(
        "6LfSCsIqAAAAAJ2XQfrnSP7zLpAU3TVOUr6COP4Y",
        { action: "submit" }
      );
      setCaptchaToken(token);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please verify the reCAPTCHA.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setCaptchaToken(null);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.16761128338!2d-106.95747832427843!3d44.79777267765725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335fabc2a6d206b%3A0x1887ab0668b2495c!2s30%20N%20Gould%20St%20Suite%20R%2C%20Sheridan%2C%20WY%2082801%2C%20USA!5e0!3m2!1sen!2sin!4v1729157976009!5m2!1sen!2sin"
          width="100%"
          height="600"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-50 justify-between">
            <div className="col-lg-4">
              <h3 className="text-24 fw-500">Keep In Touch With Us.</h3>
              <p className="mt-25">
                Meaningful connections commence with <br /> a simple 'Hey'
              </p>

              <div className="y-gap-30 pt-60 lg:pt-40">
                {contactData.map((elm, i) => (
                  <div key={i} className="d-flex items-center">
                    <div className="d-flex justify-center items-center size-60 rounded-full bg-light-7">
                      <Image
                        width={30}
                        height={30}
                        src={elm.icon}
                        alt="icon"
                      />
                    </div>
                    <div className="ml-20">
                      {elm.address || elm.email || elm.phoneNumber}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-7">
              <h3 className="text-24 fw-500">Contact Us</h3>
              <form
                className="contact-form row y-gap-30 pt-60 lg:pt-40"
                onSubmit={(e) => {
                  handleCaptcha();
                  handleSubmit(e);
                }}
              >
                <div className="col-md-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Name..."
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email..."
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Message...
                  </label>
                  <textarea
                    required
                    name="message"
                    placeholder="Message"
                    rows="8"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -purple-1 text-white"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
