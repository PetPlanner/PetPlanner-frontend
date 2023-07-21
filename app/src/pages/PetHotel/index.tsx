import { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import SearchComponent from "../../components/Search";
import "./index.scss";
import AuthContext from "../../utils/store/AuthContext";
import {
  SuccesMessage,
  WarningMessage,
} from "../../utils/toastService/toastService";
import CommentModel from "../../model/comment";
import { create, findByObjectIdAndStatus } from "../../services/commentService";
import ImageGallery from "react-image-gallery";
import Comment from "../../components/Comment";
import HotelForm from "../../components/Forms/HotelForm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
} from "@mui/material";
import useRouteProtector from "../../utils/routeProtector/routeProtector";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createHotel } from "../../services/hotelService";

const images = [
  {
    original: "http://localhost:3000/hotel444.jpg",
    thumbnail: "http://localhost:3000/hotel4444.jpg",
  },
  {
    original: "http://localhost:3000/hotel555.jpg",
    thumbnail: "http://localhost:3000/hotel5555.jpg",
  },
];

const initValue = {
  name: "",
  capacity: "",
  hostId: "",
  country: "",
  city: "",
  street: "",
  lon: "",
  lat: "",
};
const validationRule = (values: any) => {
  const required = "This field is required.";
  const errors: any = {};
  if (!values.name) {
    errors.name = required;
  }
  if (!values.capacity) {
    errors.capacity = required;
  }
  if (!values.hostId) {
    errors.hostId = required;
  }
  if (!values.country) {
    errors.country = required;
  }
  if (!values.street) {
    errors.street = required;
  }
  if (!values.lon) {
    errors.lon = required;
  }
  if (!values.city) {
    errors.city = required;
  }
  if (!values.lat) {
    errors.lat = required;
  }
  return errors;
};

const PetHotel = () => {
  const context = useContext(AuthContext);
  const [selectedStation, setSelectedStation] = useState();
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [newCommnet, setNewComment] = useState();
  const [rating, setRating] = useState<number | null>(0);
  useRouteProtector({
    roles: ["CUSTOMER", "ADMIN", "DRIVER", "WALKER", "VET", "TRAINER"],
  });

  const handleData = async (data: any) => {
    setSelectedStation(data);
    fetchComments(data.id);
  };

  const getCommentList = () => {
    let retVal = [];
    if (comments.length === 0) {
      retVal.push(<div className="no-comment">No comments yet.</div>);
    }
    for (let c of comments) {
      retVal.push(
        <Comment
          name={c.name}
          comment={c.comment}
          date={
            new Date(
              c.date.at(0) as any,
              c.date.at(1) as any,
              c.date.at(2) as any,
              c.date.at(3) as any,
              c.date.at(4) as any,
              c.date.at(5) as any
            )
          }
          grade={c.grade}
          key={c.id}
        />
      );
    }
    return retVal;
  };
  useEffect(() => {
    if (selectedStation) fetchComments((selectedStation as any).id);
  }, [comments]);

  const handlePostComment = async () => {
    let res: any;
    let dto = {
      grade: rating,
      comment: newCommnet,
      userId: context.user.id,
      objectId: (selectedStation as any).id,
      objectType: "HOTEL",
    };
    res = await create(dto);
    if (!res || !res.data) {
      WarningMessage("Something went wrong");
      return;
    }
    setComments(res.data);
    SuccesMessage("The comment has been successfully posted.");
  };

  const fetchComments = async (id: number) => {
    let response: any;
    response = await findByObjectIdAndStatus(id, "HOTEL");
    if (!response || !response.data) {
      WarningMessage("Something went wrong.");
      return;
    }
    setComments(response.data);
  };

  return (
    <div className="pet-hotel">
      <Card width="80vw" height="80vh" backgroundColor="rgb(240, 248, 255)">
        <div className="vet-station__search">
          <SearchComponent onData={handleData} isVet={false}></SearchComponent>

          {context.user.role === "ADMIN" && (
            <div className="vet-station__search--button">
              <button className="button-42" onClick={() => setOpen(true)}>
                Add
              </button>
            </div>
          )}
        </div>
        <div className="pet-hotel__content">
          <div className="pet-hotel__content__data">
            <Card width="100%" height="100%">
              <div style={{ position: "relative" }}>
                {selectedStation &&
                  (selectedStation as any).avgGrade >= 4.5 && (
                    <div className="achivment"></div>
                  )}
                <div className="vet-station__content__data--title">
                  {selectedStation && (selectedStation as any).name}
                </div>
                {selectedStation && (
                  <HotelForm
                    location={`${(selectedStation as any).address.street}, ${
                      (selectedStation as any).address.city
                    }`}
                    capacity={(selectedStation as any).capacity}
                  />
                )}
              </div>
              {selectedStation && (
                <div className="vet-station__content__comment">
                  <div className="vet-station__content__comment--title">
                    Comments
                  </div>
                  <div className="vet-station__content__comment--list">
                    {comments && getCommentList()}
                  </div>
                  <div className="vet-station__content__comment--post">
                    <div className="vet-station__content__comment--post--input">
                      <Rating
                        name="simple-controlled"
                        value={rating}
                        precision={0.5}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                      />
                      <input
                        className="vet-station__content__comment--post--input--field"
                        type="text"
                        placeholder="Share your comment with anyone, or everyone."
                        onChange={(e: any) => {
                          setNewComment(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      className="comment--button"
                      onClick={handlePostComment}
                    >
                      POST
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </div>
          <div className="pet-hotel__content__media">
            <div className="pet-hotel__content__media__carosel">
              <ImageGallery items={images} />
            </div>
          </div>
        </div>
      </Card>
      <Dialog
        open={open}
        aria-labelledby="dialog-title"
        onClose={() => setOpen(false)}
      >
        <DialogTitle id="dialog-title">Add new hotel</DialogTitle>
        <DialogContent>
          <div className="vet-dialog-content">
            <Formik
              initialValues={initValue}
              validate={validationRule}
              onSubmit={async (values, { setSubmitting }) => {
                let res;
                let dto: any = {
                  name: values.name,
                  capacity: values.capacity,
                  hostId: values.hostId,
                  address: {
                    country: values.country,
                    city: values.city,
                    street: values.street,
                    lon: values.lon,
                    lat: values.lat,
                  },
                };
                res = await createHotel(dto);
                if (!res || !res.data) {
                  WarningMessage("Something went wrong");
                  return;
                }
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
                          name="capacity"
                          className="vet-container__row--field"
                          placeholder="Capacity"
                        />
                        <ErrorMessage
                          name="capacity"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                    </div>
                    <div className="vet-container__row">
                      <div>
                        <Field
                          type="text"
                          name="country"
                          className="vet-container__row--field"
                          placeholder="Country"
                        />
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="city"
                          className="vet-container__row--field"
                          placeholder="City"
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                    </div>
                    <div className="vet-container__row">
                      <div>
                        <Field
                          type="text"
                          name="lon"
                          className="vet-container__row--field"
                          placeholder="Lon"
                        />
                        <ErrorMessage
                          name="lon"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="lat"
                          className="vet-container__row--field"
                          placeholder="Lat"
                        />
                        <ErrorMessage
                          name="lat"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                    </div>
                    <div className="vet-container__row">
                      <div>
                        <Field
                          type="text"
                          name="street"
                          className="vet-container__row--field"
                          placeholder="Street"
                        />
                        <ErrorMessage
                          name="street"
                          component="div"
                          className="vet-container__row--error"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="hostId"
                          className="vet-container__row--field"
                          placeholder="HostId"
                        />
                        <ErrorMessage
                          name="hostId"
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

export default PetHotel;
