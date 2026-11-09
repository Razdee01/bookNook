import Image from "next/image";
import { Heart, ArrowRight } from "lucide-react";
import { IBook } from "@/type/type";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | All Books",
  description: "Browse the full library collection.",
};
const AllBooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    cache: "no-store",
  });
  const books: IBook[] = await res.json();

  return (
    <section className="bg-[#F8F6F0]  py-16 lg:py-15">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Top Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-6 bg-[#C6A15B]" />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
              Full Catalog
            </span>
            <span className="h-[1px] w-6 bg-[#C6A15B]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#183D32]">
            Find your next great read
          </h1>

          <p className="font-sans text-sm sm:text-base text-gray-600">
            Explore our full collection of stories, ideas, and beautifully
            unexpected discoveries.
          </p>
        </div>

        {/* Small Text Counter Header above the grid */}
        <div className="mb-6 flex items-center justify-between border-b border-[#E8E4DA] pb-4">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-gray-500">
            {books?.length || 0} books in the collection
          </span>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {books?.map((book) => (
            <Link
              href={`/books/${book._id}`}
              key={book._id}
              className="group flex flex-col justify-between rounded-2xl bg-white/70 p-4 border border-[#E8E4DA] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
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

                  {/* Favorite Heart Button */}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllBooks;
