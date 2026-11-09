import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight } from "lucide-react";
import { IBook } from "@/type/type";

const NewArivals = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/new-arrivals`, {
    cache: "no-store",
  });
  const books: IBook[] = await res.json();

  return (
    <Link href="/books" className="bg-[#F8F6F0] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            {/* Tagline Accent */}
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-6 bg-[#C6A15B]" />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
                Fresh on the shelves
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32]">
              New arrivals
            </h2>
          </div>

          {/* View All Books Link */}
          <button className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#183D32] hover:text-[#C6A15B] transition-colors">
            View all books
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Book Cards Grid (6 Columns on large screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {books?.map((book) => (
            <div
              key={book._id}
              className="group flex flex-col justify-between rounded-2xl bg-white/60 p-4 border border-[#E8E4DA] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div>
                {/* Book Cover Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 mb-4 shadow-sm">
                  <Image
                    src={
                      book.image ||
                      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop"
                    }
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Top-Left "NEW" Badge */}
                  <div className="absolute top-2.5 left-2.5 rounded-full bg-[#183D32] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow">
                    NEW
                  </div>

                  {/* Top-Right Favorite Heart Button */}
                  <button
                    type="button"
                    aria-label="Save to favorites"
                    className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md backdrop-blur-sm transition-colors hover:text-[#183D32]"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>

                {/* Category Label */}
                <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  {book.category}
                </span>

                {/* Book Title */}
                <h3 className="font-serif text-base font-bold text-[#183D32] line-clamp-2 mb-1">
                  {book.title}
                </h3>

                {/* Author Name */}
                <p className="font-sans text-xs text-gray-500 line-clamp-1 mb-4">
                  {book.author}
                </p>
              </div>

              {/* Card Footer: Availability Indicator & Arrow */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#183D32]" />
                  <span className="font-sans text-gray-600 font-medium">
                    Available
                  </span>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F8F6F0] text-[#183D32] transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default NewArivals;
