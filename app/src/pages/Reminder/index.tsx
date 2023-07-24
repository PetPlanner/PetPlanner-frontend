import { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import "./index.scss";
import AuthContext from "../../utils/store/AuthContext";
import {
  changeStatus,
  create,
  deleteById,
  findAllByUserId,
} from "../../services/reminderService";
import { WarningMessage } from "../../utils/toastService/toastService";
import { Switch } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";

const initValue = {
  exactDate: "",
  dailyHour: "",
  text: "",
};
const validationRule = (values: any) => {
  const required = "This field is required.";
  const errors: any = {};
  if (!values.text) {
    errors.text = required;
  }
  if (values.dailyHour && values.exactDate) {
    errors.dailyHour = "Input just one.";
    errors.exactDate = "Input just one.";
  }
  return errors;
};

const ReminderPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [reminders, setReminders] = useState([]);
  const context = useContext(AuthContext);

  const fetchReminders = async () => {
    let res: any;
    res = await findAllByUserId(+context.user.id);
    if (!res || !res.data) {
      WarningMessage("Something went wrong.");
      return;
    }
    console.log(res.data);
    setReminders(res.data);
  };

  useEffect(() => {
    fetchReminders();
  }, [context.user.id]);

  function getMonthName(monthNumber: number) {
    var monthName;

    switch (monthNumber) {
      case 1:
        monthName = "January";
        break;
      case 2:
        monthName = "February";
        break;
      case 3:
        monthName = "March";
        break;
      case 4:
        monthName = "April";
        break;
      case 5:
        monthName = "May";
        break;
      case 6:
        monthName = "June";
        break;
      case 7:
        monthName = "July";
        break;
      case 8:
        monthName = "August";
        break;
      case 9:
        monthName = "September";
        break;
      case 10:
        monthName = "October";
        break;
      case 11:
        monthName = "November";
        break;
      case 12:
        monthName = "December";
        break;
      default:
        monthName = "Invalid month";
    }

    return monthName;
  }

  const converDate = (data: []) => {
    if (!data) return "-";
    const datetime = `${data.at(2)} ${getMonthName(
      Number(data.at(1))
    )}, ${data.at(0)}`;
    return datetime;
  };

  const getReminders = () => {
    let retVal = [];
    for (let r of reminders) {
      retVal.push(
        <tr key={Math.random()} className="reminder__content__table__thead--tr">
          <td className="reminder__content__table__thead--td">
            {(r as any).text}
          </td>
          <td className="reminder__content__table__thead--td">
            {(r as any).dailyHour === 0 ? "-" : (r as any).dailyHour}
          </td>
          <td className="reminder__content__table__thead--td">
            {converDate((r as any).exactDate)}
          </td>
          <td className="reminder__content__table__thead--td">
            <Switch
              checked={(r as any).activate}
              onChange={async () => {
                let res: any;
                res = await changeStatus(+(r as any).id);
                if (!res || !res.data) {
                  WarningMessage("Something went wrong.");
                  return;
                }
                setReminders(res.data);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </td>
          <td className="reminder__content__table__thead--td">
            <button
              className="button-24"
              role="button"
              onClick={async () => {
                let res: any;
                res = await deleteById(+(r as any).id);
                if (!res || !res.data) {
                  WarningMessage("Something went wrong.");
                  return;
                }
                setReminders(res.data);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
    return retVal;
  };
  return (
    <div className="reminder">
      <Card width="80vw" height="80vh" backgroundColor="rgb(240, 248, 255)">
        <div className="reminder__buttons">
          <div className="reminder__buttons--btn">
            <button className="button-42" onClick={() => setOpen(true)}>
              Set reminder
            </button>
          </div>
        </div>

        <div className="reminder__content">
          <table className="reminder__content__table">
            <thead className="reminder__content__table__thead">
              <th className="reminder__content__table__thead--th">Text</th>
              <th className="reminder__content__table__thead--th">Daily[H]</th>
              <th className="reminder__content__table__thead--th">
                Exact Date
              </th>
              <th className="reminder__content__table__thead--th">Activate</th>
              <th className="reminder__content__table__thead--th">Delete</th>
            </thead>
            <tbody>{reminders && getReminders()}</tbody>
          </table>
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
                  text: values.text,
                  dailyHour: +values.dailyHour,
                  exactDate: values.exactDate,
                  userId: context.user.id,
                };
                res = await create(dto);
                if (!res || !res.data) {
                  WarningMessage("Something went wrong");
                  return;
                }
                setReminders(res.data);
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
                          name="text"
                          className="vet-container__row--field"
                          placeholder="Text"
                        />
                        <ErrorMessage
                          name="text"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="dailyHour"
                          className="vet-container__row--field"
                          placeholder="Daily reminder in hour"
                        />
                        <ErrorMessage
                          name="dailyHour"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="exactDate"
                          className="vet-container__row--field"
                          placeholder="Reminder for exact date"
                        />
                        <ErrorMessage
                          name="exactDate"
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

export default ReminderPage;
