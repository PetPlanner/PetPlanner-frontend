import "./index.scss";
import SearchBox from "../../components/SearchBox";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const PetTaxi = () => {
  return (
    <>
      <div className="taxi">
        <div className="taxi__input">
          <div className="taxi__input__field">
            <div className="taxi__input__field--title">Start Location:</div>
            <SearchBox />
          </div>
          <div className="taxi__input__field end">
            <div className="taxi__input__field--title">End Location:</div>
            <SearchBox />
          </div>
        </div>
        <div className="taxi__map" id="map">
          <MapContainer
            center={[45.246219799792556, 19.851756995545784]}
            zoom={11}
            style={{ height: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[45.246219799792556, 19.851756995545784]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default PetTaxi;
