"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-6 md:px-20 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          School Management Mini-Project
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto md:mx-0">
          Build a responsive school database system using Next.js and MySQL.
          Input, store, and display school data with elegant UI and smooth interactions.
        </p>
        <Link
          href="/show-schools"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Explore Project
        </Link>
      </section>

      {/* Overview Cards */}
      <section
        id="overview"
        className="py-16 px-6 md:px-20 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition flex flex-col">
          <div className="relative h-80 w-full aspect-video ">
            <Image
              src="/addSchool.png"
              alt="Add School"
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Page 1: Add School</h2>
            <p className="text-gray-600 text-sm flex-1">
              Create a responsive form using React Hook Form to enter school data.
              Validate inputs like email and phone, and upload images to `schoolImages`.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition flex flex-col">
          <div className="relative h-80 w-full aspect-video">
            <Image
              src="/viewSchool.png"
              alt="Show Schools"
              fill
              className="object-contain"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Page 2: Show Schools</h2>
            <p className="text-gray-600 text-sm flex-1">
              Display all schools in a responsive grid like an ecommerce site.
              Show name, address, city, and image. Add search and pagination features.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <Link href="https://github.com/kunaldhuria95/SchoolManagement">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition flex flex-col">
            <div className="relative h-80 w-full aspect-video">
              <Image
                src="/github.png"
                alt="Deployment"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">Submission & Hosting</h2>
              <p className="text-gray-600 text-sm flex-1">
                Push your project to a public GitHub repo and host it on Vercel or Netlify.
                Include the GitHub and live URLs when submitting.
              </p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
