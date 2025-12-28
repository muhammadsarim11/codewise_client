'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import { Loader2, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check if redirected from registration
    if (searchParams.get('registered') === 'true') {
      setSuccess('Account created successfully! Please sign in.');
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Backend expects: { email, password }
      const response = await axios.post(`${API_BASE_URL}/signin`, {
        email,
        password
      });

      
      const { accessToken, user } = response.data;
      console.log("accessToken", accessToken);

      if (accessToken) {
        // Store token and user details
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Force a hard refresh or router push to dashboard
        router.push('/'); 
      } else {
        setError('Login failed: No access token received');
      }

    } catch (err: any) {
      // Backend returns { success: false, error: "..." }
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
      <div className="w-full max-w-md space-y-8">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to your CodeWise account
          </p>
        </div>

        <div className="bg-[#0A0A0A] border border-[#333] rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {error && (
              <div className="p-3 flex items-center gap-2 text-sm text-red-400 bg-red-900/20 border border-red-900/50 rounded-md">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 flex items-center gap-2 text-sm text-emerald-400 bg-emerald-900/20 border border-emerald-900/50 rounded-md">
                <CheckCircle size={16} />
                {success}
              </div>
            )}

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

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Link href="/users/forgotpassword" className="text-xs text-gray-500 hover:text-white transition-colors">
                  Forgot password?
                </Link>
              </div>
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
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          {/* Linked to /register to match the file created previously */}
          <Link href="/users/signup" className="text-white hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}