import React, { useEffect, useState,useRef } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { useLocation } from 'react-router-dom'
const HomePage = (props) => {
  
  
  const [moviesPage, setMoviesPage] = useState(1);
  // const { data, error, isLoading, isError }  = useQuery(['discover'], () => getMovies(moviesPage))
  global.scrollRecoder = { flag: true };
  const [movies, setMovies] = useState([])
  let location = useLocation();
  useEffect(() => {
    getMovies(moviesPage).then(movies => {
      setMovies(movies.results)
    })
  },[])
  // console.log(movies)
  

  // if (isLoading) {
  //   return <Spinner />
  // }

  // else if (isError) {
  //   return <h1>{error.message}</h1>
  // }
  // updateMovies(data.result)

  
  
  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  // const addToFavorites = (movieId) => true 

  window.onscroll = async function(){
    
    //变量scrollTop是滚动条滚动时，距离顶部的距离
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    //变量windowHeight是可视区的高度
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //变量scrollHeight是滚动条的总高度
    var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
           //滚动条到底部的条件
        if(scrollTop+windowHeight>=(scrollHeight-1000)){
          console.log(scrollHeight)
          // console.log(location.pathname);
            // console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
            setMoviesPage(moviesPage+1)
            let newMovies = await getMovies(moviesPage+1)
            setMovies(movies.concat(newMovies.results))
            // movies = movies.concat(newMovies.results)
            // console.log(movies)
         }   
    }

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
);
};
export default HomePage;