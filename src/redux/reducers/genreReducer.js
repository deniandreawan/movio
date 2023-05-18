import * as act from "@/constants/actionType";

const initialState = {
  genreMovies: {},
};

const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case act.FETCH_GENRE_CATEGORY_SUCCESS:
      return {
        ...state,
        genreMovies: action.payload,
      };
    default:
      return state;
  }
};

export default genreReducer;
