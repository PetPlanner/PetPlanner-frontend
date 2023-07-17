import { useNavigate } from "react-router-dom";
import "./index.scss";

interface Message {
  id: string;
  title: string;
  msg: string;
  seen: string;
  dateTime: [];
  background?: string;
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

const Message: React.FC<Message> = (props: Message) => {
  const navigate = useNavigate();
  return (
    <div
      className="message-container"
      onClick={() => navigate("/notification/" + props.id, { state: props.id })}
    >
      <div
        className="message-container__content"
        style={{ background: props.background }}
      >
        <div className="message-container__content--title">{props.seen}</div>
        <div className="message-container__content--message">{props.title}</div>
        <div className="message-container__content--date">
          {converDate(props.dateTime)}
        </div>
      </div>
    </div>
  );
};

export default Message;
