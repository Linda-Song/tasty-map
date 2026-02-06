'use client'
import { useParams } from "next/navigation";

export default function StoreEditPage() {
  const params = useParams();
  const id = params.id;
  return(
    <div>
      <h1>Store Edit:{id}</h1>
    </div>
  )
}