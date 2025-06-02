import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface RecenterMapProps {
  lat: number;
  lng: number;
}

const RecenterMap = ({ lat, lng }: RecenterMapProps) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

export default RecenterMap;
