"use client";

import type { IBook } from "@/type/type";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IProps {
  book: IBook;
}

const DeleteButton = ({ book }: IProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/delete/${book._id}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();
    console.log(data);

    if (data.deletedCount > 0) {
      router.refresh();
      toast.success("Book deleted successfully!");
    }
  };

  return (
    <button
      onClick={handleDelete}
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-white text-red-500 hover:bg-red-50 transition-colors shadow-sm"
      title="Delete book"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  );
};

export default DeleteButton;
