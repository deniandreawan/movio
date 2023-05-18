import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import PersonProfiles from "@/components/main/people/PersonProfiles";
import imgBackground from "@/images/background.jpg";
// helpers
import { isEmpty } from "@/helpers/helperFunctions";
// hooks
import useDocumentTitle from "@/hooks/useDocumentTitle";

const ViewPictures = ({ history }) => {
  const actor = useSelector((state) => state.people.person.actor);

  useDocumentTitle("Profile Pictures");
  useEffect(() => {
    if (isEmpty(actor)) {
      history.goBack();
    }
  }, []);

  return (
    !isEmpty(actor) && (
      <>
        <div className="posters__banner">
          <img src={imgBackground} alt="" />
          <div className="posters__banner-content">
            <div className="back__button">
              <h1>{actor.name}</h1>
              <button className="button--back" onClick={history.goBack}>
                Back
              </button>
            </div>
          </div>
        </div>
        <div className="container__wrapper">
          <PersonProfiles id={actor.id} posters={actor.images.profiles} />
        </div>
      </>
    )
  );
};

export default ViewPictures;
