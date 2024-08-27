'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterBlogs }from '../../store/blogSlice';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    dispatch(filterBlogs(e.target.value));
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search blogs..."
      className="w-[30%] p-2 border border-gray-300 rounded-full"
    />
  );
};

export default SearchBar;
