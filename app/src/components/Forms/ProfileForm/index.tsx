import "./index.scss";
import TextField from "@mui/material/TextField";

interface UserData {
  user: any;
}

const ProfileForm: React.FC<UserData> = (props: any) => {
  return (
    <div className="profile__cointainer">
      <div className="profile__cointainer__row">
        <div className="profile__cointainer__row--field">
          {props.user && (
            <TextField
              required
              id="outlined-required"
              label="Firstname"
              defaultValue={props.user.firstname}
              style={{ width: "100%" }}
            />
          )}
        </div>
        <div className="profile__cointainer__row--field">
          <TextField
            required
            id="outlined-required"
            label="Lastname"
            defaultValue={props.user.lastname}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div className="profile__cointainer__row">
        <div className="profile__cointainer__row--field">
          <TextField
            required
            id="outlined-required"
            label="Email"
            defaultValue={props.user.email}
            style={{ width: "100%" }}
          />
        </div>
        <div className="profile__cointainer__row--field">
          <TextField
            required
            id="outlined-required"
            label="Role"
            defaultValue={props.user.role}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div className="profile__cointainer__row">
        <TextField
          required
          id="outlined-required"
          label="Address"
          defaultValue={`${props.user.address.country}, ${props.user.address.city}, ${props.user.address.street}`}
          style={{ width: "90%" }}
        />
      </div>
      <div className="profile__cointainer__row">
        <TextField
          required
          id="outlined-required"
          label="Phone number"
          defaultValue={props.user.phoneNumber}
          style={{ width: "90%" }}
        />
      </div>
    </div>
  );
};

export default ProfileForm;
