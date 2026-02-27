'use client'

import { useState } from "react";
import { StoreType, StoreResponse} from "@/type/index";

import StoreBox from "@/components/store/StoreBox";
import Markers from "@/components/markers/Markers";
import GoogleMap from "../map/Map";



interface HomeClientProps {
    stores: StoreResponse ;
}

export default function HomeClient({stores} : HomeClientProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentStore, setCurrentStore] = useState<StoreType | null>(null);
 
  return (
    <>
      <main > 
        <GoogleMap setMap ={setMap} /> 
        <Markers stores={stores} map={map} setCurrentStore={setCurrentStore}/>
        <StoreBox store={currentStore} setStore={setCurrentStore}/>
      </main>
    </>
  );
}   
