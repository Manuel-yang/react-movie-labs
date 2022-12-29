import React, { useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateUserProfile, updateUserFavGenres, resetUserFavGenres } from "../../api/tmdb-api";
import Alert from '@mui/material/Alert';
import FavMovieCard from "../favMovieCard";
const UserInfoBlock = (props) => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [newGenre, setNewGenre] = useState([])

  const id = localStorage.getItem("userId")
  const token = localStorage.getItem("userToken")

  const updateUserInfo = async () => {
    setErrMsg("")
    setSuccessMsg("")
    try {
      if (newGenre) {
        await updateUserFavGenres(id, token, newGenre)
        window.location.reload()
      }
      if(userName || email || password) {
        await updateUserProfile(id, token, userName, email, password)
        setSuccessMsg("Change successfully")
      }
    } catch (error) {
      setErrMsg(error.response.data.msg)
    }
    console.log(newGenre)
  }

  const handle4Genres = async (event, genre) => {
    if (event.target.checked) {
      setNewGenre([...newGenre, genre])
    } else {
      let arr = newGenre
      arr.forEach((item, index) => {
        if(item.id === genre.id) {
          arr.splice(index, 1)
         setNewGenre(arr)
        }
      })
    }
  }

  const resetFavGenres= async () => {
    await resetUserFavGenres(id, token)
    window.location.reload()
  }


  
  return(
    <React.Fragment>
      <Stack>
        <Paper style={{ width: "100%"}}>
          <TextField
            style={{ width: "95%", margin: "1rem"}}
            id="usernameInput"
            label="Username"
            onChange={(event) => {setUserName(event.target.value)}}
          />
        </Paper>
        <Paper style={{ width: "100%"}}>
          <TextField
            style={{ width: "95%", margin: "1rem"}}
            id="emailInput"
            label="email"
            onChange={(event) => {setEmail(event.target.value)}}
          />
        </Paper>
        <Paper style={{ width: "100%"}}>
          <TextField
            style={{ width: "95%", margin: "1rem"}}
            id="passwordInput"
            label="Password"
            onChange={(event) => {setPassword(event.target.value)}}
          />
        </Paper>
        <Paper style={{ width: "100%"}}>
          <Stack sx={{ width: '100%' }} spacing={2}> 
              {errMsg ? <Alert severity="error">{errMsg}</Alert> : ""}
          </Stack>
        </Paper>
        <Paper style={{ width: "100%"}}>
          <Stack sx={{ width: '100%' }} spacing={2}> 
              {successMsg ? <Alert severity="success">{successMsg}</Alert> : ""}
          </Stack>
        </Paper>
      </Stack>
      <Box style={{margin: "1rem"}}>
        <h1>Genres you like</h1>
        <FormGroup>
          <Container maxWidth="lg">
            {props.genres.map((genre) => {
              return(
                <FormControlLabel onChange={(event) => {handle4Genres(event, genre)}} key={genre.id} control={<Checkbox />} label={genre.name} />
              )
            })}
          </Container >
        </FormGroup>
      </Box>
      <Container style={{width: "100%"}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button onClick={resetFavGenres} variant="contained">Reset</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={updateUserInfo}>Submit</Button>
          </Grid>
        </Grid>
      </Container>
      <Paper id="favMovies">
        {/* {props.userInfo.favourites ? (props.userInfo.favourites).map(async (id) => {
          console.log(await getMovieById(id))
          return(
            <p key={id}>{id}</p>
          )
        }): ""} */}
        {props.userInfo.favourites ? <FavMovieCard userInfo={props.userInfo}/> : ""}
        
      </Paper>
  </React.Fragment>
  )
}

export default UserInfoBlock;