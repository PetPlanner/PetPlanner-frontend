import TextField from "@mui/material/TextField";
import "./index.scss";

interface PetProps {
  name: string;
  species: string;
  date: Date;
}
const PetForm: React.FC<PetProps> = (props: PetProps) => {
  return (
    <div className="pet-cointainer">
      <div className="pet-cointainer__content">
        <div className="pet-cointainer__content--field">
          <TextField
            required
            id="outlined-required"
            label="Name"
            defaultValue={props.name}
            style={{ width: "100%" }}
          />
        </div>
        <div className="pet-cointainer__content--field">
          <TextField
            required
            id="outlined-required"
            label="Species"
            defaultValue={props.species}
            style={{ width: "100%" }}
          />
        </div>
        <div className="pet-cointainer__content--field">
          <TextField
            required
            id="outlined-required"
            label="Date of Birth"
            defaultValue={props.date.toString().replaceAll(",", "-")}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PetForm;
