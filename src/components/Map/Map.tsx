import "./Map.css";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import RecenterMap from "./RecenterMap/RecenterMap.tsx";

interface MapProps {
  lat: number;
  lng: number;
}

const Map = ({ lat, lng }: MapProps) => {
  return (
    <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <RecenterMap lat={lat} lng={lng} />
    </MapContainer>
  );
};

export default Map;
