'use client'

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";


interface CommentFormProps {
  storeId: number;
  refetch?: () => void;
}

interface CommentInput {
  body: string;
}

export default function CommentForm({ storeId, refetch }: CommentFormProps) {
  const {status} = useSession();
  const {
    register, 
    handleSubmit, 
    resetField,
    formState: {errors},
  } = useForm<CommentInput>();

  const onSubmit = async(data:  CommentInput) => {
    try {
            const result = await axios.post('/api/comments', {
            ...data,
            storeId,
          });
      
          if(result.status === 200) {
            toast.success("Comment posted successfully");
            resetField("body");
            if(refetch) {
              refetch();
            }
          }

          } catch (e){

            toast.error("Something went wrong. Please try again.");

          }
         
  
  }
  return (
    <div className="md:max-w-2xl py-8 mx-2 mb-20 mx-auto" >
      
        <form 
        
          onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
        >
          <div className="h-5">
          {errors?.body?.type === "required" && (
          <div className="text-xs text-red-600">This field is required.</div>
        )}
        </div>
          <textarea rows={3} 
          placeholder={status === 'authenticated' ? "Write a comment..." : "Please login to write a comment."}
          {...register("body", {required:true})}
          disabled={status !== 'authenticated'}
          className="block w-full min-h-[120px] resize-none border rounded-md bg-transparent py-2.5 px-4 text-black placeholder:text-gray-400 text-sm leading-6"
          />
        <div className="flex justify-end mt-2">
          <button type="submit" 
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-semibold shadow-sm mt-2 rounded-md">
            Submit
          </button>

        </div>
     </form>
   
        
    
    </div>
  )
}