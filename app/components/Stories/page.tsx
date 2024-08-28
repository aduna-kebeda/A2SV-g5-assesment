// pages/success-stories.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Story {
  heading: string;
  paragraph: string;
  _id: string;
}

interface SuccessStory {
  _id: string;
  personName: string;
  imgURL: string;
  role: string;
  location: string;
  story: Story[];
}

const SuccessStories: React.FC = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://blogapp.tryasp.net/api/success-stories');
        setStories(response.data);
      } catch (err) {
        setError('Failed to fetch success stories');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Success Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div key={story._id} className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={story.imgURL} alt={story.personName} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">{story.personName}</h2>
            <p className="text-gray-700 mb-2">{story.role}</p>
            <p className="text-gray-500 mb-4">{story.location}</p>
            {story.story.map((s) => (
              <div key={s._id} className="mt-2">
                <h3 className="text-lg font-semibold text-gray-800">{s.heading}</h3>
                <p className="text-gray-700">{s.paragraph}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;