export interface StoreType {
  id: number | null;
  title: string | null;
  state: string | null;
  city: string | null;
  x_cnts: number | null; 
  y_dnts: number | null; 
  address: string | null;
  tel_no?: string | null; 
  web?: string | null;
  category: string| null;
}

export interface StoreResponse{
  data: StoreType[];
  totalPages: number;
  totalCount: number;
}