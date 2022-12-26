import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { getUserInfo } from "../api/tmdb-api";
const UserInfo = () => {
  const userArr = ["username", "email"]
  const [ userInfo, setUserInfo ] = useState({email: ''})
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo(localStorage.getItem("userId"))
      setUserInfo({...data})
    }
    
    fetchData()
  }, [])

  return(
    <React.Fragment>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="avatar"
                  image="https://i.328888.xyz/2022/12/27/UVdOp.jpeg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {localStorage.getItem("username")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button variant="contained" component="label">
                      Upload
                      <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                      <input hidden accept="image/*" type="file" />
                      <PhotoCamera />
                    </IconButton>
                  </Stack>
                </CardActions>
                <Stack>
                  <Paper>
                    <p>Email {userInfo.email}</p>
                  </Paper>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Stack>
                <Paper style={{ width: "100%"}}>
                  <TextField
                    style={{ width: "95%", margin: "1rem"}}
                    id="outlined-required"
                    label="Username"
                  />
                </Paper>
                <Paper style={{ width: "100%"}}>
                  <TextField
                    style={{ width: "95%", margin: "1rem"}}
                    id="outlined-required"
                    label="email"
                  />
                </Paper>
                <Paper style={{ width: "100%"}}>
                  <TextField
                    style={{ width: "95%", margin: "1rem"}}
                    id="outlined-required"
                    label="Password"
                  />
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default UserInfo