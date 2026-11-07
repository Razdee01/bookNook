import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  BookOpen,
  Library,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface IMyBook {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  copies?: number;
  status?: string;
  addedDate: string;
}

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user.email;

  const res = await fetch(`http://localhost:5000/my-books/${email}`, {
    cache: "no-store",
  });

  const myBooks: IMyBook[] = await res.json();

  // Calculate dynamic stats from actual data if needed, or use defaults
  const totalBooksAdded = myBooks?.length || 0;
  const currentlyBorrowed = 5; // Can be wired up to your borrow endpoint data
  const totalReads = 84;

  return (
    <div className="min-h-screen bg-[#F8F6F0] py-12 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-6 bg-[#C6A15B]" />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
                Your library
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32]">
              My books
            </h1>
            <p className="font-sans text-sm text-gray-600">
              Manage the titles you&apos;ve added to the BookNook collection.
            </p>
          </div>

          {/* Add a new book button */}
          <Button
            asChild
            className="bg-[#183D32] hover:bg-[#133229] text-white h-12 px-6 rounded-xl shadow-md flex items-center gap-2 font-medium"
          >
            <Link href="/add-book">
              Add a new book
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Statistic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl border border-[#E8E4DA] bg-white p-6 shadow-sm flex items-center gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F6F0] text-[#183D32]">
              <Library className="h-6 w-6" />
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-[#183D32]">
                {totalBooksAdded}
              </span>
              <span className="block font-sans text-xs text-gray-500 font-medium">
                Books added
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-[#E8E4DA] bg-white p-6 shadow-sm flex items-center gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F6F0] text-[#183D32]">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-[#183D32]">
                {currentlyBorrowed}
              </span>
              <span className="block font-sans text-xs text-gray-500 font-medium">
                Currently borrowed
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-[#E8E4DA] bg-white p-6 shadow-sm flex items-center gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F6F0] text-[#183D32]">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-[#183D32]">
                {totalReads}
              </span>
              <span className="block font-sans text-xs text-gray-500 font-medium">
                Total reads
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Card Box */}
        <div className="rounded-2xl border border-[#E8E4DA] bg-white shadow-sm overflow-hidden">
          {/* Search & Filter Bar */}
          <div className="p-6 border-b border-[#E8E4DA] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search your books..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E4E0D5] bg-[#F8F6F0]/50 text-sm text-[#183D32] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32] transition-all"
              />
            </div>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E4E0D5] bg-white text-xs font-semibold uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Filter className="h-3.5 w-3.5" />
              Filter
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8E4DA] bg-[#FAF8F5] font-sans text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <th className="py-4 px-6">Book</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Copies</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Added</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DA] font-sans text-sm">
                {myBooks && myBooks.length > 0 ? (
                  myBooks.map((book) => (
                    <tr
                      key={book._id}
                      className="hover:bg-[#FAF8F5]/60 transition-colors"
                    >
                      {/* Book Cover + Title & Author */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative h-14 w-10 flex-shrink-0 overflow-hidden rounded-lg shadow-sm bg-gray-100">
                            <Image
                              src={
                                book.image && book.image.trim() !== ""
                                  ? book.image
                                  : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop"
                              }
                              alt={book.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-serif font-bold text-[#183D32] line-clamp-1">
                              {book.title}
                            </h4>
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {book.author}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 text-gray-600 font-medium text-xs">
                        {book.category || "General"}
                      </td>

                      {/* Copies */}
                      <td className="py-4 px-6 text-gray-600 font-medium text-xs">
                        {book.copies ? `${book.copies} copies` : "1 copy"}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${
                            book.status?.toLowerCase() === "borrowed"
                              ? "bg-amber-100/70 text-amber-800"
                              : "bg-emerald-100/70 text-emerald-800"
                          }`}
                        >
                          {book.status || "Available"}
                        </span>
                      </td>

                      {/* Added Date */}
                      <td className="py-4 px-6 text-gray-500 text-xs">
                        {book.addedDate
                          ? new Date(book.addedDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "May 28, 2025"}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/books/edit/${book._id}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E0D5] bg-white text-gray-600 hover:text-[#183D32] hover:bg-gray-50 transition-colors shadow-sm"
                            title="Edit book"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Link>
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-white text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                            title="Delete book"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      No books added to your library yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="p-4 sm:p-6 border-t border-[#E8E4DA] flex items-center justify-between text-xs text-gray-500">
            <span>
              Showing {myBooks?.length || 0} of {totalBooksAdded} books
            </span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E0D5] bg-white text-gray-400 hover:text-[#183D32] hover:bg-gray-50 transition-colors"
                disabled
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E0D5] bg-white text-gray-700 hover:text-[#183D32] hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooksPage;
