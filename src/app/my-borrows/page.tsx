import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { BookOpen, Clock, AlertCircle } from "lucide-react";
import ReturnButton from "@/components/ReturnButton";
import getTokenFromServer from "@/lib/getTokenFromServer";
import { redirect } from "next/navigation";
import { Metadata } from "next";

interface IBorrowItem {
  _id: string;
  bookId: string;
  bookTitle: string;
  author?: string;
  image?: string;
  userName?: string;
  userEmail?: string;
  borrowDate: string;
  returnDate: string; // due date saved in the database
}

export const metadata: Metadata = {
  title: "BookNook | My Borrows",
  description: "Keep track of your active book loans.",
};
const TZ = "Asia/Dhaka";
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const LOAN_DAYS = 30;

// Calendar day number in Dhaka time, so day differences ignore hours
const toDayNumber = (d: Date) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d); // "YYYY-MM-DD"
  const [y, m, day] = parts.split("-").map(Number);
  return Date.UTC(y, m - 1, day) / MS_PER_DAY;
};

const isValid = (d: Date) => !isNaN(d.getTime());

const formatDate = (d: Date | null) =>
  d && isValid(d)
    ? d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: TZ,
      })
    : "—";

const getBorrowDetails = (item: IBorrowItem) => {
  const borrowDate = new Date(item.borrowDate);

  // Use the returnDate from the database; fall back to borrowDate + 30 days
  let dueDate = new Date(item.returnDate);
  if (!isValid(dueDate)) {
    dueDate = new Date(borrowDate.getTime() + LOAN_DAYS * MS_PER_DAY);
  }

  if (!isValid(dueDate)) {
    return {
      borrowDate,
      dueDate: null,
      timeText: "Invalid date",
      isUrgent: false,
    };
  }

  const diffDays = toDayNumber(dueDate) - toDayNumber(new Date());

  let timeText: string;
  let isUrgent = false;

  if (diffDays < 0) {
    const late = Math.abs(diffDays);
    timeText = `Overdue by ${late} day${late > 1 ? "s" : ""}`;
    isUrgent = true;
  } else if (diffDays === 0) {
    timeText = "Due today";
    isUrgent = true;
  } else {
    timeText = `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
  }

  return { borrowDate, dueDate, timeText, isUrgent };
};

const myBorrows = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;
  const token = await getTokenFromServer();
  let borrows: IBorrowItem[] = [];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/borrows/${encodeURIComponent(user.email)}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (res.ok) {
    const data = await res.json();
    borrows = Array.isArray(data) ? data : [];
  }

  const totalBorrowed = borrows.length;

  return (
    <div className="min-h-screen bg-[#F8F6F0] py-12 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-6 bg-[#C6A15B]" />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
              Active Loans
            </span>
            <span className="h-[1px] w-6 bg-[#C6A15B]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32]">
            My borrows
          </h1>
          <p className="font-sans text-sm text-gray-600">
            Keep track of the books currently keeping you company.
          </p>
        </div>

        {/* Top Summary Banner */}
        <div className="rounded-2xl bg-[#183D32] px-8 py-8 text-white shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <span className="font-serif text-3xl font-bold">
                {totalBorrowed}
              </span>
              <span className="block font-sans text-xs text-emerald-100/70 font-medium uppercase tracking-wider">
                Books currently borrowed
              </span>
            </div>
          </div>
        </div>

        {/* Currently Reading Table Section */}
        <div className="rounded-2xl border border-[#E8E4DA] bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E8E4DA] flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#183D32]">
              Currently reading
            </h3>
            <span className="font-sans text-xs text-gray-400">
              Loan period: {LOAN_DAYS} days
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8E4DA] bg-[#FAF8F5] font-sans text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <th className="py-4 px-6">Book</th>
                  <th className="py-4 px-6">Borrowed</th>
                  <th className="py-4 px-6">Due Date</th>
                  <th className="py-4 px-6">Time Remaining</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DA] font-sans text-sm">
                {borrows.length > 0 ? (
                  borrows.map((item) => {
                    const { borrowDate, dueDate, timeText, isUrgent } =
                      getBorrowDetails(item);
                    return (
                      <tr
                        key={item._id}
                        className="hover:bg-[#FAF8F5]/60 transition-colors"
                      >
                        {/* Book Cover + Title */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="relative h-14 w-10 flex-shrink-0 overflow-hidden rounded-lg shadow-sm bg-gray-100">
                              <Image
                                src={
                                  item.image && item.image.trim() !== ""
                                    ? item.image
                                    : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop"
                                }
                                alt={item.bookTitle}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-serif font-bold text-[#183D32] line-clamp-1">
                                {item.bookTitle}
                              </h4>
                              <p className="text-xs text-gray-500 line-clamp-1">
                                {item.author || "Unknown Author"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Borrow Date */}
                        <td className="py-4 px-6 text-gray-600 text-xs font-medium">
                          {formatDate(borrowDate)}
                        </td>

                        {/* Due Date (from returnDate) */}
                        <td className="py-4 px-6 text-gray-600 text-xs font-medium">
                          {formatDate(dueDate)}
                        </td>

                        {/* Time Remaining */}
                        <td className="py-4 px-6">
                          <div
                            className={`flex items-center gap-1.5 text-xs font-medium ${
                              isUrgent ? "text-red-600" : "text-gray-600"
                            }`}
                          >
                            <Clock
                              className={`h-3.5 w-3.5 ${
                                isUrgent ? "text-red-500" : "text-[#C6A15B]"
                              }`}
                            />
                            <span>{timeText}</span>
                          </div>
                        </td>

                        {/* Action Return Button Component */}
                        <td className="py-4 px-6 text-right">
                          <ReturnButton borrowId={item._id} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500">
                      You have not borrowed any books yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gentle Reminder Box */}
        <div className="rounded-2xl border border-[#E8E4DA] bg-[#F2EFE9] p-6 flex items-center gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-[#C6A15B] shadow-sm">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-[#183D32] text-sm">
              A gentle reminder
            </h4>
            <p className="font-sans text-xs text-gray-600">
              Returning books on time means another reader gets to discover a
              story they&apos;ve been waiting for.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default myBorrows;
