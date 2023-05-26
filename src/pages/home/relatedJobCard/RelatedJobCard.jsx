import React from "react";

function RelatedJobCard({ item }) {
  return (
    <div className="cardContainer">
      <div className="left">left</div>
      <div className="right">{item.MainWish}</div>
    </div>
  );
}

export default RelatedJobCard;
