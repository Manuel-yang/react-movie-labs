import React, { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
const PageTemplate = lazy(() => import("../components/templateMoviePage"))
const MovieReview = lazy(() => import("../components/movieReview"))

const MovieReviewPage = (props) => {
  let location = useLocation();
  const {movie, review} = location.state;

  return (
    <Suspense>
      <PageTemplate movie={movie}>
        <MovieReview review={review} />
      </PageTemplate>
    </Suspense>
  );
};

export default MovieReviewPage;