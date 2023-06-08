import { useParams } from "react-router-dom";
import "./index.scss";
import Card from "../../components/Card";
import PetForm from "../../components/Forms/PetForm";
import { findById } from "../../services/petService";
import { WarningMessage } from "../../utils/toastService/toastService";
import { useEffect, useState } from "react";
import Pet from "../../model/pet";

const PetPage = () => {
  const params = useParams();
  const [pet, setPet] = useState<Pet>();
  const fetchData = async () => {
    let res;
    res = await findById(Number(params.id));
    if (!res || !res.data) {
      WarningMessage("Something went wrong.");
      return;
    }
    setPet(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const getVaccines = () => {
    let retVal: any[] = [];
    pet?.vaccines.map((vaccine: any) => {
      retVal.push(
        <tr key={vaccine.id} className="pet-page__content__vaccines--tr">
          <td className="pet-page__content__vaccines--td">{vaccine.name}</td>
          <td className="pet-page__content__vaccines--td">{vaccine.company}</td>
          <td className="pet-page__content__vaccines--td">{vaccine.dossage}</td>
          <td className="pet-page__content__vaccines--td">
            {vaccine.expirationDate}
          </td>
        </tr>
      );
    });
    return retVal;
  };
  return (
    <div className="pet-page">
      <Card width="80vw" height="80vh" backgroundColor="rgb(240, 248, 255)">
        <div className="pet-page__content">
          <div className="pet-page__content__info">
            <div
              className="pet-page__content__info--img"
              style={{ backgroundImage: "url(/dog1.jpg)" }}
            />
            {pet && (
              <PetForm
                name={pet.name}
                species={pet.species}
                date={pet.dateOfBirth}
              />
            )}
          </div>
          <div className="pet-page__content__vaccines">
            <table className="pet-page__content__vaccines--table">
              <thead className="pet-page__content__vaccines--thead">
                <th className="pet-page__content__vaccines--th">Name</th>
                <th className="pet-page__content__vaccines--th">Company</th>
                <th className="pet-page__content__vaccines--th">Dossage</th>
                <th className="pet-page__content__vaccines--th">
                  Expiration Date
                </th>
              </thead>
              <tbody className="pet-page__content__vaccines--tbody">
                {pet && getVaccines()}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PetPage;
