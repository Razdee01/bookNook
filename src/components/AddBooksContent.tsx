"use client";

import { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import getTokenFromClient from "@/lib/getTokenFromClient";
import { toast } from "sonner";

const AddBooksContent = () => {
     const { data: session } = authClient.useSession();
     const user = session?.user;

     const [descriptionLength, setDescriptionLength] = useState(0);

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();

       const formData = new FormData(e.currentTarget);
       const fromEntries = Object.fromEntries(formData.entries());

       const jwtToken = await getTokenFromClient();

       // Use this token for authenticated requests to external services

       const bookData = {
         ...fromEntries,
         addedDate: new Date().toISOString(),
         addedBy: user?.email,
       };
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-books`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           authorization: `bearer ${jwtToken}`,
         },
         body: JSON.stringify(bookData),
       });
       const result = await res.json();
       console.log(result);

       if (result) {
        toast.success("You have successfully added this book")
         redirect("/books");
       }
     };
    return (
      <div>
        <main className="flex-1 px-6 py-12 lg:py-16">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="h-[1px] w-6 bg-[#C6A15B]" />
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
                  Grow the collection
                </span>
                <span className="h-[1px] w-6 bg-[#C6A15B]" />
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32]">
                Add a new book
              </h1>

              <p className="font-sans text-sm text-gray-600">
                Share a title worth discovering with the BookNook community.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E8E4DA] bg-white p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-3 pb-6 mb-6 border-b border-[#E8E4DA]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#183D32] text-white">
                  <Plus className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#183D32]">
                    Book details
                  </h3>
                  <p className="font-sans text-xs text-gray-500">
                    Fields marked with an asterisk are required.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Book title <span className="text-[#C6A15B]">*</span>
                    </label>

                    <input
                      name="title"
                      type="text"
                      placeholder="e.g. The Midnight Library"
                      className="w-full h-11 px-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-[#183D32] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32] transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Author <span className="text-[#C6A15B]">*</span>
                    </label>

                    <input
                      name="author"
                      type="text"
                      placeholder="e.g. Matt Haig"
                      className="w-full h-11 px-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-[#183D32] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Category <span className="text-[#C6A15B]">*</span>
                    </label>

                    <div className="relative">
                      <select
                        name="category"
                        className="w-full h-11 px-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32] transition-all appearance-none cursor-pointer"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        <option value="fiction">Fiction</option>
                        <option value="history">History</option>
                        <option value="kids">Kids</option>
                        <option value="science">Science</option>
                        <option value="others">Others</option>
                      </select>

                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Number of copies <span className="text-[#C6A15B]">*</span>
                    </label>

                    <input
                      name="copies"
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="w-full h-11 px-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-[#183D32] focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Cover image URL <span className="text-[#C6A15B]">*</span>
                  </label>

                  <input
                    name="image"
                    type="url"
                    placeholder="https://example.com/book-cover.jpg"
                    className="w-full h-11 px-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-[#183D32] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32] transition-all"
                    required
                  />

                  <p className="text-xs text-gray-400">
                    Paste a direct link to the book cover image.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Description <span className="text-[#C6A15B]">*</span>
                  </label>

                  <div className="relative">
                    <textarea
                      name="description"
                      rows={4}
                      placeholder="Write a thoughtful summary that helps readers discover this book..."
                      maxLength={800}
                      onChange={(e) =>
                        setDescriptionLength(e.target.value.length)
                      }
                      className="w-full p-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-[#183D32] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32] transition-all resize-none"
                      required
                    />

                    <div className="absolute bottom-3 right-3 font-sans text-[10px] text-gray-400">
                      {descriptionLength} / 800 characters
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8E4DA]">
                  <button
                    type="button"
                    className="font-sans text-sm font-medium text-gray-600 hover:text-[#183D32] transition-colors"
                  >
                    Save as draft
                  </button>

                  <Button
                    type="submit"
                    className="bg-[#183D32] px-6 h-11 text-sm font-medium text-white shadow-md hover:bg-[#133229] flex items-center gap-2"
                  >
                    Add to collection
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
};

export default AddBooksContent;