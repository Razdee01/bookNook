import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

const categories = [
  {
    name: "Fiction",
    count: "2,480 BOOKS",
    description: "Stories to get lost in",
    href: "/categories/fiction",
    bgColor: "bg-[#ECEAE2]",
  },
  {
    name: "History",
    count: "860 BOOKS",
    description: "The past, brought to life",
    href: "/categories/history",
    bgColor: "bg-[#E6DEC]", // Soft warm beige tint
  },
  {
    name: "Art & Design",
    count: "640 BOOKS",
    description: "Ideas made visible",
    href: "/categories/art-design",
    bgColor: "bg-[#DAE2DC]", // Soft muted sage tint
  },
  {
    name: "Science",
    count: "970 BOOKS",
    description: "Questions that shape us",
    href: "/categories/science",
    bgColor: "bg-[#D9E1E4]", // Soft muted slate tint
  },
];

export function CategorySection() {
  return (
    <section className="bg-[#F8F6F0] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-12 space-y-3">
          {/* Tagline Accent */}
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-6 bg-[#C6A15B]" />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
              Find your shelf
            </span>
          </div>

          {/* Section Heading */}
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#183D32] sm:text-4xl lg:text-5xl">
            Browse by category
          </h2>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`group flex flex-col justify-between rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${category.bgColor}`}
            >
              {/* Top Graphic Placeholder (Book Icon + Colored Accent Lines) */}
              <div className="mb-12 space-y-2">
                <div className="flex items-center gap-2 text-[#183D32]">
                  <BookOpen className="h-6 w-6 stroke-[1.75]" />
                  <span className="h-2.5 w-8 rounded-full bg-[#C6A15B]" />
                </div>
                <div className="h-2.5 w-12 rounded-full bg-[#183D32]/70" />
              </div>

              {/* Bottom Content Area */}
              <div className="space-y-3">
                {/* Book Count Tag */}
                <span className="block font-sans text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  {category.count}
                </span>

                {/* Category Title */}
                <h3 className="font-serif text-2xl font-bold text-[#183D32]">
                  {category.name}
                </h3>

                {/* Subtitle / Description with Hovering Arrow */}
                <div className="flex items-center justify-between pt-1">
                  <span className="font-sans text-xs text-gray-600 sm:text-sm">
                    {category.description}
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#183D32] transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
