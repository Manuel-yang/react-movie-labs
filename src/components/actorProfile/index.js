import React from "react";
import Stack from "@mui/material/Stack";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const ActorProfile = (data) => {
  let details = data.details
  let combinedCredits = data.combinedCredits
  const navigate = useNavigate();

  const handelMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true});
  }


  function CombinedCreditsBar(data) {
    if(!data.combinedCredits.cast) {
      return
    }
    else {
      // console.log(data.combinedCredits)
      return(
        <Paper elevation={3}>
          <Stack direction="row" spacing={2}>
            {data.combinedCredits.cast.slice(0,9).map((movie) => (
              <Card key={movie.id} style={{overflow: 'visible', margin: '1rem'}}>
                <CardMedia
                  component="img"
                  height={300}
                  image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography style={{ fontSize: '1.5rem', fontWeight: 'bold'}} gutterBottom  component="div">
                    {movie.original_name}
                  </Typography>
                  <Typography gutterBottom  component="div">
                    {movie.character}
                  </Typography>        
                </CardContent>
                <CardActions>
                  <Button onClick={() => handelMenuSelect(`/movies/${movie.id}`)} style={{ width: '12rem'}}>Learn More</Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </Paper>
      )
    }

  }

  return(
    <>
    <p style={{fontSize: '3rem', fontWeight: 'bold'}}>{details.name}</p>
    <Stack>
      <p style={{fontSize: '2rem', fontWeight: 'bold'}}>Biography</p>
      <p>{details.biography}</p>
    </Stack>
  
    <Container style={{ overflowX: 'scroll'}}>
      <Typography style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem'}}>
        Known For
      </Typography>
      <Paper elevation={3}>
        <CombinedCreditsBar combinedCredits={combinedCredits}/>
      </Paper>
    </Container>
    </>
  )
}

export default ActorProfile