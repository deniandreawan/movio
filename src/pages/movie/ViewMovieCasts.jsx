import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";

import ImageLoader from "@/components/shared/ImageLoader";
import imgPlaceholder from "@/images/placeholder.jpg";
// constants
import { TMDB_POSTER_PATH, TMDB_BACKDROP_PATH } from "@/constants/actionType";
import useDocumentTitle from "@/hooks/useDocumentTitle";
// hooks
import { numberWithCommas, isEmpty, getYear } from "@/helpers/helperFunctions";

const ViewMoviePoster = ({ history }) => {
  const { movie, casts } = useSelector((state) => ({
    movie: state.movies.current.movie,
    casts: state.movies.current.casts,
  }));

  useDocumentTitle("Movie Casts | Movio");
  useEffect(() => {
    if (isEmpty(movie)) {
      history.goBack();
    }
  }, [history, movie]);

  return (
    !isEmpty(movie) && (
      <>
        <div className="posters__banner">
          <img src={`${TMDB_BACKDROP_PATH + movie.backdrop_path}`} alt="" />
          <div className="posters__banner-content">
            <h1>
              {movie.original_title ||
                movie.original__name ||
                movie.name ||
                "Movie Title Not Found"}
              &nbsp;
              {(movie.release_date || movie.first_air_date) && (
                <span>{`(${getYear(
                  movie.release_date || movie.first_air_date
                )})`}</span>
              )}
            </h1>
            <button className="button--back" onClick={history.goBack}>
              Back
            </button>
          </div>
        </div>
        <div className="container__wrapper">
          <div className="movie__header">
            <div className="movie__header-title">
              <h1>All Casts</h1>
              <h3>{numberWithCommas(casts.length)} People</h3>
            </div>
          </div>
          {casts.length >= 1 && (
            <div className="casts__wrapper">
              {casts.map((cast) => (
                <Link
                  key={`cast_${cast.id}`}
                  to={`/view/person/profile/${cast.id}`}
                >
                  <div className="casts__item">
                    <div className="casts__avatar">
                      <LazyLoad debounce={false} offsetVertical={500}>
                        <ImageLoader
                          alt={cast.name}
                          imgId={cast.id}
                          src={
                            cast.profile_path
                              ? `${TMDB_POSTER_PATH + cast.profile_path}`
                              : imgPlaceholder
                          }
                        />
                      </LazyLoad>
                    </div>
                    <div className="casts__details">
                      <h4>{cast.name || "Not Available"}</h4>
                      {cast.character && (
                        <p className="card__character">{`${cast.character}`}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </>
    )
  );
};

export default ViewMoviePoster;
