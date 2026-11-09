"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";


export default function SignInPage() {
  const handleSignUP = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const signUpData = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      photoURL: string;
      password: string;
    };
    console.log(signUpData);

    const { data, error } = await authClient.signIn.email({
      ...signUpData,
      callbackURL: "/",
    });

    if (error) {
      console.log(error);
    }
  };
  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#F8F6F0]">
      {/* Left Column: Cozy Library Image & Quote */}
      <div className="relative hidden lg:block lg:col-span-6 overflow-hidden bg-[#183D32]">
        <Image
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop"
          alt="Cozy library interior"
          fill
          className="object-cover opacity-60 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#183D32] via-transparent to-black/30" />

        {/* Quote Overlay at Bottom */}
        <div className="absolute bottom-16 left-12 right-12 z-10 space-y-4">
          <span className="h-1 w-10 block bg-[#C6A15B]" />
          <blockquote className="font-serif text-3xl xl:text-4xl font-normal italic leading-snug text-white">
            &ldquo;A reader lives a thousand lives before he dies.&rdquo;
          </blockquote>
          <p className="font-sans text-xs tracking-widest uppercase text-emerald-200/80">
            — George R.R. Martin
          </p>
        </div>
      </div>

      {/* Right Column: Sign-In Form */}
      <div className="lg:col-span-6 flex flex-col justify-center px-8 sm:px-12 md:px-20 py-12">
        <div className="w-full max-w-md mx-auto space-y-8">
          {/* Header Title Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-6 bg-[#C6A15B]" />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
                Welcome back
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#183D32]">
              Return to your shelf
            </h1>
            <p className="font-sans text-sm text-gray-600">
              Sign in to continue discovering stories worth keeping.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUP} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block font-sans text-xs font-medium uppercase tracking-wider text-gray-700">
                Email address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-[#183D32] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32] transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block font-sans text-xs font-medium uppercase tracking-wider text-gray-700">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-[#183D32] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32] transition-all"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#183D32] focus:ring-[#183D32]"
                />
                <span className="font-sans text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="font-sans text-xs font-medium text-[#183D32] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#183D32] text-white font-medium hover:bg-[#133229] transition-all flex items-center justify-center gap-2 shadow-md"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[#E4E0D5]"></div>
            <span className="flex-shrink mx-4 font-sans text-[10px] uppercase tracking-widest text-gray-400">
              Or continue with
            </span>
            <div className="flex-grow border-t border-[#E4E0D5]"></div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-[#E4E0D5] bg-white text-sm font-medium text-[#183D32] hover:bg-gray-50 transition-all shadow-sm"
          >
            {/* Google Icon SVG */}
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.17 21.32 7.23 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24c-.25-.72-.38-1.5-.38-2.24s.13-1.52.38-2.24V6.6H1.18C.43 8.12 0 9.8 0 12s.43 3.88 1.18 5.4l4.09-3.16z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.18 6.6l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            Google
          </button>

          {/* Create Account Link */}
          <p className="text-center font-sans text-xs text-gray-600">
            New to BookNook?{" "}
            <Link
              href="/join"
              className="font-semibold text-[#183D32] hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
