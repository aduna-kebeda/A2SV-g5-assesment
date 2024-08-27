'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    // If login is successful, navigate to the home page
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[95%] max-w-6xl bg-white shadow-lg rounded-lg flex overflow-hidden">
        
        {/* Left side */}
        <div className="w-1/2 bg-white p-16 flex flex-col justify-between">
          {/* Logo - Positioned at the top left */}
          <div className="w-full flex justify-start">
            <img src="/logo.png" alt="Next.js Logo" width={200} height={40} />
          </div>
          {/* Welcome */}
          <div className="flex items-center mt-auto mb-24">
            <img src="/welcome.png" alt="Welcome" width={150} height={30} className="mr-4" />
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-lg text-gray-600">Login to receive blogs and learn more about A2SV</p>
            </div>
          </div>
        </div>
        
        {/* Right side */}
        <div className="w-1/2 bg-blue-600 p-16 flex flex-col justify-center items-center text-white relative">
          {/* Signup link - Positioned at the top right */}
          <Link href="/auth/signup" className="absolute top-4 right-4 text-white underline">
            Signup
          </Link>
          {/* Form */}
          <form className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg text-black" onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <p className="mb-6 text-gray-600 text-lg text-center">Enter your details to sign in to your account</p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;