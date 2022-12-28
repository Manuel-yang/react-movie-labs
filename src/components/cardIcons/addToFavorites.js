import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { updateUserFavMovies } from "../../api/tmdb-api";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const handleAddToFavorites = async (e) => {
    e.preventDefault();
    console.log(movie)
    await updateUserFavMovies(localStorage.getItem("userId"), localStorage.getItem("userToken"), [movie.id])
    context.addToFavorites(movie);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;