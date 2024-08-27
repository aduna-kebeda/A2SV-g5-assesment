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
        const response = await axios.get('https://a2sv-backend.onrender.com/api/success-stories');
        setStories(response.data);
      } catch (err) {
        setError('Failed to fetch success stories');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Success Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map((story) => (
          <div key={story._id} className="border p-4 rounded-lg shadow-md">
            <img src={story.imgURL} alt={story.personName} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold">{story.personName}</h2>
            <p className="text-gray-700">{story.role}</p>
            <p className="text-gray-500">{story.location}</p>
            {story.story.map((s) => (
              <div key={s._id} className="mt-2">
                <h3 className="text-lg font-semibold">{s.heading}</h3>
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