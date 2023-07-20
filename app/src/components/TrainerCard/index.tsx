import { useNavigate } from "react-router-dom";
import "./index.scss";

interface TrainerCardProps {
  img: string;
  name: string;
  email: string;
}

const TrainerCard: React.FC<TrainerCardProps> = (props: TrainerCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="trainer-card">
      <div
        className="trainer-card--img"
        style={{
          backgroundImage: `url("${props.img?.toLowerCase()}")`,
        }}
      ></div>
      <div className="trainer-card__data">
        <div className="trainer-card__data__row">
          <div className="trainer-card__data__row--name-icon"></div>
          <div className="trainer-card__data__row--name">{props.name}</div>
        </div>
        <div className="trainer-card__data__row">
          <div className="trainer-card__data__row--email-icon"></div>
          <div className="trainer-card__data__row--email">{props.email}</div>
        </div>
        <div
          className="trainer-card__data--btn"
          onClick={() => navigate("/new-message")}
        >
          Send Message
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
