import React from "react";
import { useState } from "react";
import vcont from "./VerificationContext";
function Vprovider(props) {
  const [helper, sethelper] = useState({
    name: "",
  });
  const update = (data) => {
    sethelper({ name: data });
  };
  return (
    <vcont.Provider value={{ helper, update }}>
      <div>{props.children}</div>
    </vcont.Provider>
  );
}

export default Vprovider;
