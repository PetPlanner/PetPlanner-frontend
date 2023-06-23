import { MapContainer, Marker, TileLayer } from "react-leaflet";
import Card from "../../components/Card";
import "./index.scss";
import SearchComponent from "../../components/Search";
import { useContext, useState } from "react";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import clinicIcon from "../../assets/images/clinic.png";
import VetStationForm from "../../components/Forms/VetStationForm";
import AuthContext from "../../utils/store/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createVetStation } from "../../services/vetService";
import { WarningMessage } from "../../utils/toastService/toastService";

let ClinicIcon = L.icon({
  iconUrl: clinicIcon,
  shadowUrl: iconShadow,
});

const initValue = {
  name: "",
  workTime: "",
  phoneNumber: "",
  webSiteUrl: "",
  hostId: "",
  country: "",
  city: "",
  street: "",
  lon: "",
  lat: "",
};
const validationRule = (values: any) => {
  const required = "This field is required.";
  const errors: any = {};
  if (!values.name) {
    errors.name = required;
  }
  if (!values.workTime) {
    errors.workTime = required;
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = required;
  }
  if (!values.webSiteUrl) {
    errors.webSiteUrl = required;
  }
  if (!values.hostId) {
    errors.hostId = required;
  }
  if (!values.country) {
    errors.country = required;
  }
  if (!values.street) {
    errors.street = required;
  }
  if (!values.lon) {
    errors.lon = required;
  }
  if (!values.city) {
    errors.city = required;
  }
  if (!values.lat) {
    errors.lat = required;
  }
  return errors;
};

const VetStationPage = () => {
  const [selectedStation, setSelectedStation] = useState();
  const [open, setOpen] = useState<boolean>(false);
  const context = useContext(AuthContext);

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

          {context.user.role === "ADMIN" && (
            <div className="vet-station__search--button">
              <button className="button-42" onClick={() => setOpen(true)}>
                Add
              </button>
            </div>
          )}
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
      <Dialog
        open={open}
        aria-labelledby="dialog-title"
        onClose={() => setOpen(false)}
      >
        <DialogTitle id="dialog-title">Add new vet station</DialogTitle>
        <DialogContent>
          <div className="vet-dialog-content">
            <Formik
              initialValues={initValue}
              validate={validationRule}
              onSubmit={async (values, { setSubmitting }) => {
                let res;
                let dto: any = {
                  name: values.name,
                  workTime: values.workTime,
                  phoneNumber: values.phoneNumber,
                  webSiteUrl: values.webSiteUrl,
                  hostId: values.hostId,
                  address: {
                    country: values.country,
                    city: values.city,
                    street: values.street,
                    lon: values.lon,
                    lat: values.lat,
                  },
                };
                res = await createVetStation(dto);
                if (!res || !res.data) {
                  WarningMessage("Something went wrong");
                  return;
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="vet-container">
                  <div className="vet-container--wrapper">
                    <div className="vet-container__row">
                      <div>
                        <Field
                          type="text"
                          name="name"
                          className="vet-container__row--field"
                          placeholder="Name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="workTime"
                          className="vet-container__row--field"
                          placeholder="Work time"
                        />
                        <ErrorMessage
                          name="workTime"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                    </div>
                    <div className="vet-container__row">
                      <div>
                        <Field
                          type="text"
                          name="phoneNumber"
                          className="vet-container__row--field"
                          placeholder="Phone number"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="webSiteUrl"
                          className="vet-container__row--field"
                          placeholder="Website"
                        />
                        <ErrorMessage
                          name="webSiteUrl"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                    </div>
                    <div className="vet-container__row">
                      <div>
                        <Field
                          type="text"
                          name="country"
                          className="vet-container__row--field"
                          placeholder="Country"
                        />
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="city"
                          className="vet-container__row--field"
                          placeholder="City"
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                    </div>
                    <div className="vet-container__row">
                      <div>
                        <Field
                          type="text"
                          name="lon"
                          className="vet-container__row--field"
                          placeholder="Lon"
                        />
                        <ErrorMessage
                          name="lon"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="lat"
                          className="vet-container__row--field"
                          placeholder="Lat"
                        />
                        <ErrorMessage
                          name="lat"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                    </div>
                    <div className="vet-container__row">
                      <div>
                        <Field
                          type="text"
                          name="street"
                          className="vet-container__row--field"
                          placeholder="Street"
                        />
                        <ErrorMessage
                          name="street"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="hostId"
                          className="vet-container__row--field"
                          placeholder="HostId"
                        />
                        <ErrorMessage
                          name="hostId"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                    </div>

                    <div className="vet-container__row__buttons">
                      <DialogActions>
                        <div className="dialog-buttons">
                          <button
                            className="button-16"
                            role="button"
                            type="button"
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="button-15"
                            role="button"
                            type="submit"
                            onClick={async () => {
                              setOpen(false);
                            }}
                          >
                            Add
                          </button>
                        </div>
                      </DialogActions>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VetStationPage;
