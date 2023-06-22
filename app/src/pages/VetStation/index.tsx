import { MapContainer, Marker, TileLayer } from "react-leaflet";
import Card from "../../components/Card";
import "./index.scss";
import SearchComponent from "../../components/Search";
import { useState } from "react";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import clinicIcon from "../../assets/images/clinic.png";
import VetStationForm from "../../components/Forms/VetStationForm";

let ClinicIcon = L.icon({
  iconUrl: clinicIcon,
  shadowUrl: iconShadow,
});

const VetStationPage = () => {
  const [selectedStation, setSelectedStation] = useState();

  const handleData = (data: any) => {
    setSelectedStation(data);
  };

  const renderClinicMarker = () => {
    return (
      <Marker
        icon={ClinicIcon}
        position={[
          (selectedStation as any).address.lat,
          (selectedStation as any).address.lon,
        ]}
      ></Marker>
    );
  };

  return (
    <div className="vet-station">
      <Card width="80vw" height="80vh" backgroundColor="rgb(240, 248, 255)">
        <div className="vet-station__search">
          <SearchComponent onData={handleData}></SearchComponent>
        </div>
        <div className="vet-station__content">
          <div className="vet-station__content__map">
            <MapContainer
              center={[45.246219799792556, 19.851756995545784]}
              zoom={13}
              style={{ height: "100%", opacity: "1" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {selectedStation && renderClinicMarker()}
            </MapContainer>
          </div>
          <div className="vet-station__content__data">
            <Card width="100%" height="100%">
              <div>
                <div className="vet-station__content__data--title">
                  {selectedStation && (selectedStation as any).name}
                </div>
                {selectedStation && (
                  <VetStationForm
                    location={`${(selectedStation as any).address.street}, ${
                      (selectedStation as any).address.city
                    }`}
                    worktime={(selectedStation as any).workTime}
                    websiteUrl={(selectedStation as any).webSiteUrl}
                    phone={(selectedStation as any).phoneNumber}
                  />
                )}
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VetStationPage;
