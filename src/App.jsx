import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ToastContainer, Slide } from "react-toastify";
import * as route from "@/constants/routes";

import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import ScrollTop from "@/components/shared/ScrollTop";
import Progress from "@/components/shared/Progress";

import Home from "@/pages/home/Home";
import DiscoverMovies from "@/pages/movie/Discover";
import TrendingMovies from "@/pages/movie/Trending";
import TopRatedMovies from "@/pages/movie/TopRatedMovies";
import UpcomingMovies from "@/pages/movie/UpcomingMovies";
import PopularMovies from "@/pages/movie/PopularMovies";
import ViewMovie from "@/pages/movie/ViewMovie";
import ViewMovieCasts from "@/pages/movie/ViewMovieCasts";

import TvShows from "@/pages/tv/TvShows";
import ViewGenre from "@/pages/genre/ViewGenre";

import People from "@/pages/people/People";
import ViewPeople from "@/pages/people/ViewPeople";
import ViewCasting from "@/pages/people/ViewCasting";
import ViewPeopleProfiles from "@/pages/people/ViewPictures";

import Search from "@/pages/search/Search";
import Favorites from "@/pages/favorite/Favorites";

import Error from "@/pages/error/Error";
import NetworkError from "@/pages/error/NetworkError";
import PageNotFound from "@/pages/error/PageNotFound";

export const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <>
      <ToastContainer
        autoClose={3000}
        bodyClassName="toast-body"
        limit={1}
        newestOnTop={true}
        pauseOnHover={false}
        position={window.screen.width <= 480 ? "bottom-right" : "top-right"}
        progressStyle={{ backgroundColor: "yellow" }}
        toastClassName="toast"
        transition={Slide}
      />
      <Navigation />
      <ScrollTop />

      <main id="main">
        <Progress>
          <Switch>
            <Route component={Home} exact path={route.HOME} />
            <Route component={DiscoverMovies} exact path={route.DISCOVER} />
            <Route component={TrendingMovies} exact path={route.TRENDING} />
            <Route component={TvShows} exact path={route.TV} />
            <Route component={TopRatedMovies} exact path={route.TOP_RATED} />
            <Route component={UpcomingMovies} exact path={route.UPCOMING} />
            <Route component={PopularMovies} exact path={route.POPULAR} />
            <Route component={ViewMovie} exact path={route.VIEW_MOVIE} />
            <Route component={People} exact path={route.PEOPLE} />
            <Route component={ViewPeople} exact path={route.VIEW_PEOPLE} />
            <Route
              component={ViewPeopleProfiles}
              exact
              path={route.VIEW_PEOPLE_PROFILE}
            />
            <Route
              component={ViewCasting}
              exact
              path={route.VIEW_PEOPLE_CASTING}
            />
            <Route component={ViewGenre} exact path={route.VIEW_GENRE} />
            <Route component={Search} exact path={route.SEARCH} />
            <Route
              component={ViewMovieCasts}
              exact
              path={route.VIEW_MOVIE_CASTS}
            />
            <Route component={Favorites} exact path={route.FAVORITES} />
            <Route component={NetworkError} exact path={route.NETWORK_ERROR} />
            <Route component={Error} exact path={route.ERROR} />
            <Route component={PageNotFound} />
          </Switch>
        </Progress>
      </main>

      <Footer />
    </>
  </Router>
);

export default App;
