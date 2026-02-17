'use client'
import Markers from "@/components/markers/Markers";
import GoogleMap from "../components/map/Map";
import stores from "@/data/store_data.json";
import { useState } from "react";
import { StoreType } from "@/type/index";
import StoreBox from "@/components/store/StoreBox";

export default function Home() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentStore, setCurrentStore] = useState<StoreType | null>(null);
  const storeDatas = stores["DATA"] as StoreType[];

  console.log(currentStore);
  return (
    <>
      <main > 
        <GoogleMap setMap ={setMap} /> 
        <Markers storeDatas={storeDatas} map={map} setCurrentStore={setCurrentStore}/>
        <StoreBox store={currentStore} setStore={setCurrentStore}></StoreBox>
      </main>
    </>
  );
}   