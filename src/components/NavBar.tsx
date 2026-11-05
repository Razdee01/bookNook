"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#EBE7DF] bg-[#F8F6F0]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3">
          {/* Replace logo image source with your file in /public */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#183D32] text-white">
            <Image
              src="/bookLogo.png"
              alt="BookNook Logo"
              width={22}
              height={22}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#183D32]">
            BookNook
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 font-sans text-sm font-medium transition-colors hover:text-[#183D32] ${
                  isActive ? "text-[#183D32]" : "text-gray-600"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-[2.5px] rounded-full bg-[#C6A15B]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions (Search & Auth) */}
        <div className="flex items-center space-x-6">
          <button
            type="button"
            className="text-gray-700 transition-colors hover:text-[#183D32]"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            href="/sign-in"
            className="font-sans text-sm font-medium text-[#183D32] transition-colors hover:opacity-80"
          >
            Sign in
          </Link>

          <Button className="text-[#EFECE3] px-6 bg-[#183D32] shadow-sm transition-all hover:bg-[#183D32]/80">
            <Link href="/join">Join free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
