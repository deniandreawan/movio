import * as act from "@/constants/actionType";

const initialState = {
  trendingMovies: {},
  discoverMovies: {},
  current: {
    movie: {},
    keywords: [],
    casts: [],
    reviews: {},
  },
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  tvShows: {},
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case act.FETCH_TRENDING_MOVIES_SUCCESS:
      return {
        ...state,
        trendingMovies: { ...action.payload },
      };
    case act.FETCH_DISCOVER_MOVIES_SUCCESS:
      return {
        ...state,
        discoverMovies: { ...action.payload },
      };
    case act.FETCH_TV_SHOWS_SUCCESS:
      return {
        ...state,
        tvShows: { ...action.payload },
      };
    case act.FETCH_SELECTED_MOVIE_SUCCESS:
      return {
        ...state,
        current: action.payload,
      };
    case act.FETCH_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        popularMovies: action.payload,
      };
    case act.FETCH_TOPRATED_MOVIES_SUCCESS:
      return {
        ...state,
        topRatedMovies: action.payload,
      };
    case act.FETCH_UPCOMING_MOVIES_SUCCESS:
      return {
        ...state,
        upcomingMovies: action.payload,
      };
    case act.FETCH_MAIN_MOVIES_SUCCESS:
      return {
        ...state,
        upcomingMovies: action.payload.upcoming,
        topRatedMovies: action.payload.topRated,
        popularMovies: action.payload.popular,
      };
    default:
      return state;
  }
};

export default moviesReducer;
