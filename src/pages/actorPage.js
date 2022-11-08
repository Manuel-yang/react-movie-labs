import React from "react";
import { useParams } from 'react-router-dom';
import { getActorDetails } from '../api/tmdb-api'
import Spinner from '../components/spinner'
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid";
import ActorProfile from '../components/actorProfileSite'
import Container from "@mui/material/Container";
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
        <Grid container>
          <Grid item xs={3}>
            <ActorProfile details={details}/>
          </Grid>
          <Grid item xs={6}>
            
          </Grid>
          <Grid item xs={3}>

          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ActorPage;