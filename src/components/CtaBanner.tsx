import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="bg-[#F8F6F0] py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Main Dark Green Banner Box */}
        <div className="relative overflow-hidden rounded-3xl bg-[#183D32] px-8 py-14 md:px-16 md:py-20 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left/Center Text Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Tagline Accent */}
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-[#C6A15B]" />
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
                  Make room for wonder
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white max-w-xl">
                Your next great read is closer than you think.
              </h2>

              {/* Subtitle */}
              <p className="font-sans text-base sm:text-lg text-emerald-100/80">
                Join thousands of readers and start borrowing today.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <Button
                  asChild
                  className="h-12 bg-white px-8 text-sm font-medium text-[#183D32] shadow-md hover:bg-emerald-50"
                >
                  <Link href="/join" className="flex items-center gap-2">
                    Become a member
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Side: Larger Stacked Books Graphic & Sparkle */}
            <div className="lg:col-span-4 relative flex justify-center lg:justify-end items-center mt-12 lg:mt-0">
              <div className="relative w-64 h-56 flex items-center justify-center">
                {/* Sparkle Icon Positioned Top-Right of the Stack */}
                <div className="absolute -top-6 right-8 text-[#C6A15B] z-30 animate-pulse">
                  <Sparkles className="h-7 w-7" />
                </div>

                {/* Larger Stacked Books Container */}
                <div className="relative w-56 h-48 flex items-center justify-center">
                  {/* Book 1 (Red/Terracotta - Left, Taller) */}
                  <div className="absolute w-28 h-52 bg-[#C05A46] rounded-md shadow-2xl -rotate-12 -translate-x-14 translate-y-1 flex items-center justify-center border border-white/10">
                    <span className="font-serif text-xs tracking-widest text-white/90 uppercase rotate-90 font-medium">
                      BOOKNOOK
                    </span>
                  </div>

                  {/* Book 2 (Gold/Cream - Middle, Taller) */}
                  <div className="absolute w-28 h-54 bg-[#EAD9B4] rounded-md shadow-xl -rotate-3 -translate-x-3 translate-y-2 flex items-center justify-center border border-black/5"></div>

                  {/* Book 3 (Sage Green - Right, Taller) */}
                  <div className="absolute w-28 h-52 bg-[#8FA89B] rounded-md shadow-2xl rotate-6 translate-x-8 translate-y-[-4px] flex items-center justify-center border border-white/10">
                    <span className="font-serif text-xs tracking-widest text-[#183D32] uppercase rotate-90 font-semibold">
                      BOOKNOOK
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
