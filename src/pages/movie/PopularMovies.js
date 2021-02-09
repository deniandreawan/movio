import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Container from "components/shared/Container";
import PaginationBar from "components/shared/PaginationBar";
import Loader from "components/hoc/Loader";
import MovieList from "components/main/movies/MovieList";
// actions
import { fetchPopularMovies } from "redux/actions/movieActions";
// helpers
import { isEmpty, numberWithCommas } from "helpers/helperFunctions";
// hooks
import useDocumentTitle from "hooks/useDocumentTitle";
import usePageSaver from "hooks/usePageSaver";

const PopularMovies = () => {
  const { popularMovies, isLoading, favorites } = useSelector((state) => ({
    popularMovies: state.movies.popularMovies,
    isLoading: state.loading.isLoading,
    favorites: state.favorites,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const route = "/movie/popular";

  useDocumentTitle("Popular Movies | Movio");
  useEffect(() => {
    if (isEmpty(popularMovies)) {
      console.log(currentPage);
      dispatch(fetchPopularMovies(route, currentPage));
    }
  }, []);

  const handlePageChange = (page) => {
    if (popularMovies.page !== page && !isLoading) {
      dispatch(fetchPopularMovies(route, page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Popular Movies</h1>
          <h3>{numberWithCommas(popularMovies.total_results)} Movies</h3>
        </div>
      </div>
      <MovieList
        movies={popularMovies.results}
        favorites={favorites}
        isLoading={isLoading}
        templateCount={10}
      />
      <PaginationBar
        activePage={popularMovies.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={popularMovies.total_pages}
        totalPage={popularMovies.total_pages}
      />
    </Container>
  );
};

PopularMovies.propTypes = {
  fetchPopularMovies: PropTypes.func,
  popularMovies: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default Loader("popularMovies")(PopularMovies);
