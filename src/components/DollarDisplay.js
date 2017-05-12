import React from "react";

const DollarDisplay = (props) => {
  return (
    <span>$ {props.amount.toFixed(2)}</span>
  );
};

export default DollarDisplay;
