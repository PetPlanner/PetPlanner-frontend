import "./index.scss";

interface CardProps {
  children: React.ReactNode;
  width: string;
  height: string;
  backgroundColor?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  width,
  height,
  backgroundColor = 1,
}) => {
  return (
    <div
      className="card-componenet"
      style={{ width: width, height: height, background: backgroundColor }}
    >
      {children}
    </div>
  );
};

export default Card;
