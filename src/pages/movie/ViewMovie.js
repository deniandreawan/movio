import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MovieOverview from "components/main/movies/MovieOverview";
import MovieCast from "components/main/movies/MovieCast";
import MoviePoster from "components/main/movies/MoviePoster";
import Reviews from "components/main/movies/Reviews";
import SimilarMovies from "components/main/movies/SimilarMovies";
// actions
import { fetchSelectedMovie } from "redux/actions/movieActions";
// hooks
import useDocumentTitle from "hooks/useDocumentTitle";
import useDidMount from "hooks/useDidMount";

const ViewMovie = (props) => {
  const { favorites, movie, casts, keywords, reviews, isLoading } = useSelector(
    (state) => ({
      favorites: state.favorites,
      movie: state.movies.current.movie,
      casts: state.movies.current.casts,
      keywords: state.movies.current.keywords,
      reviews: state.movies.current.reviews,
      isLoading: state.loading.isLoading,
    })
  );
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const posters = movie.images ? movie.images.posters : [];

  useDocumentTitle(
    movie.id
      ? `${movie.original_name || movie.original_title} | Movio`
      : "View Movie | Movio"
  );
  useEffect(() => {
    const movieId = props.match.params.id;
    fetchMovie(movieId);
  }, []);

  useEffect(() => {
    if (didMount || !movie.id) {
      fetchMovie(props.match.params.id);
    }
  }, [props.match.params.id]);

  const fetchMovie = (id) => {
    const { category } = props.match.params;

    if (parseInt(id, 10) !== movie.id) {
      dispatch(fetchSelectedMovie(category, id));
    }
  };

  const onClickViewImage = () => {
    props.history.push(`/view/movie/${props.match.params.id}/images`);
  };

  return !isLoading ? (
    <>
      <MovieOverview favorites={favorites} movie={movie} />
      <MovieCast casts={casts} keywords={keywords} movie={movie} />
      {movie.images && (
        <div className="container__wrapper">
          <MoviePoster
            id={movie.id}
            posters={posters.length > 8 ? posters.slice(0, 8) : posters}
          />
          <button
            className="button--primary button--block m-auto"
            onClick={onClickViewImage}
          >
            View All Posters
          </button>
        </div>
      )}
      {movie.similar && (
        <>
          {movie.similar.results.length !== 0 && (
            <SimilarMovies
              favorites={favorites}
              movies={movie.similar.results}
            />
          )}
        </>
      )}
      {reviews.results && !!reviews.total_pages && (
        <Reviews reviews={reviews} />
      )}
    </>
  ) : (
    <MovieOverview favorites={[]} movie={{}} />
  );
};

export default ViewMovie;
