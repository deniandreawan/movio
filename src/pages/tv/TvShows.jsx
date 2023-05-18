import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "@/components/shared/Container";
import Filter from "@/components/shared/Filter";
import PaginationBar from "@/components/shared/PaginationBar";
import Loader from "@/components/hoc/Loader";
import MovieList from "@/components/main/movies/MovieList";
// actions
import { fetchTvShows } from "@/redux/actions/movieActions";
// helpers
import { isEmpty, numberWithCommas } from "@/helpers/helperFunctions";
// hooks
import useDidMount from "@/hooks/useDidMount";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import usePageSaver from "@/hooks/usePageSaver";

const TvShows = () => {
  const { tvShows, filter, favorites, isLoading } = useSelector((state) => ({
    tvShows: state.movies.tvShows,
    filter: state.filters,
    favorites: state.favorites,
    isLoading: state.loading.isLoading,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const query = "/discover/tv?language=en-US";

  useDocumentTitle("TV Shows | Movio");
  useEffect(() => {
    if (isEmpty(tvShows) || didMount) {
      dispatch(fetchTvShows(`${query}${filter.tv.query}`, currentPage));
    }
  }, [currentPage, didMount, dispatch, filter.tv.query, tvShows]);

  const handlePageChange = (page) => {
    if (tvShows.page !== page) {
      dispatch(fetchTvShows(`${query}${filter.tv.query}`, page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>TV Shows</h1>
          <h3>{numberWithCommas(tvShows.total_results)} TV Shows</h3>
        </div>
        {tvShows.results && (
          <Filter
            filterCategory="tv"
            filterData={filter.tv}
            isLoading={isLoading}
          />
        )}
      </div>
      <MovieList
        category="tv"
        favorites={favorites}
        isLoading={isLoading}
        movies={tvShows.results}
        templateCount={10}
      />
      <PaginationBar
        activePage={tvShows.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={tvShows.total_pages}
        totalPage={tvShows.total_pages}
      />
    </Container>
  );
};

export default Loader("tvShows")(TvShows);
