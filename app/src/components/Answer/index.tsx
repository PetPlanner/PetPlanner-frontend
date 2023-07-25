import "./index.scss";

interface AnswerProps {
  name: string;
  text: string;
  date: [];
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

const Answer: React.FC<AnswerProps> = (props: AnswerProps) => {
  return (
    <div className="answer-container">
      <div className="answer-container__wrap">
        <div className="answer-container__wrap--img"></div>
        <div className="answer-container__wrap--name">{props.name}</div>
      </div>
      <div className="answer-container__content">
        <div className="answer-container__content--text">{props.text}</div>
        <div className="answer-container__content--date">
          {converDate(props.date)}
        </div>
      </div>
    </div>
  );
};

export default Answer;
