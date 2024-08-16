"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { KaggleIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "../Icons";
import Link from "next/link";
import siteMetadata from "@/src/utils/siteMetaData";

const Footer = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(""); // State to store generated OTP
  const [step, setStep] = useState(1);
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      const otp = generateOtp();
      setGeneratedOtp(otp);

      // Send OTP to user's email (you need to have a backend for this)
      try {
        const response = await fetch('http://localhost:3000/api/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email, otp }), // Include OTP in the request
        });

        if (response.ok) {
          setNotification("OTP sent to your email.");
          setStep(2);
        } else {
          setNotification("Something went wrong, please try again later.");
        }
      } catch (error) {
        setNotification("Error submitting the form. Please try again.");
      }
    } else if (step === 2) {
      if (otp === generatedOtp) {
        setNotification("Email verified successfully!");
        setFormData({ email: "" });
        setOtp("");
        setStep(1);
      } else {
        setNotification("Invalid OTP, please try again.");
      }
    }
  };

  return (
    <footer className="mt-16 rounded-2xl bg-dark dark:bg-accentDark/90 m-2 sm:m-10 flex flex-col items-center text-light dark:text-dark">
      <h3 className="mt-16 font-medium dark:font-bold text-center capitalize text-2xl sm:text-3xl lg:text-4xl px-4">
        Interesting Stories | Updates | Guides
      </h3>
      <p className="mt-5 px-4 text-center w-full sm:w-3/5 font-light dark:font-medium text-sm sm:text-base">
        Subscribe to learn about new technology and updates. Join over 1500+
        members community to stay up to date with latest news.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 w-fit sm:min-w-[384px] flex flex-col items-stretch bg-light dark:bg-dark p-1 sm:p-2 rounded mx04"
      >
        {step === 1 && (
          <>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full bg-transparent pl-2 sm:pl-0 text-yellow-500 focus:border-dark focus:ring-0 border-0 border-b mr-2 pb-1"
            />
            <input
              type="submit"
              value="Submit"
              className="bg-dark text-light dark:text-dark dark:bg-light cursor-pointer font-medium rounded px-3 sm:px-5 py-1 mt-4"
            />
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              name="otp"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              required
              placeholder="Enter the OTP"
              className="w-full bg-transparent pl-2 sm:pl-0 text-yellow-500 focus:border-dark focus:ring-0 border-0 border-b mr-2 pb-1"
            />
            <input
              type="submit"
              value="Verify OTP"
              className="bg-dark text-light dark:text-dark dark:bg-light cursor-pointer font-medium rounded px-3 sm:px-5 py-1 mt-4"
            />
          </>
        )}
      </form>

      {notification && <p className="mt-4 text-center">{notification}</p>}

      <div className="flex items-center mt-8">
        <a
          href={siteMetadata.linkedin}
          className="inline-block w-6 h-6 mr-4"
          aria-label="Reach out to me via LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href={siteMetadata.github}
          className="inline-block w-6 h-6 mr-4 fill-light"
          aria-label="Check my profile on Github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon className="fill-light dark:fill-dark  hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href={siteMetadata.dribbble}
          className="inline-block w-6 h-6 mr-4"
          aria-label="Check my profile on Dribbble"
          target="_blank"
          rel="noopener noreferrer"
        >
          <KaggleIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
      </div>

      <div className="w-full  mt-16 md:mt-24 relative font-medium border-t border-solid border-light py-6 px-8 flex  flex-col md:flex-row items-center justify-between">
        <span className="text-center">
          &copy;2024 KishanBlogs. All rights reserved.
        </span>
        <Link
          href="/sitemap.xml"
          className="text-center underline my-4 md:my-0"
        >
          sitemap.xml
        </Link>
        <div className="text-center">
          Made with &hearts; by{" "}
          <a href="https://its-kishan-portfolio.vercel.app/" className="underline" target="_blank">
            KishanBlogs
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
