import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import MovieList from "components/main/movies/MovieList";
import imgBackground from "images/background.jpg";
// helpers
import { isEmpty } from "helpers/helperFunctions";
// hooks
import useDocumentTitle from "hooks/useDocumentTitle";

const ViewPictures = ({ history }) => {
  const { actor, casting, favorites } = useSelector((state) => ({
    actor: state.people.person.actor,
    casting: state.people.person.casting,
    favorites: state.favorites,
  }));

  useDocumentTitle("Castings | Movio");
  useEffect(() => {
    if (isEmpty(actor)) {
      history.goBack();
    }
  }, []);

  return (
    !isEmpty(actor) && (
      <>
        <div className="posters__banner">
          <img src={imgBackground} alt="" />
          <div className="posters__banner-content">
            <div className="back__button">
              <h1>{actor.name}</h1>

              <button className="button--back" onClick={history.goBack}>
                Back
              </button>
            </div>
          </div>
        </div>
        <div className="container__wrapper">
          <div className="movie__header">
            <div className="movie__header-title">
              <h1>Casted Movies</h1>
              <h3>{casting.length} Movies</h3>
            </div>
          </div>
          <MovieList category="movie" favorites={favorites} movies={casting} />
        </div>
      </>
    )
  );
};

export default ViewPictures;
