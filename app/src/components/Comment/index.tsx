import React from "react";
import "./index.scss";
import Rating from "@mui/material/Rating";

interface CommentProps {
  name: string;
  comment: string;
  grade: number;
  date: Date;
}

const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  return (
    <div className="comment__container">
      <div className="comment__container--img"></div>
      <div className="comment__container__content">
        <div className="comment__container__content__data">
          <div className="comment__container__content__data--user">
            {props.name}
            <div className="comment__container__content__data--grade">
              <Rating
                name="half-rating"
                defaultValue={props.grade}
                precision={0.5}
                readOnly
              />
            </div>
          </div>
          <div className="comment__container__content__data--date">
            {props.date.toDateString()}
          </div>
        </div>
        <div className="comment__container__content--comment">
          {props.comment}
        </div>
      </div>
    </div>
  );
};

export default Comment;
