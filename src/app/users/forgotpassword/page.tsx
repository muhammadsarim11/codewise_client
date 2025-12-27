'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Mail, 
  KeyRound, 
  Lock, 
  ArrowRight, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft 
} from 'lucide-react';

export default function ForgotPassword() {
  const router = useRouter();
  
  // State
  const [step, setStep] = useState<1 | 2>(1); // 1 = Email, 2 = OTP & New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  // Step 1: Request OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // Backend: router.post("/forgot-password", forgotPassword)
      // Expects: { email }
      await axios.post('http://localhost:5000/forgot-password', { email });
      
      setStatus({ 
        type: 'success', 
        message: 'OTP sent! Please check your email inbox (and spam).' 
      });
      setStep(2); // Move to next step
    } catch (error: any) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to send OTP. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // Backend: router.post("/reset-password", resetPassword)
      // Expects: { email, otp, newpassword }
      await axios.post('http://localhost:5000/reset-password', {
        email,
        otp,
        newpassword: newPassword
      });

      setStatus({ 
        type: 'success', 
        message: 'Password reset successful! Redirecting to login...' 
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/users/signin');
      }, 2000);

    } catch (error: any) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Invalid OTP or expired.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] font-sans text-white flex flex-col items-center justify-center p-6 selection:bg-white selection:text-black">
      
      {/* Background Grid Pattern */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-20" 
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="w-full max-w-md bg-[#111111] border border-[#333333] rounded-xl shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-8 pb-6 text-center border-b border-[#333333]">
          <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-[#333]">
            <KeyRound className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            {step === 1 ? 'Reset Password' : 'Secure Account'}
          </h1>
          <p className="text-[#888] text-sm mt-2 font-mono">
            {step === 1 
              ? 'Enter your email to receive a verification code.' 
              : `Enter the code sent to ${email}`
            }
          </p>
        </div>

        {/* Form Container */}
        <div className="p-8 pt-6">
          
          {/* Status Alert */}
          {status && (
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 border ${
              status.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {status.type === 'success' ? <CheckCircle2 size={18} className="mt-0.5" /> : <AlertCircle size={18} className="mt-0.5" />}
              <p className="text-xs font-mono leading-relaxed">{status.message}</p>
            </div>
          )}

          {step === 1 ? (
            /* --- STEP 1: EMAIL FORM --- */
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#888] uppercase ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-[#666]" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-black border border-[#333] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white transition-colors placeholder:text-[#444]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <>Send Code <ArrowRight size={16} /></>}
              </button>
            </form>
          ) : (
            /* --- STEP 2: OTP FORM --- */
            <form onSubmit={handleResetPassword} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#888] uppercase ml-1">OTP Code</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound size={16} className="text-[#666]" />
                  </div>
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full bg-black border border-[#333] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white transition-colors placeholder:text-[#444] tracking-widest"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#888] uppercase ml-1">New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-[#666]" />
                  </div>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Create new password"
                    className="w-full bg-black border border-[#333] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white transition-colors placeholder:text-[#444]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : 'Set New Password'}
              </button>
              
              <button 
                type="button"
                onClick={() => { setStep(1); setStatus(null); }}
                className="w-full text-xs text-[#666] hover:text-white mt-2 transition-colors"
              >
                Change email address
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/50 border-t border-[#333333] text-center">
          <Link href="/users/signin" className="inline-flex items-center gap-2 text-xs text-[#888] hover:text-white transition-colors">
            <ArrowLeft size={12} /> Back to Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}