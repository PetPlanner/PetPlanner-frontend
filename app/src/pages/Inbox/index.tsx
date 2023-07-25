import { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import "./index.scss";
import AuthContext from "../../utils/store/AuthContext";
import { findByRecieverId } from "../../services/messageService";
import { WarningMessage } from "../../utils/toastService/toastService";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";
import useRouteProtector from "../../utils/routeProtector/routeProtector";
const InboxPage = () => {
  const [messages, setMessages] = useState();
  const contex = useContext(AuthContext);
  const navigate = useNavigate();
  useRouteProtector({
    roles: ["CUSTOMER", "ADMIN", "DRIVER", "WALKER", "VET", "TRAINER"],
  });

  const fetchMessages = async () => {
    let res: any;
    res = await findByRecieverId(+contex.user.id);
    if (!res || !res.data) {
      WarningMessage("Something went wrong.");
      return;
    }
    setMessages(res.data);
  };

  const getMessagess = () => {
    let retVal = [];
    if ((messages as any).length == 0) {
      retVal.push(<div>You don't have message yet.</div>);
      return retVal;
    }
    for (let not of messages as any) {
      let seen;
      let back;
      not.seen ? (seen = "   ") : (seen = "New");
      not.seen ? (back = "rgb(240, 240, 240)") : (back = "rgb(250, 250, 250)");
      retVal.push(
        <div
          onClick={() => {
            navigate("/new-message/" + not.id);
          }}
          key={Math.random()}
        >
          <Message
            id={not.id}
            seen={seen}
            title={not.subject}
            msg={not.message}
            dateTime={not.dateTime}
            background={back}
          />
        </div>
      );
    }
    return retVal;
  };

  useEffect(() => {
    fetchMessages();
  }, [contex.user.id]);
  return (
    <div className="inbox-page">
      <Card width="80vw" height="80vh" backgroundColor="rgba(240, 248, 255)">
        <div className="inbox-page__title">Message Inbox</div>
        <div className="inbox-page__content">{messages && getMessagess()}</div>
        <div className="inbox-page__btn">
          <div
            className="inbox-page__btn--new"
            onClick={() => {
              navigate("/new-message");
            }}
          >
            New Message
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InboxPage;
