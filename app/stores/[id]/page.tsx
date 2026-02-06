'use client'

import { useParams } from "next/navigation";
export default function StoreDetailPage() {
  const params = useParams();
  const id = params.id;
  return(
    <div>
      <h1>Store Detail:{id} </h1>
    </div>
  )
}