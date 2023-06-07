import { useContext, useEffect, useState } from "react";
import NavButton from "../../components/Button";
import Card from "../../components/Card";
import FlipCard from "../../components/FlipCard";
import ProfileForm from "../../components/Forms/ProfileForm";
import "./index.scss";
import AuthContext from "../../utils/store/AuthContext";
import { findUserById } from "../../services/userService";
import { WarningMessage } from "../../utils/toastService/toastService";
import { findPetsByUserId } from "../../services/petService";
import Pet from "../../model/pet";

const MyProfilePage = () => {
  const [user, setUser] = useState();
  const context = useContext(AuthContext);
  const [pets, setPets] = useState<Pet[]>([]);

  const fetchLoggedUser = async () => {
    let response: any;
    response = await findUserById(Number(context.user.id));
    if (!response || !response.data) {
      WarningMessage("Something went wrong, try again later...");
      return;
    }
    setUser(response.data);
  };

  const fetchPets = async () => {
    let res;
    res = await findPetsByUserId(+context.user.id);
    if (!res && !res.data) {
      WarningMessage("Something went wrong.");
      return;
    }
    setPets(res.data);
  };
  useEffect(() => {
    fetchLoggedUser();
    fetchPets();
  }, [context.user]);

  const getPetCards = () => {
    let retVal = [];
    for (let pet of pets) {
      let imgUrl = `/dog${pet.id % 9}.jpg`;
      retVal.push(
        <FlipCard
          width={cardSize}
          height={cardSize}
          img={imgUrl}
          name={pet.name}
        />
      );
    }
    return retVal;
  };

  const cardSize = "9vw";
  return (
    <div className="my-profile-page">
      <Card
        width="80vw"
        height="80vh"
        backgroundColor="rgba(240, 248, 255,0.5)"
      >
        <div className="my-profile-page__container">
          <div className="my-profile-page__container--title">
            My Personal Information
          </div>
          <div className="my-profile-page__container--cards">
            <div className="my-profile-page__container__info">
              <Card
                width="100%"
                height="100%"
                backgroundColor="rgba(240, 248, 255,1)"
              >
                <div className="my-profile-page__container__info--title">
                  About Me
                </div>
                <div className="my-profile-page__container__info__content">
                  <div className="my-profile-page__container__info__content__icon">
                    <div className="my-profile-page__container__info__content__icon--icon"></div>
                  </div>
                  {user && <ProfileForm user={user} />}
                </div>
              </Card>
            </div>
            <div className="my-profile-page__container__pets">
              <Card
                width="100%"
                height="100%"
                backgroundColor="rgba(240, 248, 255,1)"
              >
                <div className="my-profile-page__container__pets--title">
                  Pets
                </div>
                <div className="my-profile-page__container__pets--content">
                  {pets && getPetCards()}
                </div>
                <NavButton
                  text={"Add Pets"}
                  submitHandler={() => {
                    alert("Not implemented.");
                  }}
                ></NavButton>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyProfilePage;
