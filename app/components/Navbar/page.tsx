'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const pathname = usePathname(); // Get the current route
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const linkClasses = (href: string) =>
    `hover:text-blue-700 transition-colors duration-300 ${
      pathname === href 
        ? 'text-blue-700 underline underline-offset-4 decoration-4 decoration-blue-700' 
        : 'text-blue-950'
    }`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shadow-md p-4 fixed w-full z-50 bg-white">
      <div className="container mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" passHref>
          <Image src="/logo.png" alt="Next.js Logo" width={180} height={37} priority />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center space-x-6 text-lg font-semibold">
          <Link href="/" className={`${linkClasses('/')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`}>
            Home
          </Link>
          <Link href="/Teams" className={`${linkClasses('/Teams')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`}>
           Teams
          </Link>
          <Link href="/Stories" className={`${linkClasses('/Stories')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`}>
            Success Stories
          </Link>
          <Link href="/about" className={`${linkClasses('/about')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`}>
            About Us
          </Link>
          <Link href="/blogs" className={`${linkClasses('/blogs')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`}>
            Blogs
          </Link>
          <Link href="/get-involved" className={`${linkClasses('/get-involved')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`}>
            Get Involved
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex lg:items-center space-x-6 text-lg font-semibold">
          <Link href="/auth/signin" className={`${linkClasses('/auth/signin')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`}>
            Login
          </Link>
          <Link href="/donate" className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 font-montserrat text-[20px] font-semibold leading-[24.38px] text-center">
            Donate
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center space-y-4 mt-4 text-lg font-semibold">
          <Link href="/" className={`${linkClasses('/')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`} onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/Teams" className={`${linkClasses('/Teams')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`} onClick={toggleMenu}>
            Teams
          </Link>
          <Link href="/Stories" className={`${linkClasses('/Stories')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`} onClick={toggleMenu}>
            Success Stories
          </Link>
          <Link href="/about" className={`${linkClasses('/about')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`} onClick={toggleMenu}>
            About Us
          </Link>
          <Link href="/blogs" className={`${linkClasses('/blogs')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`} onClick={toggleMenu}>
            Blogs
          </Link>
          <Link href="/get-involved" className={`${linkClasses('/get-involved')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`} onClick={toggleMenu}>
            Get Involved
          </Link>
          <Link href="/auth/signin" className={`${linkClasses('/auth/signin')} font-montserrat text-[20px] font-semibold leading-[24.38px] text-center`} onClick={toggleMenu}>
            Login
          </Link>
          <Link href="/donate" className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 font-montserrat text-[20px] font-semibold leading-[24.38px] text-center" onClick={toggleMenu}>
            Donate
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;