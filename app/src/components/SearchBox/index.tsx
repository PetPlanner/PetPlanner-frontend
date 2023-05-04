import { useState } from "react";
import "./index.scss";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import loupe from "../../assets/images/loupe.png";
import searchMarker from "../../assets/images/map-marker-icon.png";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

const SearchBox = (props: any) => {
  const [isRender, setRender] = useState(false);
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "2rem" }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, textAlign: "left" }}>
          <OutlinedInput
            style={{ width: "85%", fontSize: "1.5rem" }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            style={{ backgroundColor: "#b30c2e" }}
            variant="contained"
            color="primary"
            onClick={() => {
              // Search
              const params = {
                q: searchText,
                format: "json",
                addressdetails: 1,
                polygon_geojson: 0,
              };
              const queryString = new URLSearchParams(params as any).toString();
              const requestOptions = {
                method: "GET",
                redirect: "follow",
              };
              fetch(
                `${NOMINATIM_BASE_URL}${queryString}`,
                requestOptions as any
              )
                .then((response) => response.text())
                .then((result) => {
                  console.log(JSON.parse(result));
                  setListPlace(JSON.parse(result));
                  setRender(true);
                })
                .catch((err) => console.log("err: ", err));
            }}
          >
            <img src={loupe} alt="Loupe" style={{ width: 36, height: 38 }} />
          </Button>
        </div>
      </div>
      {isRender && (
        <div style={{ height: "20vh" }}>
          <List
            component="nav"
            aria-label="main mailbox folders"
            style={{ overflowY: "auto", height: "100%" }}
          >
            {listPlace.map((item) => {
              return (
                <div key={(item as any)?.place_id}>
                  <ListItem
                    button
                    onClick={() => {
                      setSelectPosition(item);
                      setRender(false);
                    }}
                  >
                    <ListItemIcon>
                      <img
                        src={searchMarker}
                        alt="Marker"
                        style={{ width: 42, height: 42 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={(item as any)?.display_name} />
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
