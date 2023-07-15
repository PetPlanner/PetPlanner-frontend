import { Circle, MapContainer, TileLayer, useMap } from "react-leaflet";
import Card from "../../components/Card";
import "./index.scss";
import L from "leaflet";
import "leaflet-routing-machine";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import startIcon from "../../assets/images/owner.png";
import "leaflet/dist/leaflet.css";
import useRouteProtector from "../../utils/routeProtector/routeProtector";

let StartIcon = L.icon({
  iconUrl: startIcon,
  shadowUrl: iconShadow,
});
const WalkingPage = () => {
  useRouteProtector({
    roles: ["CUSTOMER", "ADMIN", "DRIVER", "WALKER", "VET", "TRAINER"],
  });
  const MapComponent = () => {
    const map = useMap();

    // Add routing control to the map when it is available
    if (map && !map.hasLayer(routingControl as any)) {
      routingControl.addTo(map);
    }

    return null;
  };

  return (
    <div className="walking">
      <Card width="80vw" height="80vh" backgroundColor="rgb(240, 248, 255)">
        <div className="walking__container">
          <div className="walking__container__content">bla</div>
          <div className="walking__container__map">
            <MapContainer
              center={[45.246219799792556, 19.851756995545784]}
              zoom={13}
              style={{ height: "100%", opacity: "1" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {/* <MapComponent /> */}
              <Circle
                color="red"
                center={[45.246219799792556, 19.851756995545784]}
                radius={500}
              ></Circle>
            </MapContainer>
          </div>
        </div>
      </Card>
    </div>
  );
};

const waypointIcon = L.icon({
  iconUrl: "../../assets/images/owner.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const waypoints = [
  {
    latLng: L.latLng(45.246219799792556, 19.851756995545784),
    icon: StartIcon,
  },
  {
    latLng: L.latLng(45.246419799792556, 19.901758995545784),
    icon: StartIcon,
  },
];

const routingControl = L.Routing.control({
  waypoints: waypoints,
  routeWhileDragging: true,
  lineOptions: {
    styles: [
      {
        color: "blue",
        opacity: 0.6,
        weight: 4,
      },
    ],
  } as any,
});

export default WalkingPage;
