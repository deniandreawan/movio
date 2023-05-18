import { fetchPeople } from "@/redux/actions/peopleActions";
import Container from "@/components/shared/Container";
import PaginationBar from "@/components/shared/PaginationBar";
import Loader from "@/components/hoc/Loader";
import PeopleList from "@/components/main/people/PeopleList";
import { isEmpty, numberWithCommas } from "@/helpers/helperFunctions";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import usePageSaver from "@/hooks/usePageSaver";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const People = () => {
  const { people, isLoading } = useSelector((state) => ({
    people: state.people.people,
    isLoading: state.loading.isLoading,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const query = "/person/popular?";

  useDocumentTitle("Discover People | Movio");
  useEffect(() => {
    if (isEmpty(people)) {
      dispatch(fetchPeople(query, currentPage));
    }
  }, [currentPage, dispatch, people]);

  const handlePageChange = (page) => {
    if (people.page !== page) {
      dispatch(fetchPeople(query, page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Popular People</h1>
          <h3>{numberWithCommas(people.total_results)} People</h3>
        </div>
      </div>
      <PeopleList
        isLoading={isLoading}
        people={people.results}
        templateCount={10}
      />
      <PaginationBar
        activePage={people.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={people.total_pages}
        totalPage={people.total_pages}
      />
    </Container>
  );
};

export default Loader("people")(People);
