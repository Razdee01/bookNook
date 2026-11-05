import Link from "next/link";
import { AtSign, MessageCircle, Send, Globe, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#183D32] text-white pt-16 pb-8 border-t border-emerald-900/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Top Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-emerald-900">
          {/* Column 1: Brand Info & Social Links */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white font-serif font-bold">
                📖
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                BookNook
              </span>
            </div>

            <p className="font-sans text-sm text-emerald-100/70 max-w-xs leading-relaxed">
              A thoughtfully curated library for curious minds and lifelong
              readers.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 text-emerald-200">
              <Link
                href="#"
                className="h-8 w-8 rounded-full border border-emerald-800 flex items-center justify-center hover:bg-emerald-800 transition-colors"
              >
                <AtSign className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="h-8 w-8 rounded-full border border-emerald-800 flex items-center justify-center hover:bg-emerald-800 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="h-8 w-8 rounded-full border border-emerald-800 flex items-center justify-center hover:bg-emerald-800 transition-colors"
              >
                <Send className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="h-8 w-8 rounded-full border border-emerald-800 flex items-center justify-center hover:bg-emerald-800 transition-colors"
              >
                <Globe className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#C6A15B]">
              Explore
            </h4>
            <ul className="space-y-3 font-sans text-sm text-emerald-100/80">
              <li>
                <Link
                  href="/books"
                  className="hover:text-white transition-colors"
                >
                  Browse books
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="hover:text-white transition-colors"
                >
                  New arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/popular"
                  className="hover:text-white transition-colors"
                >
                  Popular reads
                </Link>
              </li>
              <li>
                <Link
                  href="/reading-lists"
                  className="hover:text-white transition-colors"
                >
                  Reading lists
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: BookNook Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#C6A15B]">
              BookNook
            </h4>
            <ul className="space-y-3 font-sans text-sm text-emerald-100/80">
              <li>
                <Link
                  href="/our-story"
                  className="hover:text-white transition-colors"
                >
                  Our story
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="hover:text-white transition-colors"
                >
                  Membership
                </Link>
              </li>
              <li>
                <Link
                  href="/journal"
                  className="hover:text-white transition-colors"
                >
                  Journal
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Stay in the story */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-white">
              Stay in the story
            </h4>
            <p className="font-sans text-sm text-emerald-100/70">
              Monthly reading notes, new titles, and quiet inspiration.
            </p>

            {/* Email Input Form */}
            <form
            //   onSubmit={(e) => e.preventDefault()}
              className="relative pt-2"
            >
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent border-b border-emerald-800 pb-2 text-sm text-white placeholder:text-emerald-100/40 focus:outline-none focus:border-[#C6A15B] transition-colors pr-8"
              />
              <button
                type="submit"
                className="absolute right-0 bottom-2 text-[#C6A15B] hover:text-white transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-emerald-200/60 gap-4">
          <p>© 2026 BookNook Library</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/accessibility" className="hover:underline">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
