import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MoviesSlider from "@/components/main/slider/MoviesSlider";
import MovieList from "@/components/main/movies/MovieList";
// actions
import { fetchMainMovies } from "@/redux/actions/movieActions";
// helpers
import { isEmpty } from "@/helpers/helperFunctions";
// hooks
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Home = (props) => {
  const { popularMovies, topRatedMovies, upcomingMovies, favorites } =
    useSelector((state) => ({
      popularMovies: state.movies.popularMovies,
      topRatedMovies: state.movies.topRatedMovies,
      upcomingMovies: state.movies.upcomingMovies,
      favorites: state.favorites,
    }));
  const dispatch = useDispatch();

  useDocumentTitle();
  useEffect(() => {
    if (
      isEmpty(popularMovies) ||
      isEmpty(topRatedMovies) ||
      isEmpty(upcomingMovies)
    ) {
      dispatch(fetchMainMovies());
    }
  }, []);

  return (
    <>
      {popularMovies.results ? (
        <MoviesSlider
          movies={popularMovies.results || []}
          favorites={favorites}
        />
      ) : (
        <MoviesSlider movies={[{}]} favorites={[]} />
      )}
      <div className="container__wrapper">
        {upcomingMovies.results && (
          <>
            <div className="movie__header">
              <div className="movie__header-home header__title">
                <h1>Upcoming</h1>
                <button
                  className="button--view button--icon"
                  onClick={() => props.history.push("/upcoming")}
                >
                  <i className="fa fa-chevron-right" />
                </button>
              </div>
            </div>
            <MovieList
              favorites={favorites}
              movies={upcomingMovies.results.slice(0, 8)}
            />
            <div className="movie__view-all">
              <button
                className="button--primary m-auto"
                onClick={() => props.history.push("/upcoming")}
              >
                View All Upcoming Movies
              </button>
            </div>
          </>
        )}
        {popularMovies.results && (
          <>
            <div className="movie__header">
              <div className="movie__header-home header__title">
                <h1>Popular</h1>
                <button
                  className="button--view button--icon"
                  onClick={() => props.history.push("/popular")}
                >
                  <i className="fa fa-chevron-right" />
                </button>
              </div>
            </div>
            <MovieList
              favorites={favorites}
              movies={popularMovies.results.slice(0, 8)}
            />
            <div className="movie__view-all">
              <button
                className="button--primary m-auto"
                onClick={() => props.history.push("/popular")}
              >
                View All Popular Movies
              </button>
            </div>
          </>
        )}
        {topRatedMovies.results && (
          <>
            <div className="movie__header">
              <div className="movie__header-home header__title">
                <h1>Top Rated</h1>
                <button
                  className="button--view button--icon"
                  onClick={() => props.history.push("/top_rated")}
                >
                  <i className="fa fa-chevron-right" />
                </button>
              </div>
            </div>
            <MovieList
              favorites={favorites}
              movies={topRatedMovies.results.slice(0, 8)}
            />
            <div className="movie__view-all">
              <button
                className="button--primary m-auto"
                onClick={() => props.history.push("/top_rated")}
              >
                View All Top Rated Movies
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
