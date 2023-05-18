import favoritesReducer from "./favoritesReducer"
import filtersReducer from "./filtersReducer"
import genreReducer from "./genreReducer"
import loadingReducer from "./loadingReducer"
import moviesReducer from "./moviesReducer"
import peopleReducer from "./peopleReducer"
import searchReducer from "./searchReducer"

const reducers = {
  movies: moviesReducer,
  filters: filtersReducer,
  people: peopleReducer,
  search: searchReducer,
  genre: genreReducer,
  favorites: favoritesReducer,
  loading: loadingReducer,
}

export default reducers
