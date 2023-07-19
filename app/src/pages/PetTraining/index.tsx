import Card from "../../components/Card";
import CommandCard from "../../components/CommandCard";
import "./index.scss";
const PetTrainingPage = () => {
  return (
    <div className="pet-training">
      <Card width="80vw" height="80vh" backgroundColor="rgb(240, 248, 255)">
        <div className="pet-training__container">
          <div className="pet-training__container__trainers">
            Ceo zivot sam u trening!
          </div>
          <div className="pet-training__container__commands">
            <div className="pet-training__container__commands--cmd">
              <CommandCard
                img="/come.jpg"
                title="How to train your dog to come when called"
                subtitle="Teach your dog to come to you when called."
              ></CommandCard>
            </div>
            <div className="pet-training__container__commands--cmd">
              <CommandCard
                img="/stay.jpg"
                title="How to train a dog to stay"
                subtitle="Teach your dog to stay in six easy steps."
              ></CommandCard>
            </div>

            <div className="pet-training__container__commands--cmd">
              <CommandCard
                img="/lie.jpg"
                title="How to train your dog to lie down"
                subtitle="Teach your dog to lie down in six easy steps."
              ></CommandCard>
            </div>
            <div className="pet-training__container__commands--cmd">
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
