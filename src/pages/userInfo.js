import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { getUserInfo, getGenresApi } from "../api/tmdb-api";
import UserInfoBlock from '../components/userInfoBlock/index'
import UserInfoSite from '../components/userInfoSite/index'


const UserInfo = () => {
  const userArr = ["username", "email"]
  const [ userInfo, setUserInfo ] = useState({email: ''})
  const [ genres, setGenres ] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo(localStorage.getItem("userId"))
      const genres = await getGenresApi()
      setUserInfo({...data})
      setGenres(genres.data.genres)
    }
    
    fetchData()
  }, [])

  console.log(genres)

  return(
    <React.Fragment>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <UserInfoSite userInfo={userInfo}/>
            </Grid>
            <Grid item xs={8}>
              <UserInfoBlock userInfo={userInfo} genres={genres}/>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default UserInfo