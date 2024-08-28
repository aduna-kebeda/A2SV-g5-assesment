'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Blog from '../../../type/blog'

interface CardProps {
  id:string;
  blog: Blog;
}

const Card: React.FC<CardProps> = ({ blog,id }) => {
  const authorImage = blog.author?.image || '/default-author-image.png';
  const authorName = blog.author?.name || 'Unknown Author';
  const postDate = new Date(blog.createdAt).toDateString();
  
  // State for description expansion
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDescriptionLength = 100; // Maximum length for the truncated description

  // Function to toggle the expanded state
  const toggleDescription = () => setIsExpanded(!isExpanded);

  // Truncated description
  const truncatedDescription = blog.description.length > maxDescriptionLength
    ? `${blog.description.substring(0, maxDescriptionLength)}...`
    : blog.description;

  return (
    <Link href={`/blog/${blog._id}`} legacyBehavior>
      <a className="block w-full max-w-sm mx-auto mb-2"> {/* Reduced margin-bottom */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-rows-[auto_1fr_auto] gap-4 transition-shadow duration-300 hover:shadow-xl">
          {/* Posted Image */}
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full object-cover h-48 rounded-t-lg"
          />

          {/* Content Section */}
          <div className="p-4 flex flex-col">
            {/* Blog Title */}
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>

            {/* Profile Information */}
            <div className="flex items-center mb-4">
              <img
                src={authorImage}
                alt={authorName}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="font-bold text-lg">{authorName}</p>
                <p className="text-sm text-gray-600">{postDate}</p>
              </div>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Blog Description */}
            <p className="text-gray-700 mb-4">
              {isExpanded ? blog.description : truncatedDescription}
            </p>
          </div>

          {/* Footer: Like and Comment Count */}
          <div className="p-4 flex justify-between items-center text-gray-600">
            <span className="text-sm">{blog.likes} Likes</span>
            {blog.description.length > maxDescriptionLength && (
              <button
                onClick={toggleDescription}
                className="text-blue-500 hover:underline"
              >
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;