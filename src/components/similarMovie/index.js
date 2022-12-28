import React, {useState, useEffect} from "react"
import { getSimilarMovie } from "../../api/tmdb-api"
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";

const SimilarMovie = (props) => {
  const navigate = useNavigate();
  let favouritesIdList = props.userInfo.favourites
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    favouritesIdList.map(async (id) => {
      let similarMovie = await getSimilarMovie(id)
      setMovieList(current => [...current, similarMovie.results[0]])
    })

  },[favouritesIdList])
  
  const handelMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true});
    // console.log(pageURL)
  }

  return(
    <React.Fragment>
      <h1 >You may like</h1>
      <Stack>
        {movieList ? 
          movieList.map((movie) => {
          return(
            <Card key={movie.id} style={{overflow: 'visible', margin: '1rem'}}>
              <CardMedia
                component="img"
                height={300}
                width={150}
                image={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                alt="green iguana"
              />
              <CardContent>
                <Typography style={{ fontSize: '1.5rem', fontWeight: 'bold'}} gutterBottom  component="div">
                  {movie.title}
                </Typography>
                <Typography gutterBottom  component="div">
                  {movie.character}
                </Typography>        
              </CardContent>
              <CardActions>
                <Button onClick={() =>handelMenuSelect(`/movies/${movie.id}`)}  style={{ width: '12rem'}}>Learn More</Button>
              </CardActions>
            </Card>
          )
        })
        : ""}
      </Stack>
    </React.Fragment>
  )
}

export default SimilarMovie