import React, { useState } from "react";

export const MustWatchMoviesContext = React.createContext(null);


const MustWatchMoviesContextProvider = (props) => {
  const [playlists, setPlaylist] = useState( [] )
  // const [myReviews, setMyReviews] = useState( {} ) 

  const addToPlaylist = (movie) => {
    let newPlaylists = [];
    if (!playlists.includes(movie.id)){
      newPlaylists = [...playlists, movie.id];
    }
    else{
      newPlaylists = [...playlists];
    }
    setPlaylist(newPlaylists)
  };

  // We will use this function in a later section
  const removeFromPlaylists = (movie) => {
    setPlaylist( playlists.filter(
      (mId) => mId !== movie.id
    ) )
  };

  // const addReview = (movie, review) => {
  //   setMyReviews( {...myReviews, [movie.id]: review } )
  // };

  return (
    <MustWatchMoviesContext.Provider
      value={{
        playlists,
        addToPlaylist,
        removeFromPlaylists,
        // addReview,
      }}
    >
      {props.children}
    </MustWatchMoviesContext.Provider>
  );
};

export default MustWatchMoviesContextProvider;