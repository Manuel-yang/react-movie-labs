import React from "react";
import { useParams } from 'react-router-dom';
import { getActorDetails } from '../api/tmdb-api'
import Spinner from '../components/spinner'
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid";
import ActorProfileSite from '../components/actorProfileSite'
import Container from "@mui/material/Container";
import AcotrProfile from '../components/actorProfile'
const ActorPage = (props) => {
  const { id } = useParams();
  const { data: details, error, isLoading, isError } = useQuery(
    ["actor", { id: id }],
    getActorDetails
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }



  return(
    <>
      <Container>
        <Grid container >
          <Grid item xs={4}>
            <ActorProfileSite details={details}/>
          </Grid>
          <Grid item xs={8}>
            <AcotrProfile details={details}/>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ActorPage;