
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Banner() {
  return (
    <section className="bg-[#F8F6F0] py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Typography & CTAs */}
          <div className="space-y-6">
            {/* Tagline Accent */}
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-6 bg-[#C6A15B]" />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
                Your Next Chapter Awaits
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl font-bold leading-tight text-[#183D32] sm:text-5xl lg:text-6xl">
              Every Book Opens <br />a{" "}
              <span className="font-serif italic font-normal text-[#C6A15B]">
                New World
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="max-w-xl font-sans text-base leading-relaxed text-gray-600 sm:text-lg">
              Explore stories that stay with you, ideas that move you, and
              voices that change the way you see the world.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button className="h-12 bg-[#183D32] px-6 text-sm font-medium text-white shadow-md hover:bg-[#133229]">
                <Link href="/books" className="flex items-center gap-2">
                  Browse books
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="h-12 border border-[#E8E4DA] bg-white/60 px-6 text-sm font-medium text-[#183D32] hover:bg-white"
              >
                <Link href="/how-it-works" className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F8F6F0] text-[#C6A15B]">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  How it works
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Featured Library Hero Image & Overlays */}
          <div className="relative">
            {/* Main Arch-Corner Image Wrapper */}
            <div className="relative overflow-hidden rounded-b-[2rem] rounded-tl-[100px] rounded-tr-[2rem] shadow-xl md:rounded-tl-[160px]">
              <Image
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop"
                alt="Cozy library background"
                width={700}
                height={550}
                className="h-[420px] w-full object-cover sm:h-[500px]"
                priority
              />

              {/* Top Right Floating Badge */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#183D32]" />
                <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#183D32]">
                  Curated with care
                </span>
              </div>
            </div>

            {/* Bottom-Left Overlay Card: Editor's Pick */}
            <div className="absolute -bottom-6 -left-4 z-10 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3.5 shadow-lg sm:-bottom-8 sm:left-4 sm:p-4">
              <div className="relative h-14 w-12 flex-shrink-0 overflow-hidden rounded bg-gray-100 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop"
                  alt="The Creative Act cover"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pr-4">
                <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-[#C6A15B]">
                  Editor&apos;s Pick
                </span>
                <h4 className="font-serif text-sm font-bold text-[#183D32]">
                  The Creative Act
                </h4>
                <p className="font-sans text-xs text-gray-500">Rick Rubin</p>
              </div>
            </div>

            {/* Bottom-Right Floating Circle Badge */}
            <div className="absolute -bottom-4 -right-2 z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#183D32] text-center text-white shadow-xl sm:-bottom-6 sm:right-4 sm:h-28 sm:w-28">
              <span className="font-serif text-2xl font-bold leading-none text-[#C6A15B] sm:text-3xl">
                12k
              </span>
              <span className="mt-1 font-sans text-[9px] font-medium uppercase tracking-wider text-emerald-100 sm:text-[10px]">
                Books to <br />
                discover
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
