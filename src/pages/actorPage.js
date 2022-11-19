import React, {useState, useEffect, lazy, Suspense} from "react";
import { useParams } from 'react-router-dom';
import { getActorDetails } from '../api/tmdb-api'
import Spinner from '../components/spinner'
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid";
import { getCombinedCredits } from '../api/tmdb-api'
import Container from "@mui/material/Container";
const AcotrProfile = lazy(() => import('../components/actorProfile'))
const ActorProfileSite = lazy(() => import('../components/actorProfileSite'))

const ActorPage = (props) => {
  const { id } = useParams();
  const { data: details, error, isLoading, isError } = useQuery(
    ["actor", { id: id }],
    getActorDetails
  );

  const [combinedCredits, setCombinedCredits] = useState([])
  useEffect(() => {
    getCombinedCredits(id).then(data => {
      if (data) {
        setCombinedCredits(data)
      }
    })
  },[])

  // console.log(combinedCredits)

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
          <Suspense>
            <Grid item xs={4}>
              <ActorProfileSite details={details}/>
            </Grid>
            <Grid item xs={8}>
              <AcotrProfile details={details} combinedCredits={combinedCredits}/>
            </Grid>
          </Suspense>
        </Grid>
      </Container>
    </>
  )
}

export default ActorPage;