import BookCard from "@/components/BookCard";
import getTokenFromServer from "@/lib/getTokenFromServer";
import { notFound } from "next/navigation";

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const token = await getTokenFromServer();

  const res = await fetch(`http://localhost:5000/books-details/${id}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) notFound();

  const book = await res.json();
  return <BookCard BookData={book} />;
};

export default BookDetailsPage;
