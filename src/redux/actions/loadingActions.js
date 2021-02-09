import * as action from "constants/actionType";

export const isCurrentlyFetching = (bool = true) => ({
  type: action.IS_LOADING,
  payload: bool,
});
