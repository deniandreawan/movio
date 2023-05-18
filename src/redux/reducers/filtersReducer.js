import * as act from "@/constants/actionType";

const initialState = {
  tv: {
    genre: "",
    sort: "",
    year: "",
    query: "",
  },
  discover: {
    genre: "",
    sort: "",
    year: "",
    query: "",
  },
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case act.SET_YEAR_FILTER:
      return {
        ...state,
        [action.payload.target]: {
          ...state[action.payload.target],
          year: action.payload.year,
        },
      };
    case act.SET_GENRE_FILTER:
      return {
        ...state,
        [action.payload.target]: {
          ...state[action.payload.target],
          genre: action.payload.genre,
        },
      };
    case act.SET_SORT_FILTER:
      return {
        ...state,
        [action.payload.target]: {
          ...state[action.payload.target],
          sort: action.payload.sort,
        },
      };
    case act.UPDATE_QUERY:
      return {
        ...state,
        [action.payload.target]: {
          ...state[action.payload.target],
          query: action.payload.query,
        },
      };
    default:
      return state;
  }
};

export default filterReducer;
