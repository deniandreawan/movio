import moviesReducer from "./moviesReducer";
import filtersReducer from "./filtersReducer";
import peopleReducer from "./peopleReducer";
import searchReducer from "./searchReducer";
import genreReducer from "./genreReducer";
import favoritesReducer from "./favoritesReducer";
import loadingReducer from "./loadingReducer";

const reducers = {
  movies: moviesReducer,
  filters: filtersReducer,
  people: peopleReducer,
  search: searchReducer,
  genre: genreReducer,
  favorites: favoritesReducer,
  loading: loadingReducer,
};

export default reducers;
