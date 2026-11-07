
import BookCard from "@/components/BookCard";

import { IBook } from "@/type/type";

const booksDeatails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/books-details/${id}`);
  const BookData: IBook = await res.json();

  return (
    <div>
      <BookCard BookData={BookData}></BookCard>
    </div>
  );
};

export default booksDeatails;
