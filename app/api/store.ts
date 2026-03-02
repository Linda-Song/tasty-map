import axios from "axios";
import { StoreResponse} from "@/type";

export const fetchStores = async (page="1",q = "", category = ""): Promise<StoreResponse> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
    params: {
      page,
      q,
      category,
    }
  });
  return data;
};




