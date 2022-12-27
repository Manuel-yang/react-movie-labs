import React, { useState} from "react";
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
import Chip  from "@mui/material/Chip";
import { Upload } from "upload-js";
import { updateUserAvatar } from "../../api/tmdb-api";
import EmailIcon from '@mui/icons-material/Email';

const UserInfoSite = (props) => {
  const [fileUrl, setFileUrl] = useState("")
  const [uploadprogress, setProgress] = useState("")
  const upload = Upload({ apiKey: process.env.REACT_APP_UPLOAD_KEY }); // Your real API key.

  const onFileSelected = async (event) => {
    const [ file ]    = event.target.files;
    const { fileUrl } = await upload.uploadFile(file, { onProgress });
    setProgress("")
    setFileUrl(fileUrl)
    await updateUserAvatar(localStorage.getItem("userId"), localStorage.getItem("userToken"), fileUrl)
  }
  
  const onProgress = ({ progress }) => {
    setProgress(progress)
  }
  return(
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="avatar"
          image={fileUrl? fileUrl: props.userInfo.avatar }
        />
        <CardContent>
          <Typography textAlign="center" gutterBottom variant="h5" component="div">
            {localStorage.getItem("username")}
          </Typography>
        </CardContent>
        <h2>{uploadprogress? "Uploading "+uploadprogress+"%":""}</h2>

          <Stack direction="row" justifyContent="center" alignItems="center">
            <Button style={{margin: "0.5rem"}} onChange={onFileSelected} variant="contained" component="label">
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Stack>

        <Stack>
          <Paper>
            <Stack justifyContent="center" alignItems="center" direction="row">
              <EmailIcon />
              <p style={{margin:"0.5rem"}}>Email {props.userInfo.email}</p>
            </Stack>
          </Paper>
          <Paper>
            <h3>Genres you like</h3>
              {props.userInfo.favGenres ? (props.userInfo.favGenres).map((genre) => {
                  return(
                    <Chip style={{margin: "0.3rem"}} key={genre.id} label={genre.name} color="primary" />
                  )
                }): ""}
          </Paper>
        </Stack>
      </Card>
    </div>
  )
}

export default UserInfoSite