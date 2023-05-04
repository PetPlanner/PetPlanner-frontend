import "./index.scss";
import SearchBox from "../../components/SearchBox";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import petTaxi from "../../assets/images/pet-taxi.png";
import endIcon from "../../assets/images/map.png";
import { useState } from "react";

let StartIcon = L.icon({
  iconUrl: petTaxi,
  shadowUrl: iconShadow,
});
let EndIcon = L.icon({
  iconUrl: endIcon,
  shadowUrl: iconShadow,
});

const PetTaxi = () => {
  const [selectStartPosition, setSelectStartPosition] = useState(null);
  const [selectEndPosition, setSelectEndPosition] = useState(null);

  const renderStartMarker = () => {
    return (
      <Marker icon={StartIcon} position={selectStartPosition as any}></Marker>
    );
  };

  const renderEndMarker = () => {
    return <Marker icon={EndIcon} position={selectEndPosition as any}></Marker>;
  };

  return (
    <>
      <div className="taxi">
        <div className="taxi__input">
          <div className="taxi__input__field">
            <div className="taxi__input__field--title">Start Location:</div>
            <SearchBox
              selectPosition={selectStartPosition}
              setSelectPosition={setSelectStartPosition}
            />
          </div>
          <div className="taxi__input__field end">
            <div className="taxi__input__field--title">End Location:</div>
            <SearchBox
              selectPosition={selectEndPosition}
              setSelectPosition={setSelectEndPosition}
            />
          </div>
        </div>
        <div className="taxi__map" id="map">
          <MapContainer
            center={[45.246219799792556, 19.851756995545784]}
            zoom={13}
            style={{ height: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* <Marker
              icon={DefaultIconHospital}
              position={[45.246219799792556, 19.851756995545784]}
            ></Marker> */}
            {selectStartPosition && renderStartMarker()}
            {selectEndPosition && renderEndMarker()}
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default PetTaxi;
