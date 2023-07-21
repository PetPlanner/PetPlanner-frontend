import { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import TrainingCard from "../../components/TrainingCard";
import "./index.scss";
import { findByImg } from "../../services/trainingService";
import { WarningMessage } from "../../utils/toastService/toastService";
import AuthContext from "../../utils/store/AuthContext";
import { useParams } from "react-router-dom";

const TrainingPage = () => {
  const [training, setTraining] = useState<any>();
  const context = useContext(AuthContext);
  const { type } = useParams();

  const fetchTraining = async () => {
    let res: any;
    res = await findByImg(String(type) + ".jpg");
    if (!res || !res.data) {
      WarningMessage("Something went wrong.");
      return;
    }
    setTraining(res.data);
  };

  useEffect(() => {
    fetchTraining();
  }, [context.user]);
  return (
    <div className="training">
      <Card width="80vw" height="80vh" backgroundColor="rgb(240, 248, 255)">
        {training && (
          <TrainingCard
            img={training.imgUrl}
            title={training.title}
            subtitle={training.subtitle}
            paraf={training.paragraph}
            steps={training.steps.split("|")}
          />
        )}
      </Card>
    </div>
  );
};

export default TrainingPage;
