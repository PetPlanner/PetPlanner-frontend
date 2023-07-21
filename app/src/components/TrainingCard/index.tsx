import "./index.scss";
interface TrainingProps {
  img: string;
  title: string;
  subtitle: string;
  paraf: string;
  steps: string[];
}

const TrainingCard: React.FC<TrainingProps> = (props: TrainingProps) => {
  const getSteps = () => {
    let retVal = [];

    for (let step of props.steps) {
      retVal.push(<li key={Math.random()}>{step}</li>);
    }

    return retVal;
  };
  return (
    <div className="training-card">
      <div
        className="training-card--img"
        style={{ backgroundImage: `url(/${props.img})` }}
      ></div>
      <h1 className="training-card--h1">{props.title}</h1>
      <p className="training-card--p">{props.paraf}</p>
      <h2 className="training-card--h2">{props.subtitle}</h2>
      <ol className="training-card--ol">{getSteps()}</ol>
    </div>
  );
};

export default TrainingCard;
