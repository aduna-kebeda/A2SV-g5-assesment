import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="text-blue-950 py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Image Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <img src="/help.png" alt="Next.js Logo" width={180} height={37} />
          </div>

          {/* Get Involved Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
              Get involved in improving tech education in Africa
            </h3>
            <button className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors duration-300">
              Support Us
            </button>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-blue-400 hover:underline">Home</Link></li>
              <li><Link href="/blog" className="text-blue-400 hover:underline">Blog</Link></li>
              <li><Link href="/about" className="text-blue-400 hover:underline">About</Link></li>
              <li><Link href="/contact" className="text-blue-400 hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Teams Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Teams</h3>
            <ul className="space-y-2">
              <li><Link href="/teams" className="text-blue-400 hover:underline">Board Members</Link></li>
              <li><Link href="/teams" className="text-blue-400 hover:underline">Advisors/Mentors</Link></li>
              <li><Link href="/teams" className="text-blue-400 hover:underline">Executives</Link></li>
              <li><Link href="/teams" className="text-blue-400 hover:underline">Staffs</Link></li>
            </ul>
          </div>

          {/* Blogs Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Blogs</h3>
            <ul className="space-y-2">
              <li><Link href="/blogs" className="text-blue-400 hover:underline">Recent Blogs</Link></li>
              <li><Link href="/blogs" className="text-blue-400 hover:underline">New Blogs</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4 mt-6">
          <p className="text-center text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} African to Silicon Valley. All rights reserved.
          </p>
          {/* Follow Us */}
          <div className="flex flex-wrap justify-center space-x-4">
            <img src="/twitter.png" alt="Twitter" width={20} height={20} /> 
            <img src="/facebook.png" alt="Facebook" width={20} height={20} />
            <img src="/youtube.png" alt="YouTube" width={20} height={20} />
            
            <img src="/linkdlen.png" alt="LinkedIn" width={20} height={20} />
            <img src="/instagram.png" alt="Instagram" width={20} height={20} />

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
