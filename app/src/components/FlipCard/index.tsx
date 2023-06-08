import "./index.scss";

interface FlipCardProps {
  width: string;
  height: string;
  img: string;
  name: string;
  onClick: () => void;
}

const FlipCard: React.FC<FlipCardProps> = (props: FlipCardProps) => {
  return (
    <div
      className="flip-card"
      style={{ width: props.width, height: props.height }}
      onClick={props.onClick}
    >
      <div className="flip-card-inner">
        <div
          className="flip-card-front"
          style={{
            backgroundImage: `url("${props.img}")`,
          }}
        ></div>
        <div className="flip-card-back">
          <h1>{props.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
