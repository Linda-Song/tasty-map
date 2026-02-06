'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
 const router = useRouter();
 return (
  <div>
    <h1>Router</h1>
    <div>
      <button type="button" onClick={() => {router.push("/Push")}}>Push</button>
    </div>
    <div>
      <button type="button" onClick={() => {router.push("/Click")}}>Click</button>
    </div>
  </div>
 );
}