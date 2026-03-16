export interface StoreType {
  id: number | null;
  title: string | null;
  state: string | null;
  city: string | null;
  lat: string | null; 
  lng: string | null; 
  address: string | null;
  phone?: string | null; 
  web?: string | null;
  category: string| null;
  likes?: Partial<LikeInterface>[];
  comments?: CommentInterface[];
}

  export interface LikeInterface {
    id: number;
    storeId: number;
    userId: number;
    store:  StoreType;
    createdAt: string;
  }

  export interface CommentInterface {
    id: number;
    storeId: number;
    userId: number;
    store:  StoreType;
    createdAt: string;
    user?: UserType;
    store?: StoreType;
  }


export interface StoreResponse{
  data: StoreType[];
  totalPages: number;
  totalCount: number;
}
export interface UserType {
  id: number;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

export interface LocationType {
  lat: number;
  lng: number;
  zoom: number;

}

export interface SearchType {
  q?: string;
  category?:string;
}