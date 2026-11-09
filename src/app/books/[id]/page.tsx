
import BookCard from "@/components/BookCard";

import getTokenFromServer from "@/lib/getTokenFromServer";

import { IBook } from "@/type/type";


const booksDeatails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
    
    const token = getTokenFromServer()
  const res = await fetch(`http://localhost:5000/books-details/${id}`,{
    headers:{
      authorization:`bearer ${token}`
    }
  });
  const BookData: IBook = await res.json();

  return (
    <div>
      <BookCard BookData={BookData}></BookCard>
    </div>
  );
};

export default booksDeatails;
