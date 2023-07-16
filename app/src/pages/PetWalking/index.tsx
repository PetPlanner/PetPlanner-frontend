import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Card from "../../components/Card";
import "./index.scss";
import L from "leaflet";
import "leaflet-routing-machine";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import walkerIcon from "../../assets/images/dog-walking (2).png";
import "leaflet/dist/leaflet.css";
import useRouteProtector from "../../utils/routeProtector/routeProtector";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../utils/store/AuthContext";
import { findUserById, findWalkersByCity } from "../../services/userService";
import { WarningMessage } from "../../utils/toastService/toastService";
import NavButton from "../../components/Button";

let WalkerIcon = L.icon({
  iconUrl: walkerIcon,
  shadowUrl: iconShadow,
});

const WalkingPage = () => {
  const [user, setUser] = useState();
  const [walkers, setWalkers] = useState();
  const contex = useContext(AuthContext);
  useRouteProtector({
    roles: ["CUSTOMER", "ADMIN", "DRIVER", "WALKER", "VET", "TRAINER"],
  });

  const renderWalkers = () => {
    let retVal = [];
    for (let walker of walkers as any) {
      retVal.push(
        <Marker
          icon={WalkerIcon}
          position={[walker.address.lat, walker.address.lon]}
        >
          <Popup>
            <div>
              <h3 style={{ fontSize: "1.4rem" }}>Walker Details</h3>
              <p style={{ fontSize: "1.2rem" }}>
                Phone Number: {walker.phoneNumber}
              </p>
            </div>
          </Popup>
        </Marker>
      );
    }
    return retVal;
  };
  const fetchUser = async () => {
    let res: any;
    res = await findUserById(+contex.user.id);
    if (!res || !res.data) {
      WarningMessage("Something went wrong.");
      return;
    }
    setUser(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, [contex.user.id]);

  const findWalkers = async () => {
    let res: any;
    res = await findWalkersByCity((user as any).address.city);
    if (!res || !res.data) {
      WarningMessage("Something went wrong");
      return;
    }
    setWalkers(res.data);
    console.log(res.data);
  };

  return (
    <div className="walking">
      <Card width="80vw" height="80vh" backgroundColor="rgb(240, 248, 255)">
        <div className="walking__container">
          <div className="walking__container__map">
            <MapContainer
              center={[45.246219799792556, 19.851756995545784]}
              zoom={13}
              style={{ height: "100%", opacity: "1" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {user && (
                <Circle
                  color="red"
                  center={[
                    (user as any).address.lat,
                    (user as any).address.lon,
                  ]}
                  radius={500}
                ></Circle>
              )}
              {walkers && renderWalkers()}
            </MapContainer>
          </div>
          <div className="walking__container__content">
            <h1 id="pet-walking__title">Pet Walking Service</h1>
            <div className="walking__container__content__btn">
              <NavButton
                text="Find A Dog Walker Near You!"
                submitHandler={findWalkers}
              ></NavButton>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WalkingPage;
