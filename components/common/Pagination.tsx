'use client'
interface PaginationProps {
  total?: number;
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({total, page, setPage}: PaginationProps) {
  return (
    <div className="flex justify-center gap-3 mt-10">
      <button
        disabled = {page === 1}
        onClick={()=> setPage(page-1)}
        className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-30"
      >
        Prev
      </button>
      {[...Array(total)].map((_,i) => (
        <button
         key={i+1}
         onClick={() => setPage(i + 1)}
         className= "px-3 py-1 text-sm border rounded hover:bg-gray-50"
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled = {page === total}
        onClick={()=> setPage(page + 1)}
        className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
}