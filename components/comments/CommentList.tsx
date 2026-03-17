/* eslint-disable @next/next/no-img-element */
'use client'
import { CommentInterface } from "@/type"
import { Session } from "next-auth";
import Link from "next/link";

interface CommentListProps {
  comments?: {data: CommentInterface[]};
  session: Session | null;
  handleDelete?: (id: number) => void;
  displayStore?: boolean;
}
     
export default function CommentList({
  comments, 
  session , 
  handleDelete,
  displayStore = false
  }: CommentListProps) {
  
  return (
  <div className="my-10">
    {comments?.data && comments?.data.length > 0 ? (
      comments?.data?.map((comment) => (
        <div key={comment.id} className="flex items-center border-b border-gray-100 pb-8 space-x-4 text-sm mb-8 text-gray-500">
          <div>
            <img src={comment?.user?.image || "/images/markers/bread.png"}
            width = {40}
            height={40}
            className="rounded-full bg-gray-10"
            alt="profile image"
           />
          </div>

          <div className="flex flex-col space-y-1 flex-1">
            <div>{comment?.user?.email}</div>
            <div className="text-xs">{new Date(comment?.createdAt)?.toLocaleString()}</div>
            <div className="text-black mt-1 text-base">{comment.body}</div>
            
            {/* comments List */}
            {displayStore && comment.store && (
              <div className="mt-2">
                <Link href={`/stores/${comment.store.id}`}
                className= "text-blue-700 hover:text-blue-600 underline font-medium">
                {comment.store.title}
                </Link>
              </div>
            )}
          </div>
          <div>
            {comment.userId === Number(session?.user?.id) && (
              <button 
                type="button"
                onClick={() => handleDelete && handleDelete(comment.id)}
                className="underline text-gray-500 hover:text-gray-400" 
                >
                  Delete
                </button>
            )}
          </div>
        </div>
      ))
    ) : (
      <div className="text-center text-gray-400 py-10 text-sm">
        No comments yet
      </div>
    )}
</div>
);
}

