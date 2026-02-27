"use client"
import { signIn, useSession } from "next-auth/react";
import { AiOutlineGoogle } from "react-icons/ai";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const {data: session , status} = useSession();
  const router = useRouter();


  useEffect(() => {
    if(status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return(
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[60vh]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-blue-800 text-center text-2xl font-semibold italic">
          Tasty Map
          </div>
          <div className="text-center mt-4 text-sm text-gray-300">
            ---------------------------- Log in with ----------------------------
          </div>
          <div className="mt-10 mx-auto w-full max-w-sm">
            <div className="flex flex-col gap-3">
              <button type="button" onClick={()=> signIn("google", {callbackUrl:"/"})} className="text-white flex gap-3 bg-[#4285f4] hover:bg-[#4285f4]/90 font-medium rounded-lg w-full px-5 py-4 
              text-center items-center justify-center"> 
                <AiOutlineGoogle className="w-6 h-6"/>
                Sign in with Google
              </button>
              <button type="button" onClick={()=> signIn("azure-ad" , {callbackUrl:"/"})} className="text-white flex gap-3 bg-[#5E5E5E] hover:bg-[#5E5E5E]/90 font-medium rounded-lg w-full px-5 py-4 
              text-center items-center justify-center"> 
                <TfiMicrosoftAlt className="w-5 h-5"/>
                Sign in with Microsoft
              </button>
            </div>
          </div>
      </div>
      
    </div>
  )
}