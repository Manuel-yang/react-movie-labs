import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Chip from "@mui/material/Chip";
// import Paper from "@mui/material/Paper";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';


const TemplateMoviePage = ({ movie, children }) => {
  const { data , error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }],
    getMovieImages
  );
  

  console.log(movie)
  // console.log(children)

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const images = data.posters 
  const chip = { margin: 0.5 };
  const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  };
  return (
    <>
      {/* <MovieHeader movie={movie} /> */}
      {/* <div style={{"width:100%; position:relative;z-index:1;margin:0 auto; background: #000;"}}> */}
      <div style={{ 
        background: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`, 
        backgroundSize: 'cover',
        width: '100%',
        height: '600px',
      }}>
      </div>
      
      <Container style={{marginTop: '2rem'}}>
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
          </Card>
        </Grid>
        <Grid item xs={6}> 
          <p style={{fontSize: "3rem", margin: '0', fontWeight: 'bold'}}>{movie.title}</p>
          <p style={{marginLeft: '5%', fontSize: '1.5rem'}}>{movie.tagline?'-':''} {movie.tagline}</p>
        <Stack>
        <Stack style={{marginTop: '2rem'}} direction="row" spacing={1}>
          <MovieFilterIcon />
          <p>{movie.release_date}</p>
          <p style={{textTransform:'uppercase'}}>({movie.original_language})</p>
          <p>·</p>
          <p>{movie.production_countries[0].iso_3166_1}</p>
          <p>·</p>
          <p>{movie.runtime} minutes</p>
        </Stack>
        <Stack style={{listStyle: 'none', marginTop: '1rem'}} direction="row" >
          {movie.genres.map((g) => (
            <li key={g.name}>
              <Chip label={g.name} sx={{...chip}} />
            </li>
          ))}
        </Stack>
        </Stack>
          
        <Stack style={{marginTop: '1rem'}} spacing={1}>
          <Rating name="half-rating-read" defaultValue={(movie.vote_average)/2} precision={0.5} readOnly />
        </Stack>  
        <Stack>
          <p style={{fontSize: '2rem', marginBottom: '0'}}>Overview</p>
          <p style={{fontSize: '1.2rem'}}>{movie.overview}</p>
        </Stack>

        </Grid>
      </Grid>
    </Box>
    </Container>


      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
          </div>
        </Grid>

        <Grid item xs={9}>
          
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;