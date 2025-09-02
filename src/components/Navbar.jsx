"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left side - Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="School Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            <span className="font-semibold text-2xl ml-2">My School</span>
          </Link>

          {/* Desktop Links */}
          <div className="flex gap-2">
            <div className="hidden md:flex space-x-6 border border-gray-300 rounded-md p-2 hover:border-blue-600">
              <Link href="/show-schools" className="text-gray-700 hover:text-blue-600">
                Show Schools
              </Link>
            </div>
            <div className="hidden md:flex space-x-6 border border-gray-300 rounded-md p-2 hover:border-blue-600">
              <Link href="/add-school" className="text-gray-700 hover:text-blue-600">
                Add Schools
              </Link>
            </div>
          </div>


          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow-md ">
            <Link
              href="/add-school"
              className="block text-gray-700 hover:text-blue-600 "
            >
              Add School
            </Link>
          </div>
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow-md ">
            <Link
              href="/show-schools"
              className="block text-gray-700 hover:text-blue-600 "
            >
              Show Schools
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
