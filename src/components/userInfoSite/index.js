import React, { useState, useEffect } from "react";
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

const UserInfoSite = (props) => {
  return(
    <div>
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
            <p>Email {props.userInfo.email}</p>
          </Paper>
        </Stack>
      </Card>
    </div>
  )
}

export default UserInfoSite