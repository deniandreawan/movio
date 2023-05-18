import React from "react";
import { useSelector } from "react-redux";

import MovieList from "@/components/main/movies/MovieList";
import Container from "@/components/shared/Container";
// helpers
import { numberWithCommas } from "@/helpers/helperFunctions";
// hooks
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Favorites = () => {
  useDocumentTitle("My Favorites | Movio");
  const favorites = useSelector((state) => state.favorites);

  return (
    <>
      {favorites.length >= 1 ? (
        <Container>
          <div className="movie__header">
            <div className="movie__header-title">
              <h1>My Favorite Movies</h1>
              <h3>{numberWithCommas(favorites.length)} Movies</h3>
            </div>
          </div>
          <MovieList
            category="movie"
            favorites={favorites}
            movies={favorites}
          />
        </Container>
      ) : (
        <div className="error">
          <h1>You Don't Have Favorites</h1>
          <p>Click the heart icon on the movie card to add it to favorites</p>
        </div>
      )}
    </>
  );
};

export default Favorites;
