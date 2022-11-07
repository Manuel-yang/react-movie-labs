import React, { useState } from "react";
// import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { getTrending } from '../../api/tmdb-api'
import { useQuery } from 'react-query';
import Spinner from '../../components/spinner';
import Container from '@mui/material/Container';

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  const {  data, error, isLoading, isError }  = useQuery('popular', getTrending)
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const popularMovies = data.results
  // console.log(popularMovies)

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

function Item(props)
{
  return (
    <Paper>
        <h2 style={{ fontSize: "4rem" }}>What is on trending!</h2>
        <h2 style={{ fontSize: "2rem" }}>{props.item.title}</h2>
        <Container 
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w500/${props.item.backdrop_path}")`,
            backgroundSize: 'cover',
            height: '40rem',
            position: 'center'
          }}
          maxWidth="lg"
          >
        </Container>
        <p style={{ fontSize: '2rem', margin: '2rem'}}>{props.item.overview}</p>
        <Button className="CheckButton">
            Check it out!
        </Button>
    </Paper>
  )
}

  return (
    <Grid container sx={{ padding: '20px' }}>
      {/* <Grid item xs={12}>
        <Header title={title} />
      </Grid> */}
      <Carousel
        indicatorIconButtonProps={{
          style: {
            marginTop: '3.5rem',    // 1
          }
        }}
       sx={{ width: '100%', margin: '2rem'}}>
          {
            popularMovies.map( (item, i) => <Item key={i} item={item} /> )
          }
      </Carousel>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;