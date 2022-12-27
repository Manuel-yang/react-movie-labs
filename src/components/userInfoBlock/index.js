import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const UserInfoBlock = (props) => {
  
  return(
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
      <Box style={{margin: "1rem"}}>
        <h1>Genres you like</h1>
        <FormGroup>
          <Container maxWidth="lg">
            {props.genres.map((genre) => {
              return(
                <FormControlLabel key={genre.id} control={<Checkbox />} label={genre.name} />
              )
            })}
          </Container >
        </FormGroup>
      </Box>
    </Grid>
  )
}

export default UserInfoBlock;