import Link from 'next/link';
import Blog from '../../../type/blog'

interface BlogCardProps {
  blog: Blog;
  loading: boolean;
}

const Shimmer: React.FC = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-gray-200 h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

const BlogCard: React.FC<BlogCardProps> = ({ blog, loading }) => {
  if (loading) {
    return <Shimmer />;
  }

  // Fallback values for author details
  const authorImage = blog.author?.image || '/default-author-image.png';
  const authorName = blog.author?.name || 'Unknown Author';
  const authorRole = blog.author?.role || 'Unknown Role';
  const postDate = new Date(blog.createdAt).toDateString();

  return (
    <Link href={`/blog/${blog._id}`} className="block w-full mb-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row transition-shadow duration-300 hover:shadow-xl">
        {/* Left Section: Content */}
        <div className="w-full lg:w-2/3 p-6 flex flex-col justify-between">
          <div>
            {/* Author Info */}
            <div className="flex items-center mb-4">
              <img
                src={authorImage}
                alt={authorName}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="font-bold text-lg">{authorName}</p>
                <p className="text-sm text-gray-600">{postDate}</p>
                <p className="text-xs text-gray-500">{authorRole}</p>
              </div>
            </div>
            {/* Blog Title and Description */}
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-700 mb-4">{blog.description}</p>
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
          </div>
          {/* Mobile Image */}
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full lg:hidden object-cover rounded-lg mt-4"
          />
        </div>
        {/* Right Section: Image */}
        <div className="hidden lg:flex lg:w-1/3 p-4 items-center justify-center">
          <img
            src={blog.image}
            alt={blog.title}
            className="max-h-48 object-cover rounded-lg"
          />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;