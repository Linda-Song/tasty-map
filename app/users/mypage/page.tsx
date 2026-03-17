/* eslint-disable @next/next/no-img-element */
'use client'; 
import { useState } from "react";
import CommentList from "@/components/comments/CommentList";
import Pagination from "@/components/common/Pagination";
import { useSession, signOut } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CommentResponse } from "@/type";

export default function MyPage() {
  const { data: session, status } = useSession();
  const [page, setPage] = useState(1);

  // 1. Fetch user's comments
  const { data: comments, refetch, isLoading: commentsLoading } = useQuery<CommentResponse>({
    queryKey: ["my-comments", session?.user?.id, page],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/comments?userId=${session?.user?.id}&page=${page}&limit=5`
      );
      return data;
    },
    enabled: !!session?.user?.id,
  });

  // 2. Delete handler for MyPage
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      try {
        const result = await axios.delete(`/api/comments?id=${id}`);
        if (result.status === 200) {
          refetch(); // Refresh list
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Loading state
  if (status === "loading" || commentsLoading) {
    return <div className="md:max-w-5xl mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  // Unauthenticated state
  if (status === "unauthenticated") {
    return (
      <div className="md:max-w-5xl mx-auto px-4 py-8 text-center">
        Authentication is required to view this page.
      </div>
    );
  }

  return (
    <div className="md:max-w-5xl mx-auto px-4 py-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">My Page</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and account settings.</p>
      </div>

      {session?.user && (
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {/* 1. Name */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {session.user.name || "N/A"}
              </dd>
            </div>

            {/* 2. Email */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {session.user.email}
              </dd>
            </div>

            {/* 3. Profile Image */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Profile Image</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <img
                  src={session.user.image || "/images/pie.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover outline-2"
                  onError={(e) => {
                    e.currentTarget.src = "/images/markers/pie.png"; // Fallback image
                  }}
                />
              </dd>
            </div>

            {/* 4. Account Action */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Account Action</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-sm hover:text-red-600 transition-colors"
                >
                  Log out
                </button>
              </dd>
            </div>
          </dl>
        </div>
      )}

      <div className="mt-8 px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          My Comments
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          A list of comments you have posted.
        </p>
      </div>

      <CommentList 
        comments={comments} 
        session={session} 
        displayStore={true} 
        handleDelete={handleDelete}
      />

      {comments?.totalPages && comments.totalPages > 1 && (
        <Pagination 
          total={comments.totalPages} 
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}