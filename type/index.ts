export interface StoreType {
  id: number;
  title: string;
  state: string;
  city: string;
  x_cnts: number; 
  y_dnts: number; 
  address: string;
  tel_no?: string | null; 
  web?: string;
  category: string;
}