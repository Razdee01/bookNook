import Link from "next/link";
import { Search, BookmarkCheck, BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Browse our considered collection and find a book that speaks to you.",
    icon: Search,
  },
  {
    number: "02",
    title: "Borrow",
    description:
      "Reserve your choice in seconds and pick it up when it suits you.",
    icon: BookmarkCheck,
  },
  {
    number: "03",
    title: "Read & return",
    description:
      "Take your time, enjoy every page, then return and begin again.",
    icon: BookOpenCheck,
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-[#183D32] py-20 lg:py-28 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tagline Accent */}
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-6 bg-[#C6A15B]" />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
                Simple by design
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-4xl sm:text-5xl font-bold leading-tight text-white">
              A better way to <br />
              <span className="font-serif italic font-normal text-[#C6A15B]">
                borrow books
              </span>
            </h2>

            {/* Description */}
            <p className="font-sans text-base sm:text-lg text-emerald-100/80 max-w-md leading-relaxed">
              From first discovery to the final page, BookNook makes your
              reading life beautifully simple.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Button
                asChild
                variant="outline"
                className="h-12 border-[#C6A15B]/60 bg-transparent px-8 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-[#C6A15B]"
              >
                <Link href="/books">Start exploring</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: 3 Steps / Feature Cards with Vertical Dividers */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.number}
                  className={`flex flex-col space-y-4 md:px-4 ${
                    index !== 0 ? "md:border-l md:border-emerald-800/80" : ""
                  }`}
                >
                  {/* Step Icon inside a circle outline */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-700/60 bg-emerald-900/30 text-[#C6A15B]">
                    <IconComponent className="h-5 w-5" />
                  </div>

                  {/* Step Number */}
                  <span className="font-sans text-xs font-bold tracking-widest text-[#C6A15B]">
                    {step.number}
                  </span>

                  {/* Step Title */}
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="font-sans text-sm text-emerald-100/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
