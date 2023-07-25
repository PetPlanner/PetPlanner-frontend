import { useContext, useEffect, useState } from "react";
import Answer from "../../components/Answer";
import Card from "../../components/Card";
import "./index.scss";
import AuthContext from "../../utils/store/AuthContext";
import { useParams } from "react-router-dom";
import { findAllByTopicId, findByTopicId } from "../../services/forumService";
import { WarningMessage } from "../../utils/toastService/toastService";

const TopicPage = () => {
  const [answers, setAnswers] = useState([]);
  const [topic, setTopic] = useState({});
  const context = useContext(AuthContext);
  const { id } = useParams();

  const fetchAnswers = async () => {
    if (id != undefined) {
      let res: any;
      res = await findAllByTopicId(+id);
      if (!res || !res.data) {
        WarningMessage("Something went wrong.");
        return;
      }
      setAnswers(res.data);
    }
  };

  const fetchTopic = async () => {
    if (id != undefined) {
      let res: any;
      res = await findByTopicId(+id);
      if (!res || !res.data) {
        WarningMessage("Something went wrong.");
        return;
      }
      setTopic(res.data);
    }
  };

  useEffect(() => {
    fetchTopic();
    fetchAnswers();
  }, [context.user.id]);

  const getAnswers = () => {
    let retVal = [];
    for (let a of answers) {
      retVal.push(
        <Answer
          key={Math.random()}
          name={(a as any).name}
          text={(a as any).text}
          date={(a as any).dateTime}
        ></Answer>
      );
    }
    return retVal;
  };

  return (
    <div className="topic-page">
      <Card width="80vw" height="80vh" backgroundColor="rgba(240, 248, 255)">
        <div className="topic-page__topic">
          <div className="topic-page__topic__left">
            <div className="topic-page__topic__left--img"></div>
            <div className="topic-page__topic__left--name">Zika</div>
          </div>
          <div className="topic-page__topic__content">
            {topic && (topic as any).text}
          </div>
        </div>
        <div className="topic-page__answers">{answers && getAnswers()}</div>
        <div className="topic-page__add"></div>
      </Card>
    </div>
  );
};

export default TopicPage;
