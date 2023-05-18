import React from "react";
import { isEmpty } from "helpers/helperFunctions";
import LoadingScreen from "../shared/LoadingScreen";

const Loader = (propName) => (Component) => {
  return (props) => {
    const checkIfEmpty = () => {
      if (typeof propName === "string") {
        return isEmpty(props[propName]);
      } else if (typeof propName === "object") {
        return propName.every((prop) => isEmpty(props[prop]));
      } else {
        return false;
      }
    };

    return checkIfEmpty() && props.isLoading ? (
      <React.Fragment>
        <LoadingScreen />
        <Component {...props} />
      </React.Fragment>
    ) : (
      <Component {...props} />
    );
  };
};

export default Loader;
