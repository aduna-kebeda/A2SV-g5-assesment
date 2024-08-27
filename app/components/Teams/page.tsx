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
        const response = await axios.get('https://a2sv-backend.onrender.com/api/members');
        setMembers(response.data);
      } catch (err) {
        setError('Failed to fetch members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div key={member._id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-700">{member.bio}</p>
            <p className="text-gray-500">{member.department}</p>
            <div className="mt-2">
              <a href={`https://${member.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 mr-2">LinkedIn</a>
              <a href={`https://${member.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 mr-2">Facebook</a>
              <a href={`https://${member.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">Instagram</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;