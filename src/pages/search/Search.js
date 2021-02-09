import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "components/shared/Container";
import LoadingScreen from "components/shared/LoadingScreen";
import Tabs from "components/main/tabs/Tabs";
// actions
import { search } from "redux/actions/searchActions";
// helpers
import { numberWithCommas, isEmpty } from "helpers/helperFunctions";
// hooks
import useDocumentTitle from "hooks/useDocumentTitle";
import useDidMount from "hooks/useDidMount";

import SearchMovieTab from "./tab/SearchMovieTab";
import SearchTvTab from "./tab/SearchTvTab";
import SearchPeopleTab from "./tab/SearchPeopleTab";

const Search = ({ match }) => {
  useDocumentTitle("Search | Movio");
  useEffect(() => {
    const queryString = match.params.query;

    if (queryString !== query) {
      dispatch(search(queryString));
    }
  }, []);

  const { movies, tv, query, favorites, people, totalFound, isLoading } = useSelector((state) => ({
    movies: state.search.search.movies,
    tv: state.search.search.tv,
    query: state.search.search.query,
    favorites: state.favorites,
    people: state.search.search.people,
    totalFound:
      state.search.search.movies.total_results +
      state.search.search.tv.total_results +
      state.search.search.people.total_results,
    isLoading: state.loading.isLoading,
  }));
  const dispatch = useDispatch();
  const didMount = useDidMount();

  useEffect(() => {
    if (didMount) {
      dispatch(search(match.params.query));
    }
  }, [match.params.query]);

  return !isLoading || !isEmpty(movies) || !isEmpty(tv) || !isEmpty(people) ? (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <br />
          <br />
          <h1>Search Result</h1>
          <h3>
            {numberWithCommas(totalFound)}&nbsp; total result with keyword: &nbsp;
            <span className="result__keyword">{query}</span>
          </h3>
        </div>
      </div>
      <Tabs>
        <div index={0} label={`Movies (${numberWithCommas(movies.total_results)})`}>
          <SearchMovieTab
            isLoading={isLoading}
            movies={movies}
            favorites={favorites}
            query={match.params.query}
          />
        </div>
        <div index={1} label={`TV Shows (${numberWithCommas(tv.total_results)})`}>
          <SearchTvTab
            isLoading={isLoading}
            query={match.params.query}
            favorites={favorites}
            tvShows={tv}
          />
        </div>
        <div index={2} label={`People (${numberWithCommas(people.total_results)})`}>
          <SearchPeopleTab isLoading={isLoading} people={people} query={match.params.query} />
        </div>
      </Tabs>
    </Container>
  ) : (
    <LoadingScreen msg="Searching, Please wait..." />
  );
};

export default Search;
