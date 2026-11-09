import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col items-center justify-center space-y-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#183D32] text-white shadow-lg animate-pulse">
        <Loader2 className="h-8 w-8 animate-spin text-[#C6A15B]" />
      </div>
      <p className="font-serif text-lg font-medium text-[#183D32]">
        Loading your reading space...
      </p>
    </div>
  );
}
