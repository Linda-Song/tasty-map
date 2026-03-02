'use client'
import { LocationType, SearchType, StoreType } from "@/type";
import { atom } from "recoil";

const DEFAULT_LAT = -33.8708464;
const DEFAULT_LNG = 151.20733;
const DEFAULT_ZOOM = 15

export const mapState = atom<google.maps.Map | null>({
  key:"map",
  default: null,
  dangerouslyAllowMutability: true,
});

export const currentStoreState = atom<StoreType | null>({
  key:"store",
  default: null,
});
export const locationState = atom<LocationType>({
  key:"location",
  default: {
    lat:DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: DEFAULT_ZOOM,
  },
});

 export const searchState = atom<SearchType | null>({
  key:"search",
  default: null,
 })
