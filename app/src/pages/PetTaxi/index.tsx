import "./index.scss";
import SearchBox from "../../components/SearchBox";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import petTaxi from "../../assets/images/pet-taxi.png";
import endIcon from "../../assets/images/map.png";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { startTaxi, getCordinates } from "../../services/petTaxiService";
import startIcon from "../../assets/images/owner.png";
import confetti from "canvas-confetti";
import Card from "../../components/Card";
import useRouteProtector from "../../utils/routeProtector/routeProtector";

let StartIcon = L.icon({
  iconUrl: startIcon,
  shadowUrl: iconShadow,
});
let EndIcon = L.icon({
  iconUrl: endIcon,
  shadowUrl: iconShadow,
});
let Taxi = L.icon({
  iconUrl: petTaxi,
  shadowUrl: iconShadow,
});

const PetTaxi = () => {
  const [position, setPosition] = useState();
  const [selectStartPosition, setSelectStartPosition] = useState(null);
  const [selectEndPosition, setSelectEndPosition] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  useRouteProtector({
    roles: ["CUSTOMER", "ADMIN", "DRIVER", "WALKER", "VET", "TRAINER"],
  });
  const renderStartMarker = () => {
    return (
      <Marker icon={StartIcon} position={selectStartPosition as any}></Marker>
    );
  };

  const renderEndMarker = () => {
    return <Marker icon={EndIcon} position={selectEndPosition as any}></Marker>;
  };

  const renderStartButton = () => {
    return selectStartPosition != null && selectEndPosition != null;
  };

  const renderCar = () => {
    return <Marker position={position as any} icon={Taxi}></Marker>;
  };

  return (
    <div className="taxi-wrapper">
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
          {renderStartButton() && (
            <Button
              style={{
                backgroundColor: "#b30c2e",
                color: "white",
                marginTop: "3rem",
                width: "100%",
                height: "5rem",
                fontSize: "2rem",
                fontWeight: "600",
              }}
              variant="contained"
              color="primary"
              onClick={async () => {
                const cords = await getCordinates(
                  String((selectStartPosition as any).lon),
                  String((selectStartPosition as any).lat),
                  String((selectEndPosition as any).lon),
                  String((selectEndPosition as any).lat)
                );
                let counter = 0;
                const interval = setInterval(() => {
                  if (counter === cords.length) {
                    confetti({
                      particleCount: 200,
                      startVelocity: 50,
                      spread: 360,
                      zIndex: 500,
                    });
                    clearInterval(interval);
                    return;
                  }
                  setPosition([
                    cords.at(counter)[1] as any,
                    cords.at(counter)[0] as any,
                  ] as any);
                  counter++;
                }, 500);
              }}
            >
              S T A R T
            </Button>
          )}
        </div>
        <div className="taxi__map" id="map">
          <MapContainer
            center={[45.246219799792556, 19.851756995545784]}
            zoom={13}
            style={{ height: "100%", opacity: "1" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {position && renderCar()}
            {selectStartPosition && renderStartMarker()}
            {selectEndPosition && renderEndMarker()}
          </MapContainer>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PetTaxi;
