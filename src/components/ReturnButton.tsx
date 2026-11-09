"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface IReturnProps {
  borrowId: string;
}

export default function ReturnButton({ borrowId }: IReturnProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleReturn = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrowId}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        toast.success("Book returned successfully!");
        router.refresh();
      } else {
        alert("Failed to return book.");
      }
    } catch (err) {
      console.error("Return error:", err);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleReturn}
      disabled={isLoading}
      className="h-9 px-5 rounded-lg border border-[#183D32] bg-white text-[#183D32] text-xs font-medium hover:bg-[#183D32] hover:text-white transition-all shadow-sm"
    >
      {isLoading ? "Returning..." : "Return book"}
    </Button>
  );
}
