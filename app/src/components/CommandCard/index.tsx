import "./index.scss";

interface CommandCardProps {
  img: string;
  title: string;
  subtitle: string;
}

const CommandCard: React.FC<CommandCardProps> = (props: CommandCardProps) => {
  return (
    <div className="command-card">
      <div
        className="command-card--img"
        style={{
          backgroundImage: `url("${props.img}")`,
        }}
      ></div>
      <h1 className="command-card--h1">{props.title}</h1>
      <p className="command-card--p">{props.subtitle}</p>
    </div>
  );
};

export default CommandCard;
