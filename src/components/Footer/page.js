"use client"
import { useRouter } from 'next/navigation';
import {
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaFacebookF,
  FaPinterest,
} from "react-icons/fa6";
import React from 'react'

const Footer = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-8 px-8 items-center py-14 lg:px-10 xl:px-32 bg-gray-100">
      {/* colums */}
      <div className="grid grid-cols-4">
        <div className="flex flex-col gap-3">
          <h1 className="font-medium">SHOP</h1>
          <div className="flex text-xs text-gray-800 flex-col gap-1">
            <p>Ladies</p>
            <p>Men</p>
            <p>Baby</p>
            <p>Kids</p>
            <p>U&M Home</p>
            <p>Sport</p>
            <p>Magazine</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-medium">CORPORATE INFO</h1>
          <div className="flex text-xs text-gray-800 flex-col gap-1">
            <p>Career at U&M</p>
            <p>About U&M group</p>
            <p>Sustainability H&M Group</p>
            <p>Press</p>
            <p>Investor relations</p>
            <p>Corporate governance</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-medium">HELP</h1>
          <div className="flex text-xs text-gray-800 flex-col gap-1">
            <p>Customer Service</p>
            <p>My U&M</p>
            <p>Find a store</p>
            <p>Legal & Privacy</p>
            <p>Contact</p>
            <p>Cookie Notice</p>
            <p>Report a scam</p>
            <p>Cookie Notice</p>
            <p>Cookie Settings</p>
          </div>
        </div>
        <div className="flex flex-col py-8 gap-4 items-start">
          <p className="text-xs text-gray-600">
            Sign up now and be the first to know about exclusive offers, latest
            fashion news & style tips!
          </p>

          <button
            onClick={() => router.push("/register")}
            className="text-sm text-gray-700"
          >
            Read More
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </div>
      </div>
      {/* icons */}
      <div className="flex gap-8">
        <FaInstagram
          className="cursor-pointer"
          onClick={() => router.push("https://www.instagram.com")}
        />
        <FaTiktok
          className="cursor-pointer"
          onClick={() => router.push("https://www.tiktok.com")}
        />
        <FaYoutube
          className="cursor-pointer"
          onClick={() => router.push("https://www.youtube.com")}
        />
        <FaPinterest
          className="cursor-pointer"
          onClick={() => router.push("https://www.pinterest.com")}
        />
        <FaFacebookF
          className="cursor-pointer"
          onClick={() => router.push("https://www.facebook.com")}
        />
      </div>
      <p className=" text-xs tracking-wide text-gray-600">
        The content of this site is copyright-protected and is the property of H
        & M Hennes & Mauritz AB.
      </p>
      <h1
        onClick={() => router.push("/")}
        className="font-bold text-3xl cursor-pointer text-red-600"
      >
        UM
      </h1>
      <h3 className="font-medium">INDIA | Rs.</h3>
    </div>
  );
};

export default Footer;