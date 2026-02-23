import axios from "axios";
import { StoreType } from "@/type";

export const fetchStores = async (): Promise<StoreType[]> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
  return data;
};


