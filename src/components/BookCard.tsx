"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Star,
  X,
  Calendar,
  User,
  Mail,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { IBook } from "@/type/type";
import { Button } from "@/components/ui/button";

const BookCard = ({ BookData }: { BookData: IBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Calculate return date (1 month from today)
  const today = new Date();
  const returnDate = new Date(today);
  returnDate.setMonth(returnDate.getMonth() + 1);

  const formattedReturnDate = returnDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleBorrowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const borrowPayload = {
      bookId: BookData._id,
      bookTitle: BookData.title,
      userName: user?.name,
      userEmail: user?.email,
      borrowDate: today.toISOString(),
      returnDate: returnDate.toISOString(),
    };

    
    try {
      
      const res = await fetch("http://localhost:5000/borrows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(borrowPayload),
      });

      if (res.ok) {
        setIsOpen(false);
        console.log("done");
        
        // Handle success notification or state update here
      }
    } catch (err) {
      console.error("Borrow error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] py-10 px-6 lg:px-16">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Back Link */}
        <Link
          href="/books"
          className="inline-flex items-center gap-2 font-sans text-sm font-medium text-gray-600 hover:text-[#183D32] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to collection
        </Link>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Book Image Card */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-4">
            <div className="relative w-full aspect-[3/4] max-w-md rounded-3xl bg-[#E8E4D9] p-8 flex items-center justify-center shadow-sm">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={
                    BookData.image && BookData.image.trim() !== ""
                      ? BookData.image
                      : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"
                  }
                  alt={BookData.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex items-center gap-2 font-sans text-xs text-gray-500 pt-2">
              <ShieldCheck className="h-4 w-4 text-[#C6A15B]" />
              <span>Secure library lending</span>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Categories & Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#EAE5D9] px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                {BookData.category || "General"}
              </span>
              <span className="rounded-full bg-[#EAE5D9] px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                Contemporary
              </span>
            </div>

            {/* Title & Author */}
            <div className="space-y-1">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32]">
                {BookData.title}
              </h1>
              <p className="font-sans text-base text-gray-600">
                by <span className="font-semibold text-[#183D32]">{BookData.author}</span>
              </p>
            </div>

            {/* Ratings Placeholder */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex text-[#C6A15B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#183D32]">4.6</span>
              <span className="text-gray-400">· 2,184 reader ratings</span>
            </div>

            <hr className="border-[#E8E4DA]" />

            {/* Description */}
            <p className="font-sans text-sm sm:text-base text-gray-700 leading-relaxed">
              {BookData.description}
            </p>

            {/* Added By User Metadata */}
            {(BookData.username || BookData.useremail) && (
              <div className="rounded-xl bg-[#EFECE3] p-4 font-sans text-xs text-gray-600 space-y-1">
                <span className="font-semibold uppercase tracking-wider text-gray-500 block">
                  Added to collection by:
                </span>
                <p className="text-[#183D32] font-medium">
                  {BookData.username} {BookData.useremail && `(${BookData.useremail})`}
                </p>
              </div>
            )}

            {/* Quick Specs Table */}
            <div className="grid grid-cols-4 gap-4 py-4 border-y border-[#E8E4DA] font-sans text-xs">
              <div>
                <span className="block font-semibold uppercase tracking-wider text-gray-400">
                  Published
                </span>
                <span className="font-bold text-[#183D32] text-sm">2020</span>
              </div>
              <div>
                <span className="block font-semibold uppercase tracking-wider text-gray-400">
                  Pages
                </span>
                <span className="font-bold text-[#183D32] text-sm">304</span>
              </div>
              <div>
                <span className="block font-semibold uppercase tracking-wider text-gray-400">
                  Language
                </span>
                <span className="font-bold text-[#183D32] text-sm">English</span>
              </div>
              <div>
                <span className="block font-semibold uppercase tracking-wider text-gray-400">
                  ISBN
                </span>
                <span className="font-bold text-[#183D32] text-sm">978-0-52</span>
              </div>
            </div>

            {/* Borrow Action Box */}
            <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl bg-[#EAE5D8] p-5 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#183D32] text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-[#183D32]">
                    Available to borrow
                  </h4>
                  <p className="font-sans text-xs text-gray-600">
                    3 of 5 copies are on the shelf
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setIsOpen(true)}
                className="w-full sm:w-auto h-12 bg-[#183D32] px-7 text-sm font-medium text-white shadow-md hover:bg-[#133229] flex items-center gap-2"
              >
                Borrow this book
                <BookOpen className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-7 space-y-3 shadow-2xl ">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8F6F0] text-[#183D32]">
              <BookOpen className="h-6 w-6" />
            </div>

            {/* Modal Titles */}
            <div className="space-y-1">
              <span className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
                Confirm your borrow
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#183D32]">
                Ready to begin?
              </h3>
            </div>

            {/* Book Mini Card */}
            <div className="flex items-center gap-4 rounded-2xl bg-[#F8F6F0] p-4">
              <div className="relative h-14 w-10 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={
                    BookData.image && BookData.image.trim() !== ""
                      ? BookData.image
                      : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop"
                  }
                  alt={BookData.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#183D32] line-clamp-1">
                  {BookData.title}
                </h4>
                <p className="font-sans text-xs text-gray-500">{BookData.author}</p>
              </div>
            </div>

            {/* Form with Read-only User details & Return date */}
            <form onSubmit={handleBorrowSubmit} className="space-y-4">
              {/* Read-only User Name */}
              <div className="space-y-1">
                <label className="block font-sans text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  User Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={user?.name || "Guest Reader"}
                    readOnly
                    className="w-full h-10 pl-9 pr-4 rounded-lg bg-gray-100 border border-gray-200 font-sans text-xs text-gray-700 cursor-not-allowed focus:outline-none"
                  />
                </div>
              </div>

              {/* Read-only User Email */}
              <div className="space-y-1">
                <label className="block font-sans text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  User Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    value={user?.email || "guest@example.com"}
                    readOnly
                    className="w-full h-10 pl-9 pr-4 rounded-lg bg-gray-100 border border-gray-200 font-sans text-xs text-gray-700 cursor-not-allowed focus:outline-none"
                  />
                </div>
              </div>

              {/* Calculated Return Date (1 month) */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F6F0] text-[#C6A15B]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-sans text-[11px] text-gray-500">
                    Return by
                  </span>
                  <span className="font-sans text-sm font-bold text-[#183D32]">
                    {formattedReturnDate}
                  </span>
                </div>
              </div>

              <p className="font-sans text-xs text-gray-500 pt-1">
                You&apos;ll have 1 month to enjoy this title. You can return it anytime.
              </p>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#183D32] text-sm font-medium text-white hover:bg-[#133229] shadow-md transition-all"
                >
                  {isSubmitting ? "Processing..." : "Confirm borrow"}
                </Button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 font-sans text-xs font-semibold text-gray-600 hover:text-[#183D32] transition-colors text-center"
                >
                  Maybe later
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;