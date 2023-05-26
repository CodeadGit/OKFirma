import React from "react";
import RequestCaseItem from "./RequestCaseItem";

function RequestCases({ selected, setSelected, cases }) {
  return (
    <div className="subject-selectors">
      {cases.map((i, index) => {
        return (
          <RequestCaseItem
            key={index}
            item={i}
            setSelected={setSelected}
            selected={selected}
          />
        );
      })}
    </div>
  );
}

export default RequestCases;
