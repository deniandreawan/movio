import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "@/components/shared/Container";
import PaginationBar from "@/components/shared/PaginationBar";
import MovieList from "@/components/main/movies/MovieList";
// actions
import { fetchGenreCategory } from "@/redux/actions/genreActions";
// helpers
import { numberWithCommas } from "@/helpers/helperFunctions";
// hooks
import useDocumentTitle from "@/hooks/useDocumentTitle";
import usePageSaver from "@/hooks/usePageSaver";

const ViewGenre = (props) => {
  const { genreMovies, isLoading, favorites } = useSelector((state) => ({
    genreMovies: state.genre.genreMovies,
    isLoading: state.loading.isLoading,
    favorites: state.favorites,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const query = `/discover/movie?&with_genres=${props.match.params.id}`;

  useDocumentTitle("Genres | Movio");
  useEffect(() => {
    dispatch(fetchGenreCategory(query, currentPage));
  }, []);

  const handlePageChange = (page) => {
    if (genreMovies.page !== page && !isLoading) {
      dispatch(fetchGenreCategory(query, page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>{props.match.params.genre.replace("-", " ")}</h1>
          <h3>{numberWithCommas(genreMovies.total_results)} Movies</h3>
        </div>
      </div>
      <MovieList
        category="movie"
        favorites={favorites}
        movies={genreMovies.results}
        templateCount={10}
      />
      <PaginationBar
        activePage={genreMovies.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={genreMovies.total_pages}
        totalPage={genreMovies.total_pages}
      />
    </Container>
  );
};

export default ViewGenre;
