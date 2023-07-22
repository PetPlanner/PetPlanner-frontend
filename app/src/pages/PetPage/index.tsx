import { useParams } from "react-router-dom";
import "./index.scss";
import Card from "../../components/Card";
import PetForm from "../../components/Forms/PetForm";
import { addVaccine, findById } from "../../services/petService";
import { WarningMessage } from "../../utils/toastService/toastService";
import { useEffect, useState } from "react";
import Pet from "../../model/pet";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";

const initValue = {
  name: "",
  company: "",
  dossage: "",
};
const validationRule = (values: any) => {
  const required = "This field is required.";
  const errors: any = {};
  if (!values.name) {
    errors.name = required;
  }
  if (!values.company) {
    errors.company = required;
  }
  if (!values.dossage) {
    errors.dossage = required;
  }
  return errors;
};

const PetPage = () => {
  const params = useParams();
  const [pet, setPet] = useState<Pet>();
  const [open, setOpen] = useState<boolean>(false);
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
            <div className="pet-page__content__vaccines__buttons">
              <div className="pet-page__content__vaccines__buttons--btn">
                <button className="button-42" onClick={() => setOpen(true)}>
                  Add Vaccine
                </button>
              </div>
            </div>
            <table className="pet-page__content__vaccines--table">
              <thead className="pet-page__content__vaccines--thead">
                <th className="pet-page__content__vaccines--th">Name</th>
                <th className="pet-page__content__vaccines--th">Company</th>
                <th className="pet-page__content__vaccines--th">Dossage</th>
              </thead>
              <tbody className="pet-page__content__vaccines--tbody">
                {pet && getVaccines()}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <Dialog
        open={open}
        aria-labelledby="dialog-title"
        onClose={() => setOpen(false)}
      >
        <DialogTitle id="dialog-title">Add vaccine</DialogTitle>
        <DialogContent>
          <div className="vaccine-dialog-content">
            <Formik
              initialValues={initValue}
              validate={validationRule}
              onSubmit={async (values, { setSubmitting }) => {
                let res;
                let dto: any = {
                  name: values.name,
                  company: values.company,
                  dossage: values.dossage,
                  petId: pet?.id,
                };
                res = await addVaccine(dto);
                if (!res || !res.data) {
                  WarningMessage("Something went wrong");
                  return;
                }
                setPet(res.data);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="vet-container">
                  <div className="vet-container--wrapper">
                    <div className="vet-container__row">
                      <div>
                        <Field
                          type="text"
                          name="name"
                          className="vet-container__row--field"
                          placeholder="Name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="company"
                          className="vet-container__row--field"
                          placeholder="Company"
                        />
                        <ErrorMessage
                          name="company"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="dossage"
                          className="vet-container__row--field"
                          placeholder="Dossage"
                        />
                        <ErrorMessage
                          name="dossage"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                    </div>

                    <div className="vet-container__row__buttons">
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

export default PetPage;
