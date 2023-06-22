import { Field, Form, Formik } from "formik";
import "./index.scss";
import { searchVet } from "../../services/vetService";
import { WarningMessage } from "../../utils/toastService/toastService";
import { useState } from "react";
import VetStation from "../../model/vetStation";

interface ChildProps {
  onData: (data: VetStation) => void;
}

const SearchComponent: React.FC<ChildProps> = ({ onData }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<VetStation[]>([]);

  const getSearchResult = () => {
    let retVal = [];
    for (let item of data) {
      retVal.push(
        <div
          className="list-item"
          key={item.id}
          onClick={() => {
            setOpen(false);
            onData(item);
          }}
        >
          <div className="list-item--image"></div>
          <div className="list-item--content">{item.name}</div>
          <div className="list-item--address">
            {item.address.country}, {item.address.city}, {item.address.street}
          </div>
        </div>
      );
    }
    return retVal;
  };
  return (
    <div className="search-comp">
      <div className="search-comp__container">
        <Formik
          initialValues={{ name: "", country: "", city: "", street: "" }}
          validate={(values) => {}}
          onSubmit={async (values, { setSubmitting }) => {
            let res: any;
            res = await searchVet(values);
            if (!res || !res.data) {
              WarningMessage("Something went wrong.");
              return;
            }
            setOpen(true);
            setData(res.data);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="search-comp__container__form">
              <div className="search-comp__container__form--wrap">
                <Field
                  type="text"
                  name="name"
                  className="search-comp__container__form--field"
                  placeholder="Name"
                />
                <Field
                  type="text"
                  name="country"
                  className="search-comp__container__form--field"
                  placeholder="Country"
                />
                <Field
                  type="text"
                  name="city"
                  className="search-comp__container__form--field"
                  placeholder="City"
                />
                <Field
                  type="text"
                  name="street"
                  className="search-comp__container__form--field"
                  placeholder="Street"
                />
                <div className="search-comp__container__form--button">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-42"
                  >
                    Search
                  </button>
                </div>
              </div>
              {isOpen && (
                <div className="search-comp__container__list">
                  {getSearchResult()}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SearchComponent;
