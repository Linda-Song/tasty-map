'use client'

import CommentForm from "./CommentForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Comments ({storeId} : {storeId: number }) {
  const {status} = useSession();
  
  return (
    <div className="md:max-w-2xl py-8 mx-2 mb-20 mx-auto" >
      <CommentForm storeId ={storeId} />
      

        
    
    </div>
  )
}