
import { Metadata } from "next";
import AddBooksContent from "@/components/AddBooksContent";

export const metadata: Metadata = {
  title: "BookNook | Add a New Book",
  description: "Grow the community collection by sharing a title.",
};
export default function AddBookPage() {
 

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col">
      <AddBooksContent></AddBooksContent>
    </div>
  );
}
