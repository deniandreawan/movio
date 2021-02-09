import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "components/shared/Container";
import PaginationBar from "components/shared/PaginationBar";
import Loader from "components/hoc/Loader";
import MovieList from "components/main/movies/MovieList";
// actions
import { fetchUpcomingMovies } from "redux/actions/movieActions";
// helpers
import { isEmpty, numberWithCommas } from "helpers/helperFunctions";
// hooks
import useDocumentTitle from "hooks/useDocumentTitle";
import usePageSaver from "hooks/usePageSaver";

const UpcomingMovies = () => {
  const { upcomingMovies, isLoading, favorites } = useSelector((state) => ({
    upcomingMovies: state.movies.upcomingMovies,
    isLoading: state.loading.isLoading,
    favorites: state.favorites,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const queryString = "/movie/upcoming";

  useDocumentTitle("Upcoming Movies | MOVX");
  useEffect(() => {
    if (isEmpty(upcomingMovies)) {
      dispatch(fetchUpcomingMovies(queryString, currentPage));
    }
  }, []);

  const handlePageChange = (page) => {
    if (upcomingMovies.page !== page && !isLoading) {
      dispatch(fetchUpcomingMovies(queryString, page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Upcoming Movies</h1>
          <h3>{numberWithCommas(upcomingMovies.total_results)} Movies</h3>
        </div>
      </div>
      <MovieList
        movies={upcomingMovies.results}
        favorites={favorites}
        isLoading={isLoading}
        templateCount={10}
      />
      <PaginationBar
        activePage={upcomingMovies.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={upcomingMovies.total_pages}
        totalPage={upcomingMovies.total_pages}
      />
    </Container>
  );
};

export default Loader("upcomingMovies")(UpcomingMovies);
