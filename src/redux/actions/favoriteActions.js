import * as action from "constants/actionType";

export const addToFavorites = (favorites) => ({
  type: action.ADD_TO_FAVORITES,
  payload: favorites,
});

export const removeFromFavorites = (id) => ({
  type: action.REMOVE_FROM_FAVORITES,
  payload: id,
});
