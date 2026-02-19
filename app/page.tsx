import HomeClient from "@/components/home/HomeClient";
import { fetchStores } from "./api/store";

export default async function Home(){
  const stores= await fetchStores();
  return <HomeClient stores={stores}/>;
}