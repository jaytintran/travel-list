import React from "react";
import "../index.css";
import { useState } from "react";

function Clear({ clearList }) {
  return (
    <button className="clear" onClick={clearList}>
      Clear Lists
    </button>
  );
}

export default Clear;
