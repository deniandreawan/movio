import * as act from "@/constants/actionType";

const initialState = {
  search: {
    query: "",
    tv: {},
    movies: {},
    people: {},
  },
  recentSearch: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case act.ADD_SEARCH_HISTORY:
      return {
        ...state,
        recentSearch: [...state.recentSearch, action.payload],
      };
    case act.CLEAR_SEARCH_HISTORY:
      return {
        ...state,
        recentSearch: [],
      };
    case act.SEARCH_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          movies: action.payload.movies,
          tv: action.payload.tv,
          people: action.payload.people,
        },
      };
    case act.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          movies: action.payload,
        },
      };
    case act.SEARCH_TV_SHOWS_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          tv: action.payload,
        },
      };
    case act.SEARCH_PEOPLE_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          people: action.payload,
        },
      };
    case act.UPDATE_SEARCH_QUERY:
      return {
        ...state,
        search: {
          ...state.search,
          query: action.payload,
        },
      };
    default:
      return state;
  }
};

export default searchReducer;
