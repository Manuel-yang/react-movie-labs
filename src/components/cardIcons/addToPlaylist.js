import React, { useContext } from "react";
import { MustWatchMoviesContext } from "../../contexts/mustWatchContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(MustWatchMoviesContext);

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    context.addToPlaylist(movie);
  };

  return (
    <IconButton aria-label="add to Playlist" onClick={handleAddToPlaylist}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;