import Hotel from "../../../model/hotel";
import "./index.scss";

interface HotelProps {
  location: string;
  capacity: number;
}

const HotelForm: React.FC<HotelProps> = (props: HotelProps) => {
  return (
    <div className="pet-hotel__form">
      <div className="pet-hotel__form__row">
        <div className="pet-hotel__form__row--elem">
          <div
            className="vet-form__info__row--icon"
            style={{ backgroundImage: "url('/location.png')" }}
          ></div>
          <div className="pet-hotel__form__row--elem-data">
            {props.location}
          </div>
        </div>
        <div className="pet-hotel__form__row--elem">
          <div
            className="vet-form__info__row--icon"
            style={{ backgroundImage: "url('/bed.png')" }}
          ></div>
          <div className="pet-hotel__form__row--elem-data">
            {props.capacity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelForm;
