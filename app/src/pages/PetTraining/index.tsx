import { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import CommandCard from "../../components/CommandCard";
import "./index.scss";
import { findByRole } from "../../services/userService";
import { WarningMessage } from "../../utils/toastService/toastService";
import AuthContext from "../../utils/store/AuthContext";
import TrainerCard from "../../components/TrainerCard";
import { useNavigate } from "react-router-dom";
import useRouteProtector from "../../utils/routeProtector/routeProtector";
const PetTrainingPage = () => {
  const [trainers, setTrainers] = useState([]);
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);
  useRouteProtector({
    roles: ["CUSTOMER", "ADMIN", "DRIVER", "WALKER", "VET", "TRAINER"],
  });
  const fetchTrainers = async () => {
    let res: any;
    res = await findByRole("TRAINER");
    if (!res || !res.data) {
      WarningMessage("Something went wrong.");
      return;
    }
    setTrainers(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchTrainers();
  }, [context.user.id]);

  const getTrainers = () => {
    let retVal = [];
    for (let t of trainers) {
      retVal.push(
        <div className="pet-training__container__trainers--card">
          <TrainerCard
            img={`/${(t as any).firstname}.jpg`}
            name={(t as any).firstname + " " + (t as any).lastname}
            email={(t as any).email}
          />
        </div>
      );
    }

    return retVal;
  };

  const tmp = (array: any) => {
    if (number === trainers.length) {
      return array.slice(0, 2);
    } else if (number === trainers.length - 1) {
      return [array[trainers.length - 1], array[0]];
    } else {
      return array.slice(number, number + 2);
    }
  };

  const changeCounter = (direction: string) => {
    if (direction === "left") {
      if (number !== 0) {
        setNumber(number - 1);
      } else setNumber(trainers.length);
    } else {
      if (number !== trainers.length) {
        setNumber(number + 1);
      } else setNumber(0);
    }
  };

  return (
    <div className="pet-training">
      <Card width="80vw" height="80vh" backgroundColor="rgb(240, 248, 255)">
        <div className="pet-training__container">
          <div className="pet-training__container__trainers">
            <div
              className="arrow-left"
              onClick={() => {
                changeCounter("left");
              }}
            ></div>
            {trainers && tmp(getTrainers())}
            <div
              className="arrow-right"
              onClick={() => {
                changeCounter("right");
              }}
            ></div>
          </div>
          <div className="pet-training__container__commands">
            <div
              className="pet-training__container__commands--cmd"
              onClick={() => navigate("/training/come")}
            >
              <CommandCard
                img="/come.jpg"
                title="How to train your dog to come when called"
                subtitle="Teach your dog to come to you when called."
              ></CommandCard>
            </div>
            <div
              className="pet-training__container__commands--cmd"
              onClick={() => navigate("/training/stay")}
            >
              <CommandCard
                img="/stay.jpg"
                title="How to train a dog to stay"
                subtitle="Teach your dog to stay in six easy steps."
              ></CommandCard>
            </div>

            <div
              className="pet-training__container__commands--cmd"
              onClick={() => navigate("/training/lie")}
            >
              <CommandCard
                img="/lie.jpg"
                title="How to train your dog to lie down"
                subtitle="Teach your dog to lie down in six easy steps."
              ></CommandCard>
            </div>
            <div
              className="pet-training__container__commands--cmd"
              onClick={() => navigate("/training/sit")}
            >
              <CommandCard
                img="/sit.jpg"
                title="How to train a dog to sit"
                subtitle="Teach your dog to sit in six easy steps."
              ></CommandCard>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PetTrainingPage;
