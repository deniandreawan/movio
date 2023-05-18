import * as action from "@/constants/actionType";

export const fetchSelectedPerson = (id) => ({
  type: action.FETCH_SELECTED_PERSON,
  payload: id,
});

export const fetchPeople = (query, page = 1) => ({
  type: action.FETCH_PEOPLE,
  payload: {
    query,
    page,
  },
});
