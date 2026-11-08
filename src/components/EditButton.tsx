"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, X, Plus } from "lucide-react";
import { IBook } from "@/type/type";
import { Button } from "@/components/ui/button";

interface IProps {
  book: IBook
}

const EditButton = ({ book }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData);

    try {
      const res = await fetch(`http://localhost:5000/patch/${book._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        // Success Toast Notification
        alert("Book updated successfully!");
        setIsOpen(false);
        router.refresh(); 
      } else {
        alert("Failed to update book. Please try again.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Edit Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E0D5] bg-white text-gray-600 hover:text-[#183D32] hover:bg-gray-50 transition-colors shadow-sm"
        title="Edit book"
      >
        <Edit className="h-3.5 w-3.5" />
      </button>

      {/* Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl space-y-6 my-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-[#C6A15B]" />
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
                  Modify Record
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#183D32]">
                Edit book details
              </h2>
              <p className="font-sans text-xs text-gray-500">
                Update the information for &ldquo;{book.title}&rdquo;.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Row 1: Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Book title *
                  </label>
                  <input
                    name="title"
                    defaultValue={book.title}
                    type="text"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-[#183D32] focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Author *
                  </label>
                  <input
                    name="author"
                    defaultValue={book.author}
                    type="text"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-[#183D32] focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32]"
                  />
                </div>
              </div>

              {/* Row 2: Category & Copies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Category *
                  </label>
                  <input
                    name="category"
                    defaultValue={book.category}
                    type="text"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-[#183D32] focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Copies
                  </label>
                  <input
                    name="copies"
                    defaultValue={book.copies || 1}
                    type="number"
                    min="1"
                    className="w-full h-11 px-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-[#183D32] focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32]"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Cover Image URL *
                </label>
                <input
                  name="image"
                  defaultValue={book.image}
                  type="url"
                  required
                  className="w-full h-11 px-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-[#183D32] focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32]"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Description *
                </label>
                <textarea
                  name="description"
                  defaultValue={book.description}
                  rows={4}
                  required
                  className="w-full p-4 rounded-lg border border-[#E4E0D5] bg-white text-sm text-[#183D32] focus:outline-none focus:ring-2 focus:ring-[#183D32]/20 focus:border-[#183D32] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E4DA]">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E4E0D5] bg-white text-xs font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#183D32] hover:bg-[#133229] text-white px-6 h-11 rounded-xl shadow-md font-medium flex items-center gap-2"
                >
                  {isSubmitting ? "Saving changes..." : "Save changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditButton;
