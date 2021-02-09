import * as action from "constants/actionType";

// export const fetchGenres = (query, page = 1) => ({
//   type: action.FETCH_GENRES,
//   payload: {
//     query,
//     page,
//   },
// });

export const fetchGenreCategory = (query, page = 1) => ({
  type: action.FETCH_GENRE_CATEGORY,
  payload: {
    query,
    page,
  },
});
