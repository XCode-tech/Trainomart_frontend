"use client";

import Link from "next/link";
import React from "react";

export default function SignUpForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Sign Up</h3>
              <p className="mt-10">
                Already have an account?
                <Link href="/login" className="text-purple-1">
                  Log in
                </Link>
              </p>
              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email address *
                  </label>
                  <input required type="text" name="title" placeholder="Name" />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Username *
                  </label>
                  <input required type="text" name="title" placeholder="Name" />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Password *
                  </label>
                  <input required type="text" name="title" placeholder="Name" />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Confirm Password *
                  </label>
                  <input required type="text" name="title" placeholder="Name" />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -outline-dark-1 text-dark-1 w-1/1 mt-10"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
