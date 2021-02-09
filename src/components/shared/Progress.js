import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isCurrentlyFetching } from "redux/actions/loadingActions";

const Progress = ({ history, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
      dispatch(isCurrentlyFetching(false));
    };
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default withRouter(Progress);
