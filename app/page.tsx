import HomeClient from "@/components/home/HomeClient";
import { StoreType } from "@/type";

export default async function Home(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
    next: {revalidate: 3600 },
  });

  if(!res.ok) {
    throw new Error('Failed to load data. Please try again later.')
  }

  const stores: StoreType[] = await res.json();

  return <HomeClient stores={stores}/>;
}