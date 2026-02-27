export interface StoreType {
  id: number | null;
  title: string | null;
  state: string | null;
  city: string | null;
  lat: number | null; 
  lng: number | null; 
  address: string | null;
  phone?: string | null; 
  web?: string | null;
  category: string| null;
}

export interface StoreResponse{
  data: StoreType[];
  totalPages: number;
  totalCount: number;
}