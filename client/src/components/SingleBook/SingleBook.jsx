import React from "react";

const SingleBook = props => {
  return (
    <div key={props.info.id} onClick = {props.onClick}>
      <p>{props.info.title}</p>
    </div>
  );
};

export default SingleBook;
