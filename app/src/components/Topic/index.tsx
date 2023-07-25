import "./index.scss";

interface TopicProps {
  title: string;
  numOfAnswers: number;
  numOfView: number;
  date: [];
  onClick: () => void;
}

function getMonthName(monthNumber: number) {
  var monthName;

  switch (monthNumber) {
    case 1:
      monthName = "January";
      break;
    case 2:
      monthName = "February";
      break;
    case 3:
      monthName = "March";
      break;
    case 4:
      monthName = "April";
      break;
    case 5:
      monthName = "May";
      break;
    case 6:
      monthName = "June";
      break;
    case 7:
      monthName = "July";
      break;
    case 8:
      monthName = "August";
      break;
    case 9:
      monthName = "September";
      break;
    case 10:
      monthName = "October";
      break;
    case 11:
      monthName = "November";
      break;
    case 12:
      monthName = "December";
      break;
    default:
      monthName = "Invalid month";
  }

  return monthName;
}

const converDate = (data: []) => {
  const datetime = `${data.at(3)}:${data.at(4)} - ${data.at(2)} ${getMonthName(
    Number(data.at(1))
  )}, ${data.at(0)}`;
  return datetime;
};

const TopicComponent: React.FC<TopicProps> = (props: TopicProps) => {
  return (
    <div className="topic-component" onClick={props.onClick}>
      <div className="topic-component--img"></div>
      <div className="topic-component--title">{props.title}</div>
      <div className="topic-component--info">
        <div className="topic-component--info--ans">
          Answers: {props.numOfAnswers}
        </div>
        <div>Views: {props.numOfView}</div>
      </div>
      <div className="topic-component--date">{converDate(props.date)}</div>
    </div>
  );
};

export default TopicComponent;
