'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import { Loader2, ArrowRight } from 'lucide-react';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState(''); // Added required bio field
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Backend Structure Requirement: name, email, bio, password
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        name,
        email,
        bio,
        password
      });

      // Your SignUp controller returns 201 on success but NO token.
      // Therefore, we must redirect the user to login manually.
      if (response.status === 201) {
        router.push('/users/signin?registered=true');
      }

    } catch (err: any) {
      // Backend returns { error: "Message" }
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
      <div className="w-full max-w-md space-y-8">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">Create an account</h1>
          <p className="mt-2 text-sm text-gray-400">
            Get started with CodeWise today
          </p>
        </div>

        <div className="bg-[#0A0A0A] border border-[#333] rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleRegister} className="space-y-5">
            
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-900/50 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                required
                className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                required
                className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Added Bio Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Bio</label>
              <input
                type="text"
                required
                className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                placeholder="Tell us a bit about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                required
                className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 rounded-lg font-medium transition-all"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/users/signin" className="text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}