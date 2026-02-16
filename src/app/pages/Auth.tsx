import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Chrome, ArrowLeft } from "lucide-react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import { auth, googleProvider } from "../../firebase"; // Adjust the path as needed

export function AuthPage() {

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();

  // 🔥 Updated logic (UI untouched)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {

        if (password !== confirm) {
          alert("Passwords do not match");
          return;
        }

        await createUserWithEmailAndPassword(auth, email, password);
      }

      navigate('/dashboard');

    } catch (err: any) {
      alert(err.message);
    }
  };

  // 🔥 Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex w-1/2 bg-[#FAFAFA] relative items-center justify-center overflow-hidden border-r border-[#F0F0F0]">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FADADD]/20 to-[#F6A5C0]/20" />
        <div className="relative z-10 p-12 text-center max-w-lg">
            <h2 className="text-4xl font-bold text-[#111111] mb-6">Unlock the Power of Data</h2>
            <p className="text-[#666666] text-lg leading-relaxed">
                Join thousands of professionals using Gynex AI to automate their document workflows and gain actionable insights instantly.
            </p>
            <div className="mt-12 relative shadow-2xl rounded-xl overflow-hidden border border-[#F0F0F0]">
                <img 
                    src="https://images.unsplash.com/photo-1758598305014-2e8daf37b2b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGJyaWdodCUyMG1vZGVybiUyMHNvZnR3YXJlJTIwZGFzaGJvYXJkJTIwbW9ja3VwJTIwb24lMjBsYXB0b3AlMjBzY3JlZW58ZW58MXx8fHwxNzcxMDEzMjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                    alt="Dashboard Preview" 
                    className="opacity-90 hover:scale-105 transition-transform duration-700"
                />
            </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-24 relative bg-white">
        <Link to="/" className="absolute top-8 left-8 text-[#999999] hover:text-[#111111] flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="max-w-md w-full mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#111111] mb-2">
                    {isLogin ? "Welcome back" : "Create your account"}
                </h1>
                <p className="text-[#666666]">
                    {isLogin ? "Enter your credentials to access your account." : "Start your free 14-day trial. No credit card required."}
                </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
                {!isLogin && (
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#666666]">Full Name</Label>
                        <Input 
                            id="name" 
                            placeholder="John Doe"
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#666666]">Email Address</Label>
                    <Input 
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#666666]">Password</Label>
                    <Input 
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                {!isLogin && (
                     <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-[#666666]">Confirm Password</Label>
                        <Input 
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            onChange={(e)=>setConfirm(e.target.value)}
                        />
                    </div>
                )}
                
                <Button className="w-full bg-[#F6A5C0] text-white hover:bg-[#EC8AAE] font-bold mt-2 border-none">
                    {isLogin ? "Sign In" : "Create Account"}
                </Button>
            </form>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-[#F0F0F0]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-[#999999]">
                        Or continue with
                    </span>
                </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-[#F0F0F0] text-[#666666] hover:text-[#111111] hover:bg-[#FAFAFA] bg-white"
              onClick={handleGoogleLogin}
            >
                <Chrome className="mr-2 h-4 w-4" />
                Google
            </Button>

            <div className="mt-8 text-center text-sm">
                <span className="text-[#666666]">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button 
                    onClick={() => setIsLogin(!isLogin)} 
                    className="text-[#F6A5C0] hover:text-[#EC8AAE] font-semibold"
                >
                    {isLogin ? "Sign up" : "Log in"}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
