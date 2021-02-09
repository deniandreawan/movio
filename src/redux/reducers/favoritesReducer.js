import * as act from "constants/actionType";

const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case act.ADD_TO_FAVORITES:
      return [action.payload, ...state];
    case act.REMOVE_FROM_FAVORITES:
      return state.filter((favorite) => favorite.id !== action.payload);
    default:
      return state;
  }
};

export default favoritesReducer;
