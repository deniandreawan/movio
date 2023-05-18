import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "@/components/shared/Container";
import PaginationBar from "@/components/shared/PaginationBar";
import Loader from "@/components/hoc/Loader";
import MovieList from "@/components/main/movies/MovieList";
// actions
import { fetchTrendingMovies } from "@/redux/actions/movieActions";
// helpers
import { isEmpty, numberWithCommas } from "@/helpers/helperFunctions";
// hooks
import useDocumentTitle from "@/hooks/useDocumentTitle";
import usePageSaver from "@/hooks/usePageSaver";

const TrendingMovies = () => {
  const { trendingMovies, isLoading, favorites } = useSelector((state) => ({
    trendingMovies: state.movies.trendingMovies,
    isLoading: state.loading.isLoading,
    favorites: state.favorites,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const query = "/trending/all/day";

  useDocumentTitle("Trending Movies | Movio");
  useEffect(() => {
    if (isEmpty(trendingMovies)) {
      dispatch(fetchTrendingMovies(query, currentPage));
    }
  }, [currentPage, dispatch, trendingMovies]);

  const handlePageChange = (page) => {
    if (trendingMovies.page !== page && !isLoading) {
      dispatch(fetchTrendingMovies(query, page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Trending Movies</h1>
          <h3>{numberWithCommas(trendingMovies.total_results)} Movies</h3>
        </div>
      </div>
      <MovieList
        movies={trendingMovies.results}
        favorites={favorites}
        isLoading={isLoading}
        templateCount={10}
      />
      <PaginationBar
        activePage={trendingMovies.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={trendingMovies.total_pages}
        totalPage={trendingMovies.total_pages}
      />
    </Container>
  );
};

export default Loader("trendingMovies")(TrendingMovies);
