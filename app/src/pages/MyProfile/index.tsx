import { useContext, useEffect, useState } from "react";
import NavButton from "../../components/Button";
import Card from "../../components/Card";
import FlipCard from "../../components/FlipCard";
import ProfileForm from "../../components/Forms/ProfileForm";
import "./index.scss";
import AuthContext from "../../utils/store/AuthContext";
import { findUserById } from "../../services/userService";
import { WarningMessage } from "../../utils/toastService/toastService";
import { createPet, findPetsByUserId } from "../../services/petService";
import Pet from "../../model/pet";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";

const initValue = {
  name: "",
  dateOfBirth: "",
  species: "",
};

const validationRule = (values: any) => {
  const required = "This field is required.";
  const errors: any = {};
  if (!values.name) {
    errors.name = required;
  }
  if (!values.dateOfBirth) {
    errors.dateOfBirth = required;
  }
  if (!values.species) {
    errors.species = required;
  }
  return errors;
};

const MyProfilePage = () => {
  const [user, setUser] = useState();
  const context = useContext(AuthContext);
  const [pets, setPets] = useState<Pet[]>([]);
  const [open, setOpen] = useState<boolean>(false);

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
          key={pet.id}
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
                    setOpen(true);
                  }}
                ></NavButton>
              </Card>
            </div>
          </div>
        </div>
      </Card>
      <Dialog
        open={open}
        aria-labelledby="dialog-title"
        onClose={() => setOpen(false)}
      >
        <DialogTitle id="dialog-title">Add new pet</DialogTitle>
        <DialogContent>
          <div className="dialog-content">
            <Formik
              initialValues={initValue}
              validate={validationRule}
              onSubmit={async (values, { setSubmitting }) => {
                let res;
                let dto: any = {
                  name: values.name,
                  dateOfBirth: values.dateOfBirth,
                  species: values.species,
                  userId: context.user.id,
                };
                res = await createPet(dto);
                if (!res || !res.data) {
                  WarningMessage("Something went wrong");
                  return;
                }
                setPets(res.data);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="pet-container">
                  <div className="pet-container--wrapper">
                    <div className="pet-container__row">
                      <Field
                        type="text"
                        name="name"
                        className="pet-container__row--field"
                        placeholder="Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="pet-container__row--error"
                      />
                    </div>
                    <div className="pet-container__row">
                      <Field
                        type="text"
                        name="dateOfBirth"
                        className="pet-container__row--field"
                        placeholder="Date Of Birth"
                      />
                      <ErrorMessage
                        name="dateOfBirth"
                        component="div"
                        className="pet-container__row--error"
                      />
                    </div>
                    <div className="pet-container__row">
                      <Field
                        type="text"
                        name="species"
                        className="pet-container__row--field"
                        placeholder="Species"
                      />
                      <ErrorMessage
                        name="species"
                        component="div"
                        className="pet-container__row--error"
                      />
                    </div>
                    <div className="pet-container__row__buttons">
                      <DialogActions>
                        <div className="dialog-buttons">
                          <button
                            className="button-16"
                            role="button"
                            type="button"
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="button-15"
                            role="button"
                            type="submit"
                            onClick={async () => {
                              setOpen(false);
                            }}
                          >
                            Add
                          </button>
                        </div>
                      </DialogActions>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyProfilePage;
