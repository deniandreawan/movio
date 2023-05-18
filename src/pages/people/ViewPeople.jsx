import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Casting from "@/components/main/people/Casting";
import PersonBiography from "@/components/main/people/PersonBiography";
// actions
import { fetchSelectedPerson } from "@/redux/actions/peopleActions";
// hooks
import useDocumentTitle from "@/hooks/useDocumentTitle";

const ViewPeople = (props) => {
  const { actor, casting, favorites, isLoading } = useSelector((state) => ({
    actor: state.people.person.actor,
    casting: state.people.person.casting,
    isLoading: state.loading.isLoading,
    favorites: state.favorites,
  }));
  const dispatch = useDispatch();
  const actorId = props.match.params.id;

  useDocumentTitle(actor.id ? `${actor.name} Details` : "View Person | Movio");
  useEffect(() => {
    if (parseInt(actorId, 10) !== actor.id) {
      dispatch(fetchSelectedPerson(actorId));
    }
  }, [actor.id, actorId, dispatch]);

  return !isLoading ? (
    <>
      <PersonBiography actor={actor} />
      {casting.length >= 1 && (
        <div className="container__wrapper">
          <Casting actor={actor} casting={casting} favorites={favorites} />
        </div>
      )}
    </>
  ) : (
    <PersonBiography actor={{}} />
  );
};

export default ViewPeople;
