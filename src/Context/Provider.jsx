import React from "react";
import { useState } from "react";
import cont from "./Context";
function Provider(props) {
  const [helper, sethelper] = useState({
    name: "",
  });
  const update = (data) => {
    sethelper({ name: data });
  };

  return (
    <cont.Provider value={{ helper, update }}> {props.children}</cont.Provider>
  );
}

export default Provider;
