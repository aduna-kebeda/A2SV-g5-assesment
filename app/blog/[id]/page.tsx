'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { fetchBlogById } from '../../store/blogSlice';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';
import Card from '../card/page';

interface BlogDetailPageProps {
  selectedBlog: Blog | null;
  loading: boolean;
  error: string | null;
}

const BlogDetailPage: React.FC = () => {
  const { id } = useParams(); // Extracting the id directly from the URL
  const dispatch = useDispatch();
  const { selectedBlog, loading, error } = useSelector((state: RootState) => state.blogs);
  const skills = selectedBlog?.skills || [];

  useEffect(() => {
    if (id) {
      console.log(`Fetching blog with ID: ${id}`);
      dispatch(fetchBlogById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!selectedBlog) {
      console.log(`No blog found with ID: ${id}`);
    } else {
      console.log('Blog found:', selectedBlog);
    }
  }, [selectedBlog, id]);

  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : selectedBlog ? (
          <BlogContent selectedBlog={selectedBlog} />
        ) : (
          <p>No blog found. Please ensure the ID is correct and that the blog data is available.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

const BlogContent: React.FC<BlogDetailPageProps> = ({ selectedBlog }) => {
  const allBlogs = useSelector((state: RootState) => state.blogs.blogs);
  const skills = selectedBlog?.skills || [];

  const relatedBlogs = allBlogs.filter(blog =>
    blog.skills.some(skill => skills.includes(skill))
  );

  return (
    <article className="prose lg:prose-xl text-center">
      {/* Blog Title and Image */}
      <h1 className="text-3xl font-bold mb-4">{selectedBlog?.title}</h1>
      <img 
        src={selectedBlog?.image} 
        alt={selectedBlog?.title} 
        className="w-[80%] mx-auto rounded-lg mb-4"
      />

      {/* Author Info */}
      <div className="flex items-center justify-center mb-4">
        <img
          src={selectedBlog?.author?.image || '/default-author-image.png'}
          alt={selectedBlog?.author?.name || 'Unknown Author'}
          className="w-16 h-16 rounded-full mr-4 object-cover"
        />
        <div>
          <p className="font-bold text-lg">
            {selectedBlog?.author?.name || 'Unknown Author'}
            {selectedBlog?.author?.role ? ` | ${selectedBlog.author.role}` : ''}
          </p>
          <p className="text-sm text-gray-600">{selectedBlog?.author?.email || 'No Email Provided'}</p>
        </div>
      </div>

      {/* Blog Description */}
      <p className="mb-4 w-[60%] mx-auto text-center">{selectedBlog?.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {selectedBlog?.tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>

      {/* Related Blogs */}
      <section className='w-[80%] mx-auto'>
        <h2 className="text-2xl text-start font-semibold mb-4">Related Blogs</h2>
        <div className="flex flex-wrap gap-4 justify-center">
            {relatedBlogs.map((relatedBlog) => (
            <Card key={relatedBlog._id} blog={relatedBlog} />
            ))}
        </div>
      </section>
    </article>
  );
};

export default BlogDetailPage;