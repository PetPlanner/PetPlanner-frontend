import React from "react";
import "./index.scss";
const CardItem: React.FC<{ name: string; desc: string; url: string }> = (
  props
) => {
  return (
    <div className="container">
      <div className="card">
        <img src={props.url} alt={props.name} className="backgroundCard" />
        <div className="into">
          <h1 className="title">{props.name}</h1>
          <p className="desc">{props.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
