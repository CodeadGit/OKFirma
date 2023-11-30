import React from "react";

function RequestCaseItem({ item, selected, setSelected }) {

  const isSelected = (item) => {
    return selected === item;
  };

  return (
    <div
      onClick={() => setSelected(item)}
      className={`case-item ${isSelected(item) ? "selected" : "not-selected"}`}
    >
      {item}
    </div>
  );
}

export default RequestCaseItem;
