// app/page.tsx
'use client';
import Navbar from './components/Navbar/page';
import Footer from './components/Footer/page';
import SearchBar from './components/SearchBar/page';
import BlogCard from './components/BlogCard/page';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBlogs } from './store/blogSlice';
import { RootState } from './store';  // Adjust the path to your store
import Link from 'next/link';

const BlogListPage: React.FC = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <>
     
      <div className="container mx-auto p-4 pt-2"> {/* Add pt-20 to add padding to the top */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Blogs</h1>
          <div className="flex flex-grow items-center justify-center space-x-4">
            <SearchBar />
            <Link href="/new-blog" legacyBehavior>
              <a className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">+ New Blog</a>
            </Link>
          </div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="w-[90%] mx-auto">
            {blogs.map((blog) => (
              <Link href={`/blog/${blog._id}`} key={blog._id} legacyBehavior>
                <a>
                  <BlogCard blog={blog} />
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default BlogListPage;