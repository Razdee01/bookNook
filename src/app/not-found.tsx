import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8F6F0] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon Accent */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#183D32] text-white shadow-xl">
          <BookOpen className="h-10 w-10 text-[#C6A15B]" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#C6A15B]">
            Page not found (404)
          </span>
          <h1 className="font-serif text-4xl font-bold text-[#183D32]">
            This page wandered off the shelf.
          </h1>
          <p className="font-sans text-sm text-gray-600">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="pt-4">
          <Button
            asChild
            className="w-full h-12 bg-[#183D32] text-white font-medium hover:bg-[#133229] transition-all flex items-center justify-center gap-2 shadow-md rounded-xl"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
