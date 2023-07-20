import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import "./index.scss";
import AuthContext from "../../utils/store/AuthContext";
import { create, findById } from "../../services/messageService";
import {
  SuccesMessage,
  WarningMessage,
} from "../../utils/toastService/toastService";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const NewMessagePage = () => {
  const [to, setTo] = useState<string>();
  const [subject, setSubject] = useState<string>();
  const [message, setMessage] = useState<string>();
  const contex = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchMessage = async () => {
    if (id != undefined) {
      let res: any;
      res = await findById(+id);
      if (!res || !res.data) {
        WarningMessage("Something went wrong.");
        return;
      }
      setTo(res.data.sender);
      setMessage(res.data.message);
      setSubject(res.data.subject);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [contex.user.id]);

  const handleSendClick = async () => {
    let dto = {
      recieverUsername: to,
      message: message,
      subject: subject,
      sender: contex.user.id,
    };
    console.log(dto);
    let res: any;
    res = await create(dto);
    if (!res || !res.data) {
      WarningMessage("Something went wrong.");
      return;
    }
    SuccesMessage("The message has been successfully sent.");
    navigate("/");
  };
  return (
    <div className="new-message-page">
      <Card width="80vw" height="80vh" backgroundColor="rgba(240, 248, 255)">
        <div className="new-message-page__title">Send New Message</div>
        <div className="new-message-page__content">
          <div className="new-message-page__content__sidebar">
            <div
              className="new-message-page__content__sidebar__item"
              onClick={() => navigate("/inbox")}
            >
              <div
                className="new-message-page__content__sidebar__item--icon"
                style={{
                  backgroundImage: `url("inbox.png")`,
                }}
              ></div>
              <div className="new-message-page__content__sidebar__item--text">
                Inbox
              </div>
            </div>
            <div className="new-message-page__content__sidebar__item">
              <div
                className="new-message-page__content__sidebar__item--icon"
                style={{
                  backgroundImage: `url("email.png")`,
                }}
              ></div>
              <div className="new-message-page__content__sidebar__item--text">
                Sent
              </div>
            </div>
          </div>
          <div className="new-message-page__content__container">
            <input
              type="text"
              placeholder="To:"
              className="new-message-page__content__container--to"
              onChange={(e) => {
                setTo(e.target.value);
              }}
              value={to}
            />
            <input
              type="text"
              placeholder="Subject:"
              className="new-message-page__content__container--subject"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              value={subject}
            />
            <textarea
              placeholder="Enter text..."
              className="new-message-page__content__container--message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
            {id == undefined ? (
              <div id="send-btn" onClick={handleSendClick}>
                Send Message
              </div>
            ) : (
              <div
                id="send-btn"
                onClick={() => {
                  navigate("/new-message");
                  setSubject("Re:[ " + subject + " ]");
                  setMessage("");
                }}
              >
                Reply Message
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NewMessagePage;
