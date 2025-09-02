import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TanstackProvider from "../../providers/TanStackProvider";
import { ToastContainer } from "react-toastify";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "School Management",
  description: "School Management System to Add and View Schools",
};
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // optional, choose the weights you need
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          <Navbar />
          {children}
          <footer className="bg-blue-600 text-white text-center py-8 mt-12">
            <p className="mb-2">© 2025 School Management Project</p>
            <p className="text-sm">Responsive UI with Next.js, Tailwind, and MySQL</p>
          </footer>
        </TanstackProvider>
      </body>
    </html>
  );
}
