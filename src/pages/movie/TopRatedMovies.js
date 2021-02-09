import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "components/shared/Container";
import PaginationBar from "components/shared/PaginationBar";
import Loader from "components/hoc/Loader";
import MovieList from "components/main/movies/MovieList";
// actions
import { fetchTopRatedMovies } from "redux/actions/movieActions";
// helpers
import { isEmpty, numberWithCommas } from "helpers/helperFunctions";
// hooks
import useDocumentTitle from "hooks/useDocumentTitle";
import usePageSaver from "hooks/usePageSaver";

const TopRatedMovies = () => {
  const { topRatedMovies, isLoading, favorites } = useSelector((state) => ({
    topRatedMovies: state.movies.topRatedMovies,
    isLoading: state.loading.isLoading,
    favorites: state.favorites,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const queryString = "/movie/top_rated";

  useDocumentTitle("Top Rated Movies | Movio");
  useEffect(() => {
    if (isEmpty(topRatedMovies)) {
      dispatch(fetchTopRatedMovies(queryString, currentPage));
    }
  }, []);

  const handlePageChange = (page) => {
    if (topRatedMovies.page !== page && !isLoading) {
      dispatch(fetchTopRatedMovies(queryString, page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Top Rated Movies</h1>
          <h3>{numberWithCommas(topRatedMovies.total_results)} Movies</h3>
        </div>
      </div>
      <MovieList
        movies={topRatedMovies.results}
        favorites={favorites}
        isLoading={isLoading}
        templateCount={10}
      />
      <PaginationBar
        activePage={topRatedMovies.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={topRatedMovies.total_pages}
        totalPage={topRatedMovies.total_pages}
      />
    </Container>
  );
};

export default Loader("topRatedMovies")(TopRatedMovies);
