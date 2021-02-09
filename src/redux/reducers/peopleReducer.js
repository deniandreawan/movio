import * as act from "constants/actionType";

const initialState = {
  people: {},
  person: {
    actor: {},
    casting: [],
  },
};

const peopleReducer = (state = initialState, action) => {
  switch (action.type) {
    case act.FETCH_PEOPLE_SUCCESS:
      return {
        ...state,
        people: { ...action.payload },
      };
    case act.FETCH_SELECTED_PERSON_SUCCESS:
      return {
        ...state,
        person: {
          ...state.person,
          actor: action.payload.actor,
          casting: action.payload.casting,
        },
      };
    default:
      return state;
  }
};

export default peopleReducer;
