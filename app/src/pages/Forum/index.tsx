import { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import "./index.scss";
import { findAllByStatus } from "../../services/forumService";
import { WarningMessage } from "../../utils/toastService/toastService";
import AuthContext from "../../utils/store/AuthContext";
import TopicComponent from "../../components/Topic";
import { useNavigate } from "react-router-dom";
const ForumPage = () => {
  const [topics, setTopics] = useState([]);
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const fetchTopics = async () => {
    let res: any;
    res = await findAllByStatus("ACCEPTED");
    if (!res || !res.data) {
      WarningMessage("Something went wrong.");
      return;
    }
    setTopics(res.data);
  };

  useEffect(() => {
    fetchTopics();
  }, [context.user]);

  const getTopics = () => {
    let retVal = [];
    for (let t of topics) {
      retVal.push(
        <TopicComponent
          title={(t as any).title}
          numOfAnswers={(t as any).numOfAnswers}
          numOfView={(t as any).numberOfPreview}
          date={(t as any).dateTime}
          key={Math.random()}
          onClick={() => navigate("/topic/" + (t as any).topicId)}
        />
      );
    }
    return retVal;
  };
  return (
    <div className="forum">
      <Card width="80vw" height="80vh" backgroundColor="rgb(240, 248, 255)">
        <div className="forum__buttons"></div>
        <div className="forum__content">{topics && getTopics()}</div>
      </Card>
    </div>
  );
};

export default ForumPage;
