'use client'

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { CommentResponse } from "@/type";
import { useState } from "react";
import Pagination from "../common/Pagination";


export default function Comments ({storeId} : {storeId: number }) {
  const [page, setPage] = useState(1);
  const {data: session, status} = useSession();

  const { data: comments, refetch} = useQuery<CommentResponse>({
    queryKey: ["comments", storeId, page],
    queryFn: async () => {
      const {data} = await axios.get(`/api/comments?storeId=${storeId}&page=${page}&limit=5`);
      return data;
    },
  });

  const handleDelete = async(id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this comment?") ;
    if (confirm) {
      try {
        const result = await axios.delete(`/api/comments?id=${id}`);
        if(result.status === 200) {
          toast.success("Comment deleted successfully");
          refetch();
        }
      } catch(e) {
        toast.error("Failed to delete. Please try again.");
      }
    }
  };
  
  return (
    <div className="md:max-w-2xl py-8 mx-2 mb-20 mx-auto" >
      {/* comment form */}
      <CommentForm storeId ={storeId} refetch={refetch} />
      {/* comment List */}
      <CommentList 
        comments={comments}
        session = {session}
        handleDelete={handleDelete}
      />
      {/* pagination */}
      {comments?.totalPages && comments.totalPages > 1 && (
        <Pagination total={comments.totalPages}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}