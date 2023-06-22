import React from "react";
import "./index.scss";

interface VetStationProps {
  location: string;
  worktime: string;
  websiteUrl: string;
  phone: string;
}

const VetStationForm: React.FC<VetStationProps> = (props: VetStationProps) => {
  return (
    <div className="vet-form">
      <div className="vet-form__info">
        <div className="vet-form__info__row">
          <div
            className="vet-form__info__row--icon"
            style={{ backgroundImage: "url('/location.png')" }}
          ></div>
          <div className="vet-form__info__row--data">{props.location}</div>
        </div>

        <div className="vet-form__info__row">
          <div
            className="vet-form__info__row--icon"
            style={{ backgroundImage: "url('/worktime.png')" }}
          ></div>
          <div className="vet-form__info__row--data">{props.worktime}</div>
        </div>

        <div className="vet-form__info__row">
          <div
            className="vet-form__info__row--icon"
            style={{ backgroundImage: "url('/website.png')" }}
          ></div>
          <div className="vet-form__info__row--data">{props.websiteUrl}</div>
        </div>

        <div className="vet-form__info__row">
          <div
            className="vet-form__info__row--icon"
            style={{ backgroundImage: "url('/phone.png')" }}
          ></div>
          <div className="vet-form__info__row--data">{props.phone}</div>
        </div>
      </div>
    </div>
  );
};

export default VetStationForm;
