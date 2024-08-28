// pages/teams.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface SocialMedia {
  linkedin: string;
  facebook: string;
  instagram: string;
}

interface Member {
  _id: string;
  name: string;
  bio: string;
  department: string;
  socialMedia: SocialMedia;
}

const Teams: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://blogapp.tryasp.net/api/members');
        setMembers(response.data);
      } catch (err) {
        setError('Failed to fetch members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member) => (
          <div key={member._id} className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">{member.name}</h2>
            <p className="text-gray-700 mb-4">{member.bio}</p>
            <p className="text-gray-500 mb-4">{member.department}</p>
            <div className="mt-4 flex space-x-4">
              <a href={`https://${member.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">LinkedIn</a>
              <a href={`https://${member.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">Facebook</a>
              <a href={`https://${member.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">Instagram</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;