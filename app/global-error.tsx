'use client'
export default function GlobalError({error, reset,}:{error: Error; reset: ()=>void;}) {
  return(
    <html>
      <body>
        <div className="w-full h-screen mx-auto pt-[10%] text-black text-center front-semibole">
          Please Try again!
          <button onClick={()=> reset()} className="mt-4 mx-auto bg-red-600 text-white px-4 px-2.5 rounded-md hover:bg-red-500"> Try again </button>

        </div>
      </body>
    </html>
  )
}